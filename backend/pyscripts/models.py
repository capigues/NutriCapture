import random
import skimage.transform as transforms
from sklearn.decomposition import PCA
import imageio.v2 as imageio
import pickle
import json
import sys

class FeatureExtractor:
    def __init__(self, in_features=20, out_classes=5):
        self.pca = PCA(n_components = in_features)
        self.out_classes = out_classes
        self.training = True
    
    def extract_features(self, x):
        self.pca.fit((x[:,:,0] + x[:,:,1] + x[:,:,2])/3)
        p = self.pca.singular_values_
        return p
        
class SimpleDataloader:
    def __init__(self, images_dict, mode='train', shuffle=False, width=224, height=224):
        self.feature_extractor = FeatureExtractor()
        self.images_dict = images_dict
        self.mode = mode
        self.train_list = []
        self.val_list = []
        self.pred_list = []
        self.shuffle = shuffle
        self.width = width
        self.height = height
        self.train_images = []
        self.val_images = []
        self.pred_images = []
        self.train_features = []
        self.val_features = []
        self.pred_features = []
        if (list(self.images_dict)[0] == 0):
            for class_id in self.images_dict:
                for i in range(len(self.images_dict[class_id])):
                    self.pred_list.append((class_id,i))
                    image = self.transform(self.images_dict[class_id][i])
                    features = self.feature_extractor.extract_features(image)
                    self.pred_images.append(image)
                    self.pred_features.append(features)
            self.set_mode('pred', False)
        else:
            for class_id in self.images_dict:
                for i in range(len(self.images_dict[class_id]['train'])):
                    self.train_list.append((class_id, i))
                    image = self.transform(self.images_dict[class_id]['train'][i])
                    features = self.feature_extractor.extract_features(image)
                    self.train_images.append(image)
                    self.train_features.append(features)
                for i in range(len(self.images_dict[class_id]['val'])):
                    self.val_list.append((class_id,i))
                    image = self.transform(self.images_dict[class_id]['val'][i])
                    features = self.feature_extractor.extract_features(image)
                    self.val_images.append(image)
                    self.val_features.append(features)
            self.set_mode('train', True)            
        
    def set_shuffle(self, shuffle):
        self.shuffle = shuffle
        
        
    def reset_shuffle(self):
        self.indexes = list(range(len(self.data_list)))
        if self.shuffle:
            random.shuffle(self.indexes)
    
    def set_mode(self, mode, shuffle):
        self.set_shuffle(shuffle)
        assert mode == 'train' or mode == 'val' or mode == 'pred', 'only supports training or validation'
        self.mode = mode
        if mode == 'train':
            self.data_list = self.train_list
            self.data = self.train_images
            self.features = self.train_features
        elif mode == 'val':
            self.data_list = self.val_list
            self.data = self.val_images
            self.features = self.val_features
        else:
            self.data_list = self.pred_list
            self.data = self.pred_images
            self.features = self.pred_features
        self.reset_shuffle()
        
    def transform(self, image):
        height, width, ch = image.shape
        if width < height:
            new_width = self.width
            scale = self.width / width
            new_height = int(height * scale)
        else:
            new_height = self.height
            scale = self.height / height
            new_width = int(width * scale)
        image_tf = transforms.resize(image, (new_height, new_width))
        
        # center crop
        w_start = 0
        w_stop = self.width
        h_start = 0
        h_stop = self.height
        if new_width > self.width:
            start = (new_width - self.width) // 2
            w_start = start
            w_stop = start + self.width
        if new_height > self.height:
            start = (new_height - self.height) // 2
            h_start = start
            h_stop = start + self.height
        image_tf = image_tf[h_start:h_stop, w_start:w_stop, :]
        return image_tf
    
    def __getitem__(self, data_index):
        i = self.indexes[data_index]
        class_id, idx = self.data_list[i]
        if data_index == len(self.data_list):
            self.reset_shuffle
        return self.data[i], self.features[i], class_id

    def __len__(self):
        return len(self.data_list)

def main(image_filepaths):
    try:
        food_dict = {
            1:'bangbang-chicken',
            2:'dan-dan-noodles',
            3: 'sichuan-hot-pot',
            4: 'twice-cooked-pork',
            5: 'wontons-in-chili-oil',
        }

        ada_file = './models/NutriCaptureModel_ADA'
        ada_lda_file = './models/NutriCaptureLDA_ADA'
        ada_model = pickle.load(open(ada_file, 'rb'))
        ada_lda = pickle.load(open(ada_lda_file, 'rb'))

        mlp_file = './models/NutriCaptureModel_MLP'
        mlp_lda_file = './models/NutriCaptureLDA_MLP'
        mlp_model = pickle.load(open(mlp_file, 'rb'))
        mlp_lda = pickle.load(open(mlp_lda_file, 'rb'))

        images = []

        for image_filepath in image_filepaths:
            image = imageio.imread(image_filepath)
            images.append(image)

        loadImage = SimpleDataloader({0: images}, False)

        data = {}

        for i, (image, features, class_id) in enumerate(loadImage):
            data[i] = {}
            data[i]['filepath'] = image_filepaths[i]

            features_ada = ada_lda.transform(features.reshape(1,20))
            features_mlp = mlp_lda.transform(features.reshape(1,20))

            proba_ada = ada_model.predict_proba(features_ada)
            proba_mlp = mlp_model.predict_proba(features_mlp)
            
            ada = proba_ada[0]
            mlp = proba_mlp[0]

            max_ada = max(ada)
            max_mlp = max(mlp)
            
            for index, item in enumerate(ada):
                if (item == max_ada):
                    data[i]['ada'] = {
                        'prediction': food_dict[index+1],
                        'percentage': round(max_ada*100),
                        'raw_data': ada.tolist()
                    }
                
            for index, item in enumerate(mlp):
                if (item == max_mlp):
                    data[i]['mlp'] = {
                        'prediction': food_dict[index+1],
                        'percentage': round(max_mlp*100),
                        'raw_data': mlp.tolist()
                    }
        print(json.dumps(data))
        return (0)
    except Exception as e:
        data['error'] = str(e)
        print(json.dumps(data))
        return (1)

if __name__ == "__main__":
    sys.exit(main(json.loads(sys.argv[1])))