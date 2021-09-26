import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

// fn for signin
export const signin = async(req,res) => {
    const {email,password}=req.body;

    try {
        const existingUser=await User.findOne({email});

        if(!existingUser) return res.status(404).json({message:'User does not exist.'})

        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:'Invalid Credentials.'});

        const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:'1hr'});

        return res.status(200).json({result:existingUser,token});

    } catch (error) {
        res.status(500).json({message:'Something went wrong.'});
    }

};

// fn for signup
export const signup = async(req,res) => {
const {email,password,confirmPassword,firstName,lastName}=req.body;

try {
    console.log('Inside Backend controller - signup function')
    const existingUser=await User.findOne({email});
    if(existingUser) return res.status(400).json({message:'User with email already present.'});

    if(password !== confirmPassword) return res.status(400).json({message:'Password and confirm password do not match.'});
    //hash the password
    const hashedPassword = await bcrypt.hash(password,12);
    //create new user
    const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
    //create a jwt token
    const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:'1hr'});
    //return the result and token
    res.status(200).json({ result, token});
    

} catch (error) {
    res.status(500).json({error,message:'Something went wrong.- Inside Backend controller - signup function'});    
}

};