import { MongoClient, ServerApiVersion } from "mongodb";

let db;

const connectDB = async ()=>{
    if(db) return db;

    try {
        const uri = process.env.NEXT_PUBLIC_MONGODB_URL;
        const client = new MongoClient(uri, {
            serverApi : {
                version : ServerApiVersion.v1,
                strict : true,
                deprecationErrors : true
            }
        });
        db = client.db('next-auth-project')
        console.log("Database Connected Successfully")
        return db
    } catch (error) {
        console.log("Database is not Contected : ", error)
    }
}
export default connectDB;