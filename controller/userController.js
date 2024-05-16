const { GenerateToken, Authentication } = require("./Authentication");
const User = require("../model/user");
const UserVerification = require("../model/userVerification");
const UserProfile = require("../model/userProfile");
const Chat = require("../model/chat");
const ChatUser = require("../model/chatUser");
const ChatConversation = require("../model/chatConversation");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userVerification = require("../model/userVerification");
const mongoose = require("mongoose");
dotenv.config();

const SendCode = async (req, res) => {
  console.log("called");
  try {
    if (req.body.email && validator.isEmail(req.body.email)) {
      const newOtp = Math.floor(1000 + Math.random() * 9000);
      console.log(newOtp);
      const findUserprofile = await User.findOne({
        email: req.body.email,
      });
      if (findUserprofile) {
        return res
          .status(409)
          .json({ status: 409, message: "user already exist" });
      }
      const findUser = await UserVerification.findOne({
        email: req.body.email,
      });

      if (findUser) {
        findUser.otp = newOtp;
        await findUser.save();
      } else {
        const user = new UserVerification({
          email: req.body.email,
          otp: newOtp,
        });
        await user.save();
      }
      return res.status(200).json({ status: 200, message: "Otp is sent" });
    }
  } catch (error) {
    return res.status(500).json({ status: 500, message: "Internal error" });
  }
};

const UserSignUp = async (req, res) => {
  try {
    if (
      req.body.password &&
      req.body.email &&
      validator.isEmail(req.body.email) &&
      req.body.name &&
      req.body.otp
    ) {
      const finduser = await User.findOne({ email: req.body.email });
      if (!finduser) {
        try {
          const session = await mongoose.startSession();
          session.startTransaction();

          const findOtp = await userVerification.findOne({
            email: req.body.email,
          });
          if (findOtp.otp != req.body.otp) {
            return res
              .status(422)
              .json({ status: 422, message: "Inavlid Otp" });
          }
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const user = new User({
            email: req.body.email,
            password: hashedPassword,
          });
          const savedUser = await user.save({ session });

          const profile = new UserProfile({
            user_id: savedUser._id,
            email: req.body.email,
            name: req.body.name,
            country: req.body.country,
            professional: req.body.professional,
            age: req.body.age,
          });
          await profile.save({ session });

          await session.commitTransaction();
          session.endSession();

          return res
            .status(200)
            .json({ status: 200, message: "Successfully registered" });
        } catch (error) {
          return res
            .status(500)
            .json({ status: 500, message: "Internal error", error: error });
        }
      } else {
        return res
          .status(409)
          .json({ status: 409, message: "User is already exist" });
      }
    } else {
      return res.status(404).json({ status: 409, message: "Invalid data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal error", error: error });
  }
};

const UserSignin = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !validator.isEmail(req.body.email) ||
      !req.body.password
    ) {
      return res
        .status(404)
        .json({ status: 404, message: "please enter your credentials" });
    }
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const findUser = await User.findOne({ email: userEmail });

    if (!findUser) {
      return res
        .status(404)
        .json({ status: 404, message: "user does not exist" });
    }
    const isPasswordMatch = await bcrypt.compare(
      userPassword,
      findUser.password
    );
    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ status: 404, message: "password is wrong" });
    }
    const { _id, email, password, ...other } = findUser;
    const forToken = {
      _id,
      email,
      password,
    };
    const tokenExpiration = "1d";
    jwt.sign(
      { forToken },
      process.env.Key,
      { expiresIn: tokenExpiration },
      (err, token) => {
        if (token) {
          findUser.token = token;
          findUser.save();
          return res.status(200).json({ token: token, data: findUser });
        }
      }
    );
  } catch {
    return res.status(500).json({ status: 500, message: "Internal error" });
  }
};

const UserLogout = async (req, res) => {
  try {
    if (!req.body.email || !validator.isEmail(req.body.email)) {
      return res.status(404).json({ staus: 404, message: "Inavalid request" });
    }
    const findUser = await User.findOne({ email: req.body.email });

    if (!findUser || findUser.token != req.headers.token) {
      return res
        .status(404)
        .json({ status: 404, message: "user does not exist" });
    }
    findUser.token = null;
    findUser.save();
    return res.status(200).json({ staus: 200, message: "Youa are logout" });
  } catch {
    return res.status(500).json({ status: 500, message: "Internal error" });
  }
};

const GetUserProfile = async (req, res) => {
  try {
    const current = await Authentication(req, res);

    const findUser = await UserProfile.findOne({ user_id: current._id });
    // .populate("user_id");

    return res.status(200).json({
      status: 200,
      message: "Profile found successfully",
      data: findUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal error", error });
  }
};

const GetAllUser = async (req, res) => {
  try {
    await Authentication(req, res);

    const findUser = await UserProfile.find({});
    // .populate("user_id");

    return res.status(200).json({
      status: 200,
      message: "Profile found successfully",
      data: findUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal error", error });
  }
};

const UserChat = async (req, res) => {
  try {
    const current = await Authentication(req, res);
    const user2_id = req.body.user2_id;
    const user1_id = current._id;

    const chatUsers = await ChatUser.findOne({
      user_id: {
        $all: [
          new mongoose.Types.ObjectId(user1_id),
          new mongoose.Types.ObjectId(user1_id),
        ],
      },
    });

    if (!chatUsers) {
      try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const newChat = new Chat({
          created_by: user1_id,
        });

        const savedNewChat = await newChat.save({ session });

        const chatUser = new ChatUser({
          chat_id: savedNewChat._id,
          user_id: [user1_id, user2_id],
        });
        await chatUser.save({ session });

        await session.commitTransaction();
        session.endSession();
      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, message: "Internal error", error: error });
      }
    }
console.log("chatUsers.chat_id",chatUsers.chat_id)
    const Conversation = await ChatConversation.find({
      _id: chatUsers.chat_id,
    }).populate("user_id");

    if (Conversation && Conversation.length > 0) {
      res.status(200).json(data);
    } else {
      res
        .status(200)
        .json({
          status: 200,
          message: "No message yet",
          chat_id: chatUsers.chat_id,
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Internal error", error: error });
  }
};

module.exports = {
  SendCode,
  UserSignUp,
  UserSignin,
  UserLogout,
  GetUserProfile,
  GetAllUser,
  UserChat,
};
