import gravatar from "gravatar";
import { nanoid } from "nanoid";
import path from "path";
import Jimp from "jimp";
import { User } from "../models/userModel.js";
import {
  NotAuthorizeError,
  RegistrationConflictError,
} from "../helpers/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export async function registration(email, password) {
  const user = await User.findOne({ email });
  if (user) throw new RegistrationConflictError("Email in use");
  const avatarURL = gravatar.url(email, { protocol: "https" });
  const newUser = new User({
    email,
    password,
    avatarURL,
  });
  await newUser.save();
  return { email, subscription: "starter", avatarURL };
}

export async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new NotAuthorizeError("Email or password is wrong");
  if (!bcrypt.compare(password, user.password)) {
    throw new NotAuthorizeError("Password is wrong");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  user.token = token;
  await user.save();
  const resUser = { email: user.email, subscription: user.subscription };

  return { token, resUser };
}

export async function logout(_id) {
  const user = await User.findOneAndUpdate(_id, { token: null });
  if (!user) throw new NotAuthorizeError("Not authorized");
  return user;
}

export async function changeSubscription(_id, subscription) {
  const user = await User.findOneAndUpdate(
    _id,
    {
      $set: {
        subscription: subscription,
      },
    },
    { new: true }
  );
  return user;
}

export async function changeAvatar(_id, file) {
  const newFileName = `${nanoid()}_${file.originalname}`;
  const folderPath = path.resolve("./src/public/avatars");

  try {
    const newPath = path.join(folderPath, newFileName);
    await Jimp.read(file.path)
      .then((avatar) => {
        return avatar.resize(250, 250).write(newPath);
      })
      .catch((error) => {
        throw error;
      });
    const avatarURL = path.join("avatars", newFileName);
    const user = await User.findOneAndUpdate(
      _id,
      {
        $set: {
          avatarURL: avatarURL,
        },
      },
      { new: true }
    );
    return user;
  } catch (err) {
    console.log(err);
  }
}
