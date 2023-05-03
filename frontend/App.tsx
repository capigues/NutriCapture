import { useState, useEffect } from 'react';
import { Button, FlatList, Image, NativeModules, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { io } from 'socket.io-client'

const serverURL = 'http://' + window.location.hostname + ':3000'
const socket = io(serverURL, {
  
})

export default function App() {
  const [mealName, setMealName] = useState<string>('Prediction')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [nutrition, setNutrition] = useState<Nutrition[]>([])
  const [ingredient, setIngredient] = useState<string>('')
  const [image, setImage] = useState<string>()
  const [predictions, setPredictions] = useState<number[]>([])
  const [predictionADA, setPredictionsADA] = useState<Prediction>()
  const [predictionMLP, setPredictionsMLP] = useState<Prediction>()

  const classes = {
      0: 'bangbang-chicken',
      1: 'dan-dan-noodles',
      2: 'sichuan-hot-pot',
      3: 'twice-cooked-pork',
      4: 'wontons-in-chili-oil',
  }

  socket.on('connect', () => {
    console.log('Connecting')
  })

  socket.on("prediction", res => {
    const {img64, pred_data} = res

    setImage(img64)
    console.log(pred_data[0].mlp.raw_data)
    setPredictions(pred_data[0].mlp.raw_data)
    setPredictionsADA({...pred_data[0].ada, prediction: formatTitle(pred_data[0].ada.prediction)})
    setPredictionsMLP({...pred_data[0].mlp, prediction: formatTitle(pred_data[0].mlp.prediction)})
    
    getIngredients(pred_data[0].mlp.prediction)
    setMealName(pred_data[0].mlp.prediction)
  })

  socket.on('disconnect', () => {
    console.log('Disconnecting')
  })

  const formatTitle = (title: string) => {
    return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const resizedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 400} }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setImage(resizedImage.uri);
      console.log(resizedImage.uri)
    }
  };

  const getNutrifacts = () => {
    const base64Img = image
    const URL = serverURL + '/predict'

    fetch(URL, {
      body: JSON.stringify({'file': base64Img}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'appliciation/json',
      },
      method: 'POST',
    }).then(res => res.json())
      .then(data => {
        setPredictionsADA({...data[0].ada, prediction: formatTitle(data[0].ada.prediction)})
        setPredictionsMLP({...data[0].mlp, prediction: formatTitle(data[0].mlp.prediction)})
        
        getIngredients(data[0].mlp.prediction)
        setMealName(data[0].mlp.prediction)
      })
      .catch(e => console.error(e))
  };

  const getIngredients = async (ingredient: string) => {
    const URL = serverURL + '/ingredients/' + ingredient

    fetch(URL).then(res => res.json())
      .then(data => {
        setIngredients(data)

        getNutrition(ingredient)
      })
  }

  const getNutrition = async (meal: string) => {
    const URL = serverURL + '/mealdata/' + meal

    fetch(URL).then(res => res.json())
      .then(data => {
        setNutrition(data)
      })
  }

  const addIngredient = (text: string) => {
    const data = {
      name: text,
      number: 10,
      quantity: 'unit(s)'
    }
    setIngredients((prevState) => {
      return [...prevState, data]
    })
    setIngredient('')
  }

  const removeIngredient = (ingredient: Ingredient) => {
    setIngredients((prevState) => {
      return prevState.filter((item) => item != ingredient)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.predictions}>
        {/* { predictionADA && <Text style={styles.header}>ADA: {predictionADA.percentage}% {predictionADA.prediction}</Text>} */}
        { predictionMLP && <Text style={styles.header}>Prediction: {predictionMLP.percentage}% {predictionMLP.prediction}</Text>}
        { predictionMLP &&
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: "600"}}> Other prediction data:</Text>
            <FlatList data={predictions} renderItem={(data) => <Text>{Math.round(data.item * 100)}% {formatTitle(classes[data.index] as string)}</Text>}/>
          </View>
        }
      </View>
      <View style={styles.image}>
        <Image source={{uri: image}} style={{width: 250, height: 250}}/>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Pressable style={styles.upload} onPress={pickImage}>
          <Text>Pick an image from camera roll</Text>
        </Pressable>
        <Pressable style={{...styles.upload, backgroundColor: 'black'}} onPress={() => getNutrifacts()}>
          <Text style={{color: 'white'}}>Get Nutrifacts</Text>
        </Pressable>
      </View>
      <View style={styles.nutrition}>
        <View style={styles.ingredients}>
          <Text style={{...styles.header2, alignSelf: 'center', fontWeight: "800"}}>Ingredients {predictionMLP && mealName ? ': ' + mealName : null}</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={styles.input} placeholder='Add ingredient' value={ingredient} onChangeText={(text) => setIngredient(text)} />
            <Pressable style={{justifyContent: 'center', alignContent: 'center', flex: 1}} onPress={() => addIngredient(ingredient)}>
              <Text style={{fontWeight: "600"}}>Add</Text>
            </Pressable>
          </View>
          <FlatList style={styles.list} data={ingredients} renderItem={(data) => {
            return (<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
              <Text style={styles.text}>{data.item.name}</Text>
              <Button color={"green"} title="X" onPress={() => removeIngredient(data.item)}/>
            </View>)
          }}/>
        </View>
        <View style={styles.macronutrition}>
          <Text style={{...styles.header2, alignSelf: 'center', fontWeight: "800"}}>NutriFacts</Text>
          <FlatList style={styles.list} data={nutrition} renderItem={(data) => {
            return (<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
              <Text style={styles.macrotext}>{data.item.name}</Text>
                <Text style={styles.macrotext}>{data.item.number}{data.item.name == "calories" ? '': 'g'}</Text>
            </View>)
          }}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    margin: 5,
  },
  header2: {
    fontSize: 24,
    fontWeight: "600",
    margin: 5,
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    margin: 5,
    fontWeight: "600",
  },
  input: {
    flex: 9,
    paddingVertical: 10,
    paddingLeft: 10,
    margin: 10,
    marginHorizontal: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  list: {
    paddingRight: 15,
  },
  image: {
    margin: 25,
    alignItems: 'center',
    overflow: 'hidden'
  },
  upload: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 12,
    margin: 20,
  },
  nutrition: {
    flex: 1,
    margin: 25,
    flexDirection: 'row',
    width: '75%'
  },
  ingredients: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    borderRightWidth: 1,
  },
  macronutrition: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 2,
    borderLeftWidth: 1,
  },
  macrotext: {
    fontWeight: "600",
    fontSize: 18,
    margin: 5,
  },
  predictions: {

  }
});
