import { Mongoconnect } from "../../../database/db";
import post from "../../../models/post.model";

export default  async function All_posts(req,res){
    await Mongoconnect();
    const user =  await post.find();
    res.status(201).send(user)
}
// API : http://localhost:3000/api/posts/all