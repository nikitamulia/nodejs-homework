import {
    login,
    registration,
    logout,
    changeSubscription,
  } from "../services/users.js";
  
  export const registrationController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await registration(email, password);
    res.status(200).json({ user, status: "success" });
  };
  
  export const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    const { token, resUser } = await login(email, password);
    res.status(200).json({ status: "200 OK", token, user: resUser });
  };
  
  export const logoutController = async (req, res, next) => {
    const { _id } = req.user;
    await logout(_id);
    res.status(204).json({ status: "200 No Content" });
  };
  
  export async function currentUserController(req, res) {
    const { email, subscription } = req.user;
    const user = { email, subscription };
    res.status(200).json({ user });
  }
  
  export async function subscriptionController(req, res) {
    const { _id } = req.user;
    const body = req.body;
    const user = await changeSubscription(_id, body.subscription);
    console.log(user);
    res.status(200).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  }