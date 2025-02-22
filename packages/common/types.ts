import { z } from "zod";


export const TrainModel = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Other"]),
    ethinicity: z.enum(["White", "Black", "Asian American", "East American", "South East American", "South Asian", "Middel Eastern", "Pacific", "Hispanic", "Other"]),
    eyeColor: z.enum(["Blue", "Brown", "Green", "Black", "Other"]),
    bald: z.boolean(),
    images: z.array(z.string()),
})

export const GenerateImage = z.object({
    prompt: z.string(),
    ModelKind: z.string(),
    num: z.number(),

})

export const GenerateImageFromPack = z.object({
    modelId: z.string(),
    packId: z.string(),
})