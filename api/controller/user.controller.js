/** @format */
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const deleteUser = async (req, res) => {
   const user = await User.findById(req.params.id);

   if (req.userId !== user._id.toString()) {
      return res.status(403).send('You can delete only your account!');
   }
   await User.findByIdAndDelete(req.params.id);
   res.status(200).send('delete.');
};
export const getUser = async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      if (!user) res.status(404).send('User not found!');
      res.status(200).send(user);
   } catch (error) {
      console.log(error);
   }
};
