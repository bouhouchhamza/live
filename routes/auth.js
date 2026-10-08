import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const router = express.Router();

router.post('/register', async (req, res) => {
    //get user data 
    //try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        //save user 
        await user.save();
        //modify status code and send succces msg
        return res.status(201).json({message : "registration succcess. "})
    //} catch (err) {
        //modify response status and send catch err msg
        res.status(500).json({ message : err.message});
   // }

})

router.post('/login', async (req,res) => {
try{
    //grab user data
         const { email, password } = req.body;
     //   get user 
     const user = await User.findOne({email}).select("+password");
     console.log(user);
     //check if user exist and password is correct
     if(!user || !(await user.isMatched(password))) {
       return res.status(401).json({message : 'invalid credentials'}) 
     }
     //creation jwt token (sign)
     const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn :'1h'});
     console.log(token);
     return res.json({token});


}catch(err) {
 console.log(err)
}
})

export default router;