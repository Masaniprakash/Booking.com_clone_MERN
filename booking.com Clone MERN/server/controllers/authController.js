import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
    
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        });
  
        await newUser.save();
        res.status(201).json({message:"User has been created."});
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user=await User.findOne({username:req.body.username})
        if (user) {
            const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
            if (!isPasswordCorrect) return res.status(400).json({message:"password wrong"});
            

            const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
            //its used for not show admin and password
            //...otherDetails is  mongoose function first two value ignore and balance value in otherDetails
            const {password , isAdmin , ...otherDetails} = user._doc
            //user._doc is used  for one purpose commend and run it
            res.cookie("access_token",token,{
                httpOnly:true
            })
            .status(200).json({...otherDetails});
        } else {
           return  res.status(404).json({message:"User not found"}); 
        }
    } catch (err) {
        next(err);
    }
  };