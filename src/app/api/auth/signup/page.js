"use client"
import { imageUpload } from '@/utils/ImageUpload';
import React, {useState} from 'react';

const SingUpPage =  () => {
    const [file, setFile] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const imageURL = await imageUpload(file[0])
        const formData = {
            name : e.target.name.value,
            email : e.target.email.value,
            password : e.target.password.value,
            type : e.target.type.value,
            image : imageURL
        }
        console.log(formData)

        const res = await fetch('http://localhost:3000/api/auth/signup/new-user', {
            body : JSON.stringify(formData),
            headers : {
                "content-type" : "application/json"
            },
            method : "POST"
        })
        e.target.reset()
        console.log(res)
    }
    return (
        <div>
            <h2 className='text-3xl font-bold text-center py-4'>Sign Up</h2>

            <form onSubmit={handleSubmit} className='w-1/3 mx-auto p-10 border rounded-xl shadow-lg'>
                <div> 
                    <label className='text-lg font-bold'>Name</label> <br/>
                    <input className='w-full border-2 rounded-lg py-1 px-2' name="name" type="text" placeholder='Enter your name ...'/>
                </div>
                <div className='py-2'> 
                    <label className='text-lg font-bold'>Email</label> <br/>
                    <input className='w-full border-2 rounded-lg py-1 px-2' name="email" type="email" placeholder='Enter your email ...'/>
                </div>
                <div> 
                    <label className='text-lg font-bold'>Password</label> <br/>
                    <input className='w-full border-2 rounded-lg py-1 px-2' name="password" type="password" placeholder='Enter your Password ...'/>
                </div>
                <div> 
                    <label className='text-lg font-bold'>Image</label> <br/>
                    <input onChange={(e)=>setFile(e.target.files)} className='w-full border-2 rounded-lg py-1 px-2' name="image" type="file" placeholder='Enter your Image url ...' />
                </div>
                <div> 
                    <label className='text-lg font-bold'>Type</label> <br/>
                    <select  className='w-full border-2 rounded-lg py-1 px-2' placeholder = "user type..." name='type'>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                        <option value="member">Member</option>
                    </select>
                </div>
                <div className='pt-6 flex justify-center items-center'>
                    <button type='submit' className='bg-green-500 text-white text-lg font-bold py-1 px-4 rounded-lg'>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SingUpPage;