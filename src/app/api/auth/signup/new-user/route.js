import connectDB from "@/components/lib/connectDB"
import bcrypt from 'bcrypt'; 

export const POST = async (request)=>{
    try {
        const db = await connectDB();
        const userCollection = db.collection("users-info");
        const newUser = await request.json();
        const handlePassword = await bcrypt.hash(newUser.password, 10)
        newUser.password = handlePassword
        const res = await userCollection.insertOne(newUser);
        console.log(res);
        return Response.json({message : "new user create"})
    } catch (error) {
        return Response.json({message : "something went wrong"})
    }
}