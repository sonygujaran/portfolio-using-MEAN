import mongoose from 'mongoose';


const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  currentlyWorking: { type: Boolean, default: false },
  description: String,
  responsibilities: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Experience', experienceSchema);