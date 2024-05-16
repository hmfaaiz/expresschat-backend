const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../model/user");
const tokenExpiration = "1d";

const GenerateToken = (user, res) => {
  jwt.sign(
    { user },
    process.env.Key,
    { expiresIn: tokenExpiration },
    (err, token) => {
      if (token) {
        return res.status(200).json({ token: token });
      } else {
        return res.status(404).json({ message: "Something is wrong in token" });
      }
    }
  );
};


const Authentication = (req, res) => {
  return new Promise((resolve, reject) => {
    const token = req.headers.token || req.headers.authorization;

    if (token) {
      jwt.verify(
        token.replace("Bearer ", ""),
        process.env.Key,
        async (err, user) => {
          if (user) {
            const currentTime = Math.floor(Date.now() / 1000);

            if (user.exp && user.exp < currentTime) {
              return res
                .status(404)
                .json({ status: 404, message: "Token has expired" });
            } else {
              const findUser = await User.findOne({ _id: user.forToken._id });

              if (
                !findUser ||
                !findUser.token ||
                findUser.token != token.replace("Bearer ", "")
              ) {
                return res

                  .status(404)
                  .json({ status: 404, message: "You are not authenticate" });
              }

              resolve(user.forToken);
            }
          } else {
            return res
              .status(404)
              .json({ status: 404, message: "Invalid token" });
          }
        }
      );
    } else {
      return res

        .status(404)
        .json({ status: 404, message: "You are not authenticate" });
    }
  });
};

module.exports = { GenerateToken, Authentication };
