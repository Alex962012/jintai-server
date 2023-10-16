import { Product } from "../models/models.js";
import { ProductInfo } from "../models/models.js";
import { Images } from "../models/models.js";
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
            products = await Product.findAll({ where: { typeId } });
        }
        if (!typeId) {
            products = await Product.findAll();
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
        let { imageUrl } = req.files;
        let fileName = uuidv4() + ".jpg";
        let uploadPath = path.resolve(__dirname, "..", "static", fileName);
        imageUrl.mv(uploadPath);
        res.json(imageUrl);
        const product = await Product.create({ title, typeId, imageUrl: fileName });

        if (info) {
            info = JSON.parse(info);
            info.forEach((i) => {
                ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id,
                });
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось создать товар" });
    }
};
export const update = async (req, res) => {
    try {
        const { id } = req.params
        let { title, typeId, info } = req.body;
        let { imageUrl } = req.files;
        let fileName = uuidv4() + ".jpg";
        let uploadPath = path.resolve(__dirname, "..", "static", fileName);
        imageUrl.mv(uploadPath);
        const newProduct = await Product.update({ title, typeId, imageUrl: fileName }, {
            where: {
                id: id
            },
        });
        if (info) {
            info = JSON.parse(info);
            ProductInfo.destroy(
                {
                    where: {
                        productId: id
                    }
                },);

            info.forEach((i) => {
                ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: id,
                });
            });

        }
        res.json(info);
    } catch (e) {
        console.log(err);
        res.status(500).json({ message: "Не удалось изменить товар" });
    }
};
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.destroy({
            where: {
                id,
            },
        });
        return res.json({ message: `Товар удален ${product}` });
    } catch (e) {
        console.log(err);
        res.status(500).json({ message: "Не удалось удалить товар" });
    }
};

export const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({
            where: { id },
            include: [
                { model: ProductInfo, as: "info" },
            ],
        });
        return res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось получить товар" });
    }
};
