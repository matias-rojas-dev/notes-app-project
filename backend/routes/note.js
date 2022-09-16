const express = require("express")
const router = express.Router()

const { create, list, read, update, removeSoft, archivedNotes, notesByCategory } = require("../controllers/note")

router.post("/note", create )
router.get("/notes", list)
router.get("/note/:slug", read)
router.put("/note/:slug", update)
router.patch("/note/:slug", removeSoft)

router.get("/notes-archived", archivedNotes)
router.get("/notes-by-category/:slug", notesByCategory)
module.exports = router;