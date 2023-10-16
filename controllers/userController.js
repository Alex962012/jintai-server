import { User } from "../models/models.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id: id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '20h' })
}

export const registration = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password) {
            return res.status(500).json({ message: "Не корректно указан емайл и пароль" });
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return res.status(500).json({ message: "Пользователь уже существует" });
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Не удалось создать пользователя" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(500).json({ message: "Пользователь не найден" });
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(500).json({ message: "Неверный пароль" });
        }
        const token = generateJwt(user.id, user.email)
        return res.json({ token })
    } catch (e) {
        console.log(err);
        res.status(500).json({ message: "Не удалось авторизоваться" });
    }
};

export const check = async (req, res) => {
    try {

        res.json({ message: 'all' });
    } catch (e) {
        console.log(err);
        res.status(500).json({ message: "Не задан id" });
    }
};
