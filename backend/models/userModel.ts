import mongoose from 'mongoose'

//defining schema
const userSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String,
        enum: ['to do', 'pending', 'completed'],
        required: true 
    }

}, { timestamps: true })

//creating model
const userModel = mongoose.model('UserDetail', userSchema)

//model creation call
export const ensureConnection = async () => {
    try{
        await userModel.init();
        console.log("Collection created.....")
    }
    catch(error){
        console.log("error occured while creating collection")
    }
}

export default userModel;