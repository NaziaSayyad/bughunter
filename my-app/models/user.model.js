import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  myposts: [{ title: String, content: String, image: String }],
});

export default models.user || model("user", UserSchema);
