import { Mongoconnect } from "../../../database/db";
import post from "../../../models/post.model";
import user from "../../../models/user.model";
const jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  await Mongoconnect();
  const token = req.headers["authorization"];
  
  try {
        if (token) {
          const decoded = jwt.decode(token);
          const find_id = decoded.id;
          const user_id = await user.findOne({ _id: find_id });

          const id = user_id.id;
          if (find_id === id) {
            console.log(user_id);
            const { title, content, image } = req.body;
            const posts = await user.updateOne(
              { _id: id },
              { $push: { myposts: [{ title, content, image }] } }
            );

            const post_model = new post({
              id: id,
              user_name: user_id.name,
              title,
              content,
              image,
            });
            await post_model.save();
            res.status(201).send({ msg: "New post added", posts });
          } else {
            res.send("No user find");
          }
        }
      } catch (e) {
        console.log(e);
        res.send("Error", e);
      }
    
  
}
