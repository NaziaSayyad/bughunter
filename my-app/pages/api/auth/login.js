import { Mongoconnect } from "../../../database/db";
import user from "../../../models/user.model";

const jwt = require("jsonwebtoken");
const sign = process.env.sign;

export default async function Login(req, res) {
  try {
    await Mongoconnect();
    const { email, password } = req.body;
    let get_user = await user.findOne({ email });
    if (get_user) {
      if (get_user.password === password) {
        const token = jwt.sign(
          {
            id: get_user._id,
            name: get_user.name,
            role: get_user.role,
          },
          sign,
          { expiresIn: "7 days" }
        );

        return res.send({
          msg: "Login sucessfully",
          token: token,
          role: get_user.role,
          name: get_user.name,
          email: get_user.email,
        });
      } else {
        res.send({ msg: "password incorrect" });
      }
    } else {
      res.send("email not registred");
    }
  } catch (e) {
    res.send(e.message);
  }
}
