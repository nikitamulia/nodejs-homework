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
import sgMail from "@sendgrid/mail";
import { verify } from "crypto"
import * as dotenv from "dotenv";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export async function registration(email, password) {
  const user = await User.findOne({ email });
  if (user) throw new RegistrationConflictError("Email in use");
  const avatarURL = gravatar.url(email, { protocol: "https" });
  const verificationToken = nanoid();
  const newUser = new User({
    email,
    password,
    avatarURL,
    verificationToken,
  });
  const msg = {
    to: email,
    from: "crovone96@gmail.com",
    subject: "Confirm email",
    text: "Please, confirm your email",
    html: `Please, <a href="http://localhost:3000/api/users/verify/${verificationToken}">confirm</a> your email"`,
  };

  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Email sent");
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();

  await newUser.save();
  return { email, subscription: "starter", avatarURL, verificationToken };
}

export async function verifityUser(verificationToken) {
  const verifUser = await User.findOne({ verificationToken });
  if (!verifUser) {
    throw new WrongParamsError("Your email is not verified");
  }
  const user = await User.findByIdAndUpdate(verifUser._id, {
    verificationToken: null,
    verify: true,
  });
  return user;
}
export async function repeatVerifityUser(email) {
  const verifUser = await User.findOne({ email });
  if (!verifUser) {
    throw new WrongParamsError("Missing required field email");
  }
  if (verifUser.verify) {
    throw new WrongParamsError("Verification has already been passed");
  }
  const msg = {
    to: email,
    from: "crovone96@gmail.com",
    subject: "Confirm email",
    text: "Please, confirm your email",
    html: `Please, <a href="http://localhost:3000/api/users/verify/${verifUser.verificationToken}">confirm</a> your email"`,
  };

  (async () => {
    try {
      await sgMail.send(msg);
      console.log("Repeat Email sent");
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
}

export async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new NotAuthorizeError("Email or password is wrong");
  if (!user.verify) throw new NotAuthorizeError("Your email is not verified");
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

  await User.findByIdAndUpdate(user._id, { token });

  const resUser = {
    email: user.email,
    subscription: user.subscription,
  };
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
