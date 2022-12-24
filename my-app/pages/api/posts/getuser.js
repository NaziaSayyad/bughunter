import { Mongoconnect } from "../../../database/db";
import userModel from "../../../models/user.model";
const jwt = require("jsonwebtoken")

export default async function getuseer (req,res) {
    await Mongoconnect();
    const token = req.headers["authorization"];
    try {
        if (token) {
          const decoded = jwt.decode(token);
          const find_id = decoded.id;
          let user1 = await userModel.findOne(
            { _id: find_id });
          res.send(user1);
        }
      } catch (e) {
        res.send(e.message);
      }
    

}