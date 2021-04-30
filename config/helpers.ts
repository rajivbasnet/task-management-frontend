import config from "./default";

export const userCookieOptions = {
    cookieName: "userToken",
    cookieOptions: {
      secure: config.node_env === "production" ? true : false
    },
    password: config.cookie_hash_key as string
  }

