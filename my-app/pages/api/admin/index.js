import { Mongoconnect } from "../../../database/db";
import user from "../../../models/user.model";
const jwt = require("jsonwebtoken");
const sign = process.env.sign;
const Users = async (req, res) => {
  await Mongoconnect();
  const users =  await user.find();
 res.send(users)
  
};

export default Users;

