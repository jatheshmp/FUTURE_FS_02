const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// Create Lead (Website Form)
router.post("/", async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.json(lead);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get All Leads
router.get("/", async (req, res) => {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
});

// Update Status
router.put("/:id", async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(lead);
});

module.exports = router;