import jwt from "jsonwebtoken"

export const generateToken = (user) =>{
return jwt.sign(user, process.env.TOKEN_KEY,{expiresIn:"30d"});
}