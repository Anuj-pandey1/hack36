
import PoolRequest from "../model/PoolRequest.js";
import route from "../model/RouteSchema.js";
import User from "../model/User.js"

export const addUser=async (request,response)=>{
try{
  // console.log(request.body);
let exist=await User.findOne({sub:request.body.sub});
if(exist)
{
    response.status(200).json(exist);
    return;
}
const newUser=new User(request.body);
await newUser.save();
return response.status(200).json(newUser);
}
catch(error)
{
response.status(500).json(error.message);
}
}



export const getUsers = async (request, response) => {
  try {
    const users=await User.find({});
    return response.status(200).json(users);
  
  } catch (error) {
    response.status(500).json(error.message);
  }
};

export const addPoolRequest=async (request,response)=>{
  try{
    const poolrequest =new PoolRequest(request.body);
    const x = await poolrequest.save();
    return response.status(200).json(x);
  }
    catch(error){
      response.status(500).json(error.message);
  }
}

export const acceptPoolRequest=async (request,response)=>{
  // console.log(request.body)
  try{ 
      const x = await PoolRequest.findOne({route_id : request.body.route_id});
      if(x){
        console.log(x.waypoints);
        // console.log(' ');
        try{
          const data = route.update({_id : x.route_id}, { $push :{ "waypoints": {$each: [x.waypoints] }} });
          // console.log(data);
          response.status(200).json(data);
        }catch(error){
          response.status(500).json(error.message);
        }
      }
    }catch(error){
      response.status(500).json(error.message);
    }
} 


export const postRoute = async (request, response) => {
  try {
    const new_route = new route(request.body);
    const x = await new_route.save();
    
    return response.status(200).json(x);
    }
    catch(error){
    response.status(400).json(error.message);
    }  
}

export const getAllRequests = async (request, response) => {
  try {
    const users=await User.find({});
    return response.status(200).json(users);
  
  } catch (error) {
    response.status(500).json(error.message);
  }
};



export const getRoute = async (request, response) => {
  try {
    const exist=await route.find();
    if(exist)
        return response.status(200).json(exist);
    } catch (error) {
    response.status(500).json(error.message);
  }
}; 

export const getAllRequest = async (request, response) => {
  // console.log(request.body)
  try {
    const exist=await PoolRequest.find({reciever_id : request.body.user_id});
    
    // console.log(request.body)
    if(exist)
        return response.status(200).json(exist);
        return response.status(200).json({});
    } catch (error) {
    response.status(500).json(error.message);
  }
};
