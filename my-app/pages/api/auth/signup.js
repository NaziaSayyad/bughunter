import { Mongoconnect } from "../../../database/db";
import user from "../../../models/user.model";

export default async function Signup(req, res) {
  await Mongoconnect();

  const { name, email, password } = req.body;
  let oldUser = await user.findOne({ email });

  if (oldUser) {
    return res.send({ msg: "already exist" });
  }
  let new_users = new user({ name, email, password });
  await new_users.save();
  return res.status(201).send({ msg: "Sucessfully" });
}
