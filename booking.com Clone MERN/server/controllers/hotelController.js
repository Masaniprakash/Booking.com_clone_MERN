import Hotel from '../models/hotelModel.js'
import Room from '../models/roomModel.js'

export const createHotel=async(req,res,next)=>{
    const newHotel= new Hotel(req.body)
    try {
        let saveHotel=await newHotel.save()
        res.status(201).json(saveHotel)
    } catch (error) {
        next(error)
    }
}

export const updateHotel=async(req,res,next)=>{
    try {
        let updateHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}

export const deleteHotel=async(req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel is deleted")
    } catch (error) {
        next(error)
    }
}

export const getById=async(req,res,next)=>{
    try {
        const get=await Hotel.findById(req.params.id)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}
export const getAll=async(req,res,next)=>{
    const {min,max,...other}=req.query
    try {
        //if not give min,max or value is set-- 
        //min max used purpose is to find min max price filter in single hotel page
        const get=await Hotel.find({...other,cheapestPrice:{$lt:max || 10000,$gt:min || 1}}).limit(req.query.limit)
        res.status(200).json(get)
    } catch (error) {
        next(error)
    }
}

export const countByCity=async(req,res,next)=>{
    const cities=req.query.cities.split(",")
    try {
        const list=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

//we not use req.query beacause propties type ha 5only 
//so we not use but in city has many city so we use query
export const countByType=async(req,res,next)=>{
    const hotelCount= await Hotel.countDocuments({type:"Hotel"})
    const apartmentCount= await Hotel.countDocuments({type:"Apartment"})
    const villaCount= await Hotel.countDocuments({type:"Villa"})
    const resortCount= await Hotel.countDocuments({type:"Resort"})
    const cabinCount= await Hotel.countDocuments({type:"Cabin"})
    res.status(200).json([
        {type:"Hotel",count:hotelCount},
        {type:"Apartment",count:apartmentCount},
        {type:"Villa",count:villaCount},
        {type:"Resort",count:resortCount},
        {type:"Cabin",count:cabinCount}
    ])
    
}


/*not use Promise.all it error as "Converting circular structure to JSON\n    --> starting at object with 
constructor 'Topology'\n    |     property 's' -> object with constructor 'Object'\n  | property 
'sessionPool' -> object with constructor 'ServerSessionPool'\n    --- property 'topology' closes the circle"*/
export const getHotelRooms = async (req,res,next)=>{
    try {
        const hotel=await Hotel.findById(req.params.id)
        const list = await  Promise.all(hotel.rooms.map(room=>{
                return Room.findById(room)
            }))
        
        res.status(200).json(list)

    } catch (error) {
        next(error)
    }
}