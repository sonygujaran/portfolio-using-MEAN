import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  qualification: { type: String, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  result: { type: String, required: true },
  sortOrder: { type: Number, default: 0 }
});

educationSchema.index({ qualification: 1, institution: 1 }, { unique: true });

export default mongoose.model('Education', educationSchema);