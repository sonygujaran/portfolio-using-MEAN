import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true }
});

export default mongoose.model('Certification', certificationSchema);