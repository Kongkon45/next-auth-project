"use client";
import { imageUpload } from "@/utils/ImageUpload";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SingUpPage = () => {
  const [file, setFile] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageURL = await imageUpload(file[0]);
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      type: e.target.type.value,
      image: imageURL,
    };
    console.log(formData);

    const res = await fetch("http://localhost:3000/api/auth/signup/new-user", {
    // const res = await fetch("https://next-auth-project-five.vercel.app/api/auth/signup/new-user", {
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    e.target.reset();
    console.log(res);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-1/3 mx-auto px-10 py-5 border rounded-xl shadow-lg mt-5"
      >
        <h2 className="text-3xl font-bold text-center pb-2">Sign Up</h2>
        <div>
          <label className="text-lg font-bold">Name</label> <br />
          <input
            className="w-full border-2 rounded-lg py-1 px-2"
            name="name"
            type="text"
            placeholder="Enter your name ..."
          />
        </div>
        <div className="py-2">
          <label className="text-lg font-bold">Email</label> <br />
          <input
            className="w-full border-2 rounded-lg py-1 px-2"
            name="email"
            type="email"
            placeholder="Enter your email ..."
          />
        </div>
        <div className="relative">
          <label className="text-lg font-bold">Password</label> <br />
          <input
            className="w-full border-2 rounded-lg py-1 px-2"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password ..."
          />
          <span
            className="absolute right-3 cursor-pointer top-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <div className="py-2">
          <label className="text-lg font-bold">Image</label> <br />
          <input
            onChange={(e) => setFile(e.target.files)}
            className="w-full border-2 rounded-lg py-1 px-2"
            name="image"
            type="file"
            placeholder="Enter your Image url ..."
          />
        </div>
        <div>
          <label className="text-lg font-bold">Type</label> <br />
          <select
            className="w-full border-2 rounded-lg py-1 px-2"
            placeholder="user type..."
            name="type"
          >
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="member">Member</option>
          </select>
        </div>
        <div className="pt-6 flex justify-center items-center">
          <button
            type="submit"
            className="bg-green-500 text-white text-lg font-bold py-1 px-4 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SingUpPage;
