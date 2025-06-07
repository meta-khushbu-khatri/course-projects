import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new  mongoose.Schema({

    name: String,
    emil: String,
    password: String,
    role:{
    type: String,
    enum: ["user", "admin"],
    default:"user",        
    },
    isVerified:{
        type: String,   
    enum: ["user", "admin"],
    default:"user",

    },
    isVerificationToken:{
        type: String,   
    

    },
  restPasswordToken:{
        type: String,   
    

    }

}, {
    timestamps: true,
});

userSchema.pre("save", async function (next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();

});
// userSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
//   };

const User = mongoose.model("User", userSchema)

export default User