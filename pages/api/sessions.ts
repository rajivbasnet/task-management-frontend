import { withIronSession } from "next-iron-session";
import config from "../../config/default";

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      const { email, role } = req.body
      console.log(email, role )
      try {
        req.session.set("user", {email, role});
        await req.session.save();
        return res.status(201).send("");
      }
      catch(e) {
        return res.status(403).send("");
      }
    }

    return res.status(404).send("");
  },
  {
    cookieName: "userToken",
    cookieOptions: {
      secure: false
    },
    password: config.cookie_hash_key as string
  }
);