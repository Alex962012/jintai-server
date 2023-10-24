import Product from "../models/Product.js";

import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const getAll = async (req, res) => {
    try {
        const { typeId } = req.query;
        let products;
        if (typeId) {
            products = await Product.find({ typeId: typeId });
        }
        if (!typeId) {
            products = await Product.find({});
        }
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось получить товары" });
    }
};
export const add = async (req, res) => {
    try {
        let { title, typeId, info } = req.body;
        let imageUrl;
        let filenames;
        if (!req.files.imageUrl.length) {
            imageUrl = req.files.imageUrl;
            let fileName = uuidv4() + ".jpg";
            filenames = fileName;
            let uploadPath = path.resolve(__dirname, "..", "images", fileName);
            imageUrl.mv(uploadPath);
        }
        if (req.files.imageUrl.length > 1) {
            imageUrl = req.files.imageUrl;
            filenames = [];
            for (let i = 0; i < imageUrl.length; i++) {
                let fileName = uuidv4() + ".jpg";
                filenames.push(fileName);
                let uploadPath = path.resolve(__dirname, "..", "images", fileName);
                imageUrl[i].mv(uploadPath);
            }
        }

        if (info) {
            info = JSON.parse(info);
        }
        const product = new Product({ title, typeId, imageUrl: filenames, info });
        const result = await product.save();

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось создать товар" });
    }
};
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        let { title, typeId, info } = req.body;
        let imageUrl;
        let filenames;
        if (!req.files.imageUrl.length) {
            imageUrl = req.files.imageUrl;
            let fileName = uuidv4() + ".jpg";
            filenames = fileName;
            let uploadPath = path.resolve(__dirname, "..", "images", fileName);
            imageUrl.mv(uploadPath);
        }
        if (req.files.imageUrl.length > 1) {
            imageUrl = req.files.imageUrl;
            filenames = [];
            for (let i = 0; i < imageUrl.length; i++) {
                let fileName = uuidv4() + ".jpg";
                filenames.push(fileName);
                let uploadPath = path.resolve(__dirname, "..", "images", fileName);
                imageUrl[i].mv(uploadPath);
            }
        }

        if (info) {
            info = JSON.parse(info);
        }
        const newProduct = await Product.updateOne(
            { _id: id },
            {
                title,
                typeId,
                imageUrl: filenames,
                info: info
            }
        );

        res.json(newProduct);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Не удалось изменить товар" });
    }
};
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        await Product.findOneAndDelete({
            _id: postId,
        });
        return res.json({ message: `Товар удален ${Product}` });
    } catch (e) {
        console.log(err);
        res.status(500).json({ message: "Не удалось удалить товар" });
    }
};

export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            _id: id,
        });
        return res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось получить товар" });
    }
};
