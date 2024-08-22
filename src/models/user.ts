import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  createAt: Date;
  updatedAt: Date;
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users>({
  name: {
    type: String,
    required: [true, "Please provide a name ."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email"],
    maxlength: [60, "Owner's Name cannot be more than 60 characters"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);