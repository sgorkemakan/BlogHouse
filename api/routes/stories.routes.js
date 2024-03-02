const { Router } = require("express")
const router = Router()

const { createStory, getStories, getStory, updateStory, deleteStory } = require("../controllers/stories.controller")
const protectAuth = require("../middlewares/protectAuth")

router.post("/", protectAuth, createStory)
router.get("/", getStories)
router.get("/:id", getStory)
router.put("/:id", protectAuth, updateStory)
router.delete("/:id", protectAuth, deleteStory)

module.exports = router