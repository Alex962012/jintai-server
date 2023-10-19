import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    // imageUrl: {
    //     type: String,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    imageUrl: [{ type: String }],
    description: {
        type: String,
    },
    typeId: { type: String },
    info: [{ title: String, description: String, number: Number }]


});
export default mongoose.model("Product", ProductSchema);
