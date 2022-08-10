import Room from '../models/roomModel.js'
import Hotel from '../models/hotelModel.js'

export const createRoom=async(req,res,next)=>{
    const hotelId= req.params.hotelId//beacause take hotel create room to the hotel
    const newRoom=new Room (req.body)
    try {
        const saveRoom=await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:saveRoom._id}},{new:true})
        } catch (error) {
            next(error)
        }
        res.status(201).json({saveRoom})
    } catch (error) {
        next(error)
    }
}

export const updateRoom=async(req,res,next)=>{
    try {
        let updateRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
}

export const deleteRoom=async(req,res,next)=>{
    const hotelId= req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId,{$pull :{rooms:req.params.id}})
        } catch (error) {   
            next(error)
        }
        res.status(200).json("Room is deleted")
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await Room.findById(req.params.id)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}
export const getAll=async(req,res,next)=>{
    try {
        const get=await Room.find()
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const updateRoomAvailability=async(req,res,next)=>{
    try {
        // if array nested nested do this "roomNumbers.$.unavaliable"
        //if update nested property dothis
        /*if use  "roomNumbers.unavailableDates":req.body.dates - its return error  "Cannot create field 
        'unavailableDates' in element {roomNumbers: [ { number: 101, unavailableDates: [ new Date(1657843200000) ]
        , _id: ObjectId('62cd3eeb6369834f9b31e9dd') }, { number: 102, unavailableDates: [], _id: 
        ObjectId('62cd3eeb6369834f9b31e9de') } ]}",*/ 
        //because rooms in inside hotel and roomNumbers in inside rooms i think that reason
        //findByIdAndUpdate is not working

        /*if sometime error like this "The positional operator did not find the match needed from the query." 
        if error is come  {$push:{"roomNumbers.$[].unavailableDates":req.body.dates} - use 
        roomNumbers.$[].unavailableDates   */ 
        let updateRoom=await Room.updateOne({"roomNumbers._id":req.params.id},{$push:{
            "roomNumbers.$.unavailableDates":req.body.dates
        }})
        // let updateHour=await Hour.updateOne({"hoursNumbers._id":req.params.id},{$push:{
        //     "hourNumbers.$unavailableDates":req.body.dates
        // }})
        res.status(200).json({data:updateRoom,message:"RoomNo updated"})
    } catch (error) {
        next(error)
    }
}