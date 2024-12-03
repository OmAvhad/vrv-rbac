import User from "../models/user-model.js";
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    // Create password hash
    const passwordHash = await bcrypt.hash(user.password, 10);
    user.password = passwordHash;

    // Create user
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send;
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles");
    res.status(200).send(users);
  } catch (error) {
    res.status;
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status;
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status;
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status;
  }
};
