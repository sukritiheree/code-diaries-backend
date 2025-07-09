import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    position:{
        type:String,
        default:"N/A"
    },
    summary:{
        type:String,
        default:"N/A"
    },
    location:{
        type:String,
        default:"N/A"
    },
    profile_pic:{
        type:String,
        default:"../../public/user_pic.png"
    },
    bg_pic:{
        type:String,
        default:"https://img.freepik.com/premium-vector/laptop-with-word-keyboard-screen_906149-48380.jpg?w=1380"
    },
    name:{
        type:String,
        ref:"User"
    },
    email:{
        type:String,
        ref:"User"
    },
    password:{
        type:String,
        ref:"User"
    },
    isItTheUser:{
        type:Boolean,
        default:true
    }
})

export const Profile=mongoose.model("Profile",profileSchema);