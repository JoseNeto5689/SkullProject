import mongoose from "mongoose";

export default async function () {
    try {
        await mongoose.connect(process.env.DATABASE_URL || "", {
            dbName: process.env.DATABASE,
        })
    }
    catch (e) {
        console.log(e)
    }
}