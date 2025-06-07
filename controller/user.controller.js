import create from "prompt-sync";
import User from "../model/user.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt  from "bcryptjs";

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "all feilds are required",
        });
        
    }
    console.log(email)
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exist"
            })
        }
        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user)
        if (!user) {
            return res.status(400).json({
                message: "User not registered"
            });
        }

        const token = crypto.randomBytes(32).toString("hex")
        console.log(token);
        user.isVerificationToken = token
        await user.save();

        //send email

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: Process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.USERNAME,
                pass: Process.env.PASSWORD,
            },
        });

        const mailOption = {

            from: Process.env.SENDEREMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Verify user email",// Subject line
            text: `please click on the email${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain text body
            // html body
        };


        await transporter.sendMail(mailOption)
        res.status(201).json({
            message: "user registered successfully",
            success: true
        })
    }


     catch (error) {

        res.status(400).json({
            message: "user not registered ",
            error,
            success: false
        })

    }
}
const verifyUser = async (req, res) =>{  

    const {token} = req.params;
    console.log(token);
    if(!token){
        return res.status(400).json({
            message:"Invalid token"
        })
    }
    const user = await User.findOne({
isVerificationToken: token})

 if(!user){
        return res.status(400).json({
            message:"Invalid token"
        })
    }
    user.isVerified = true
    user.isVerificationToken = undefined
    await user.save()
};

const login = async(req, res) => {

    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({
            messsage: "All fields are required"
        })
    }
    

    try{
       const user = await User.findOne({email})
       if(!usertwo){
        return res.status(400).json({
            message:"Invalid email or passsword"
        });
       }

       const isMatch = await bcrypt.compare{password, user.passsword}
    }
    catch(error)
}
export { registerUser, verifyUser };




//get user
//valid data
//checkuser is exist
//creatte user indb
//create varification token
//save token in db
//SEND to token  to email to user
//send success status to user