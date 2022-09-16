const slugify = require("slugify")
const Category = require("../models/category")

exports.create = async (req, res) => {
    try {
        const {name} = req.body
        const category = await new Category({
            name,
            slug: slugify(name)
        }).save()

        res.json({
            success: true,
            category
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error
        })
    }
}

exports.list = async (req, res) => {
    try {
        const categories = await Category.find();

        res.json({
            success: true,
            categories
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            error
        })
    }
}