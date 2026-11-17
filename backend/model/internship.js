import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  period: { type: String, required: true },
  responsibilities: [String]
});

export default mongoose.model('Internship', internshipSchema);