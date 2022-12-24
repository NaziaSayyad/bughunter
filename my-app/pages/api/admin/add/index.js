import { Mongoconnect } from "../../../../database/db";
import userModel from "../../../../models/user.model";
const jwt = require("jsonwebtoken");
const sign = process.env.sign;
async function add(req, res) {
  await Mongoconnect();
  const payload = req.body;
  const user = new userModel(payload);
    await user.save();

      res.status(201).send({ msg: "ADDED successfully" });
  
}

export default add;
