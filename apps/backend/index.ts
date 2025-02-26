import express from 'express';
import { TrainModel, GenerateImage, GenerateImageFromPack } from "common/types"
import { prismaClient } from "db"



const app = express();
app.use(express.json())

const PORT = process.env.PORT || 8080;


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/ai/traning', async (req, res) => {
    const parsedBody = TrainModel.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(411).json({
            message: 'Invalid incorrect'
        })
        return;
    }

    await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethinicity: parsedBody.data.ethinicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
        }
    })
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