
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"


const registerUser = async(req, res) => {

   const {username, email, password} = req.body;

   const isUserExit = await userModel.findOne({email});

   if(isUserExit){
        return res.status(401).json({
             message: "User already exists"
        });
   }

   const hashPassword = await bcrypt.hash(password,10);

   const newUser = await userModel.create({
        username,
        email,
        password : hashPassword
   })

   const token = jwt.sign(
    {userId : newUser._id},
    process.env.JWT_SECRET
    )
    
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        token,
        user:{
            username: newUser.username,
            email: newUser.email,
        },
    })


}

const loginUser = async(req, res) => {
    const {email , password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_SECRET
    )

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        token,
        user:{
            username: user.username,
            email: user.email,
        },
    })
}

export default {registerUser, loginUser}