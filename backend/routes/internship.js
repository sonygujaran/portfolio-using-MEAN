import express from 'express';
import Internship from '../model/internship.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ _id: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const internship = new Internship(req.body);
    const savedInternship = await internship.save();
    res.status(201).json(savedInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
