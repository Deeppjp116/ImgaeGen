import express from 'express';
import { TrainModel, GenerateImage, GenerateImageFromPack } from "common/types"


const app = express();

const PORT = process.env.PORT || 8080;


 
app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.post('/ai/traning', (req, res) => {
    res.send('Here is a traning!');
});

app.post('/ai/generate', (req, res) => {
    res.send('Here is a genrate!');
});


app.post('/pack/bulk', (req, res) => {
    res.send('Here is a bulk pack!');
});


app.post('/image', (req, res) => {
    res.send('Here is a all images!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 