import {connect} from '@/dbConfig/dbConfig' 
import User from "@/models/userModel"
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'


connect()
export async function POST(request:NextRequest){
    try {
       const reqBody= request.json()
       const {username,email,password}=reqBody
       console.log(reqBody);

       const user=await User.findOne({email})
       if(user){
        return NextResponse.json({error:"User Alerady exist"},{status:400})
       }

       
       
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}