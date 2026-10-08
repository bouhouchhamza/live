import jwt from "jsonwebtoken";
import User from "../models/User.js";

const middleware = async (req, res, next) => {
  console.log("before try")
  try {
    console.log("after try")
    // grab jwt token and parse it
    const token = req.headers.authorization?.split(" ")[1];
    
    //grab stored id in token duing signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    //get the user assigned to the id stored in the jwt token
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
   return err 
  }
};

export default middleware;
