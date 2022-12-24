import { model, models, Schema } from "mongoose";
const postSchema = new Schema({
 category: String,
  title: String,
  image: String,
  content: String,
  like: Number,
  user_name: String,
});
export default models.post || model("post", postSchema);

