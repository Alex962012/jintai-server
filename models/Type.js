import mongoose from "mongoose";
const TypeSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },



});
export default mongoose.model("Type", TypeSchema);
