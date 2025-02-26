import { z } from "zod";


export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Others"]),
    age: z.number(),
    ethinicity: z.enum(["White", "Black", "Asian_American", "East_Asian", "South_East_Asian", "South_Asian", "Middle_Estern", "Pacific", "Hispanic"]),
    eyeColor: z.enum(["Brown", "blue", "Hazel", "Gray",]),
    bald: z.boolean(),
    images: z.array(z.string()),
})

export const GenerateImage = z.object({
    prompt: z.string(),
    modelId: z.string(),
    ModelKind: z.string(),
    num: z.number(),
    imageUrl: z.string()

})

export const GenerateImageFromPack = z.object({
    modelId: z.string(),
    packId: z.string(),
})