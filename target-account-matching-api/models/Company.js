import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
  name: {
     type: String,
      required: true
     },
  domain: { 
    type: String,
     required: true, 
     unique: true 
    },
  matchScore: { 
    type: Number,
     required: true,
      min: 0, 
      max: 100
     },
  status: { 
    type: String, 
    enum: ['Target', 'Not Target', 'Researching', 'Pending'], 
    default: 'Researching' 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Company', CompanySchema);