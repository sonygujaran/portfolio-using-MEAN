import express from 'express';
import Education from '../model/education.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ sortOrder: 1 });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { qualification, institution, ...details } = req.body;
    if (!qualification || !institution) {
      return res.status(400).json({ message: 'qualification and institution are required' });
    }

    const savedEducation = await Education.findOneAndUpdate(
      { qualification, institution },
      { $set: details, $setOnInsert: { qualification, institution } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json(savedEducation);
  } catch (err) {
    res.status(err.code === 11000 ? 409 : 400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.json(deletedEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
