import { useRouter } from "next/router";
import { Mongoconnect } from "../../../../database/db";
import userModel from "../../../../models/user.model";
const jwt = require("jsonwebtoken");
const sign = process.env.sign;
async function user(req, res) {
  const { id } = req.query;
   await Mongoconnect();
  
    try {
      await userModel.findByIdAndDelete({_id:id})
        res.send({msg: "Deleted Successfully"})
      } catch (err) {
        res.send({ err: err });
      }
  
}

export default user;
