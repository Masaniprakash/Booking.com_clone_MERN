import User from '../models/userModel.js'

export const updateUser=async(req,res,next)=>{
    try {
        let updateUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}

export const deleteUser=async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User is deleted")
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await User.findById(req.params.id)
        res.status(200).json({get})
    } catch (error) {
        next(error)
    }
}
export const getAll=async(req,res,next)=>{
    try {
        const get=await User.find()
        res.status(200).json({get})
    } catch (error) {
        next(error)
    }
}