"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    const submitter = e.nativeEvent.submitter.name;
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (submitter === "SignUp") {
      const response = await axios.post("/api/user/signup", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } else if (submitter === "Login") {
      const response = await axios.post("/api/user/login", formData);
      if (response.data.success) {
        toast.success(response.data.msg, {
          onClose: () => {
            router.push("/code");
          },
        });
      } else {
        toast.error(response.data.msg);
      }
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  return (
    <div className="p-10">
      <form onSubmit={onSubmitHandler}>
        <p className="text-xl mt-4">Email</p>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Enter your email"
          required
        ></input>
        <p className="text-xl mt-4">Password</p>
        <input
          name="password"
          onChange={onChangeHandler}
          value={data.password}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Enter your password"
          required
        ></input>
        <div className="gap-10 flex ">
          <button
            name="SignUp"
            type="submit"
            className="mt-8 w-40 h-12 bg-black text-white"
          >
            Sign Up
          </button>
          <button
            name="Login"
            type="submit"
            className="mt-8 w-40 h-12 bg-black text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
