import express from 'express';
import { TrainModel, GenerateImage, GenerateImageFromPack } from "common/types"
import { prismaClient } from "db"



const User_ID = String(Math.random() * 10000);
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

    const data = await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethinicity: parsedBody.data.ethinicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            UserID: User_ID
        }
    });

    res.json({
        modelId: data.id
    });
});

app.post('/ai/generate', async (req, res) => {
    const parsedBody = GenerateImage.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(411).json({
            message: 'Invalid incorrect'
        })
        return;
    }

    const data = await prismaClient.outputImages.create({
        data: {
            prompt: parsedBody.data.prompt,
            userId: User_ID,
            modelId: parsedBody.data.modelId,
            imageUrl: parsedBody.data.imageUrl
        }
    })
    res.json({
        imageId: data.id
    })
});


app.post('/pack/generate', async (req, res) => {
    const parsedBody = GenerateImageFromPack.safeParse(req.body);


    if (!parsedBody.success) {
        res.status(411).json({
            message: 'Invalid incorrect'
        })
        return;
    }

    const prompts = await prismaClient.packPrompts.findMany({
        where: {
            packId: parsedBody.data.packId
        }
    })

    const images = await prismaClient.outputImages.createManyAndReturn({
        data: prompts.map((prompt) => {
            return {
                prompt: prompt.prompt,
                userId: User_ID,
                modelId: parsedBody.data.modelId,
                imageUrl: ""
            }
        })

    })
    res.json({
        imageids: images.map((image) => image.id)
    })
});


app.get('/pack/bulk', async (req, res) => {
    const packs = await prismaClient.packs.findMany({})

    res.json({
        packs: packs
    })
});


app.get('/image/bulk', async (req, res) => {
    const ids = req.query.ids as string[];
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;


    const imagesData = await prismaClient.outputImages.findMany({
        where: {
            id: {
                in: ids
            },
            userId: User_ID
        },
        skip: parseInt(offset),
        take: parseInt(limit)

    })

    res.json({
        images: imagesData, userid: User_ID
    })
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}) 