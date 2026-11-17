import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  skills: [{
    name: String }]})
  

export default mongoose.model('Skill', skillSchema);