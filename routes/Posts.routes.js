const express = require("express");
const { PostModel } = require("../model/Posts.model");
const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    const {device}=req.query
    try{
        const posts=await PostModel.find({deviceID:req.body.deviceID})
        res.status(200).send(posts)
    }catch(err){
        res.status(200).send({"err":err.message})
    }
})

postRouter.post("/create",async(req,res)=>{
    try{
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send("New note has been added")
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const {postID}=req.params;
    const post=await  PostModel.findOne({postID:_id})
    try{
        if(req.body.deviceID!==post.deviceID){
            res.status(200).send("You are not authorized.")
        }
        else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send("post has been updated")
        }
    }catch(err){
        res.status(200).send("You are not authorized.")
    }

})

postRouter.delete("/delete/:postID",async(req,res)=>{

    const {postID}=req.params;
    const post=await  PostModel.findOne({postID:_id})
    try{
        if(req.body.deviceID!==post.deviceID){
            res.status(200).send("You are not authorized.")
        }
        else{
            await PostModel.findByIdAndDelete({_id:postID},req.body)
            res.status(200).send("post has been updated")
        }
    }catch(err){
        res.status(200).send("You are not authorized.")
    }

})


module.exports={
   postRouter
}