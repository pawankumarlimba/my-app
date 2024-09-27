import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });  

const Message1 = mongoose.models.Message1 || mongoose.model("Message1", messageSchema);
export default Message1;
