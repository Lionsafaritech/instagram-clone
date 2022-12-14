const express=require("express")
const router=express.Router()
const mongoose=require("mongoose")
const requireLogin=require("../middleware/requireLogin")
const Post=mongoose.model("Post")
const User=mongoose.model("User")

router.get("/user/:id",requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id}).select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((error,posts)=>{
            if(error){
                return res.status(422).json({error})
            }
            res.json({user,posts})
        })

    }).catch(error=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.put("/follow",requireLogin,(req,res)=>{
    
    User.findByIdAndUpdate(req.body.followId,{
        
        $push:{followers:req.user._id}
    },{
        new:true
    },(error,result)=>{
        if(error){
            return res.status(422).json({error})
        }
            User.findByIdAndUpdate(req.user._id,{
                $push:{following:req.body.followId}
            },{new:true}).select("-password").then(result=>{
                res.json(result)
                
            }).catch(error=>{
                return res.status(422).json({error})
            })
        
    })
})
router.put("/unfollow",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(error,result)=>{
        if(error){
            return res.status.apply(422).json({error})
        }else{
            User.findByIdAndUpdate(req.user._id,{
                $pull:{following:req.body.unfollowId}
            },{new:true}).select("-password").then(result=>{
                res.json(result)
            }).catch(error=>{
                return res.status(422).json({error})
            })
        }
    })
})

router.put("/updatepic",requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (error,result)=>{
            if(error){
                return res.status(422).json({error:"pic can not post"})
            }
            res.json(result)
        })
})

module.exports=router