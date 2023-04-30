const { spawn } = require('child_process');
const express = require("express")
const cors = require('cors')
const fileUpload = require('express-fileupload');
var base64Img = require('base64-img');
const bodyParser = require('body-parser');
const { getIngredients, getNutrition } = require('./food_data/food');
const { createServer } = require('http');
const { Server } = require("socket.io")
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

require("dotenv").config()
const PORT = process.env.PORT || 3000

app.use(cors({origin: ['http://localhost:19000', 'http://localhost:19006', '*']}))
app.use(bodyParser.json());
app.use(fileUpload({
    tempFileDir: './uploads/',
    useTempFiles: true,
}));

app.get('/classes', (req, res) => {
    res.json({
        1: 'bangbang-chicken',
        2: 'dan-dan-noodles',
        3: 'sichuan-hot-pot',
        4: 'twice-cooked-pork',
        5: 'wontons-in-chili-oil',
    })
})

app.get('/mealdata/:meal', (req, res) => {
    const { meal } = req.params
    let data = getNutrition(meal)
    res.json(data)
})

app.get('/ingredients/:ingredient', (req, res) => {
    const { ingredient } = req.params
    let ingredients = getIngredients(ingredient)
    res.json(ingredients)
})

app.post('/upload', (req, res) => {
    console.log(req.files)

    const uploadedFile = req.files.file;
    res.send(uploadedFile)
});
 
app.post('/predict', (req, res) => {
    let file;
    if (req.body) {
        file = base64Img.imgSync(req.body.file, 'uploads', 'file')
    }

    if (req.files && req.files.file) {
        file = req.files.file.tempFilePath
    }

    let pred_data = {}
    
    const pythonProcess = spawn('python3', ['./pyscripts/models.py', JSON.stringify([file])]);
    pythonProcess.stdout.on('data', (data) => {
        try {
            console.log(data.toString())
            pred_data = JSON.parse(data.toString())
        } catch (error) {
            console.error(error)
        }
    });
    
    pythonProcess.stderr.on('data', (data) => {
        console.log(data.toString())
        pred_data = JSON.parse(data.toString())
    });

    pythonProcess.on('exit', (code) => {
        if (code == 0) {
            console.log(pred_data)
            io.emit("prediction", {img64: req.body.file, pred_data})
            res.status(200).json(pred_data)
        } else {
            console.log(pred_data['stderr'])
            res.status(400).json({message: "Python script error", error: pred_data['stderr']})
        }
    });
})

io.on("connection", (socket) => {
    console.log(socket.id)
})

httpServer.listen(PORT, () => {
    console.log('Listening on port:', PORT)
})

// app.listen(PORT, () => {
//     console.log('Listening on port:', PORT)
// })