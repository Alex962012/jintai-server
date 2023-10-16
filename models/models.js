import { sequelize } from "../db.js";
import { DataTypes } from 'sequelize'
export const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

export const Product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
})
export const ProductInfo = sequelize.define('product_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
})
export const Images = sequelize.define('images', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    images: { type: DataTypes.STRING, allowNull: false },

})
export const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false }
})



Type.hasMany(Product)
Product.belongsTo(Type)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)


Product.hasMany(Images, { as: 'images' })
Images.belongsTo(Images)