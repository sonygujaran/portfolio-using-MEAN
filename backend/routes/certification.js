import express from 'express';
import Certification from '../model/certification.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ name: 1 });
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const certification = new Certification(req.body);
    const savedCertification = await certification.save();
    res.status(201).json(savedCertification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
