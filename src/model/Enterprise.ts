import mongoose from "mongoose";

const enterpriseSchema = new mongoose.Schema({
    id: String,
    name: String
})

const EnterpriseModel = mongoose.model("Enterprise", enterpriseSchema)

export { EnterpriseModel }