const { Router, request } = require("express");
const config = require("config");
const shortid = require("shortid");
const Goal = require("../models/Goal");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { goal, colorText, image, colorBg, transform, status } = req.body;

    const code = shortid.generate();

    const infoGoal = new Goal({
      goal,
      colorText,
      colorBg,
      image,
      code,
      transform,
      status,
      owner: req.user.userId,
    });

    await infoGoal.save();
    res.status(201).json({ infoGoal });
  } catch {
    res.status(500).json({ message: "Error Server" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const goals = await Goal.find({ owner: req.user.userId });
    res.json(goals);
  } catch {
    res.status(500).json({ message: "Error Server" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.json(goal);
  } catch {
    res.status(500).json({ message: "Error Server" });
  }
});

router.post("/del/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    goal.deleteOne();
    res.json(goal);
  } catch {
    res.status(500).json({ message: "Error Server" });
  }
});

router.post("/edit/:id", auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    goal.status = !goal.status;
    goal.save();
    res.json(goal);
  } catch {
    res.status(500).json({ message: "Error Server" });
  }
});

module.exports = router;
