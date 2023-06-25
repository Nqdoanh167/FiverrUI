/** @format */
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from '../utils/createError.js';

export const register = async (req, res) => {
   try {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
         ...req.body,
         password: hash,
      });

      await newUser.save();
      res.status(200).send('User has been created.');
   } catch (error) {
      console.log(error);
   }
};
export const login = async (req, res, next) => {
   try {
      const user = await User.findOne({username: req.body.username});
      if (!user) return res.status(404).send('User not found!');
      else {
         const isCorrect = await bcrypt.compare(req.body.password, user.password);
         if (!isCorrect) return res.status(400).send('Wrong password or username!');
         else {
            const token = jwt.sign(
               {
                  id: user._id,
                  isSeller: user.isSeller,
               },
               process.env.JWT_KEY,
            );

            const {password, ...info} = user._doc;
            res.cookie('accessToken', token, {
               httpOnly: true,
            })
               .status(200)
               .send({data: info, message: 'Login success!'});
         }
      }
   } catch (error) {
      next(error);
   }
};
export const logout = async (req, res) => {
   res.clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
   })
      .status(200)
      .send('User has been logged out.');
};
