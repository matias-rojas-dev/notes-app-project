const express = require("express")
const router = express.Router()

const { create, list } = require("../controllers/category")

router.post("/create-category", create )
router.get("/list", list)

module.exports = router;