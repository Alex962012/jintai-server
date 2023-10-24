import Type from "../models/Type.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const getAll = async (req, res) => {
    try {
        const types = await Type.find({});
        res.json(types);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось получить типы товаров " });
    }
};
export const add = async (req, res) => {
    try {
        const { name } = req.body;
        const { imageUrl } = req.files;
        let fileName = uuidv4() + ".jpg";
        let uploadPath = path.resolve(__dirname, "..", "images", fileName);
        imageUrl.mv(uploadPath);
        const type = new Type({ name, imageUrl: fileName });
        const result = await type.save();
        return res.json(uploadPath);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Не удалось создать тип товара" });
    }
};
export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body;
        const { imageUrl } = req.files;
        let fileName = uuidv4() + ".jpg";
        let uploadPath = path.resolve(__dirname, "..", "static", fileName);
        imageUrl.mv(uploadPath);
        const newType = await Type.updateOne(
            {
                _id: id,
            },
            { name, imageUrl: fileName });


        return res.json(newType)
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Не удалось изменить тип товара" });
    }
};
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await Type.findOneAndDelete({
            _id: id,
        });
        return res.json({ message: 'Тип товара удален' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Не удалось удалить тип товара" });
    }
};
