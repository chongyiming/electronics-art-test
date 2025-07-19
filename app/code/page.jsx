"use client";
import React, { useState } from "react";
import axios from "axios";
const page = () => {
  const [code, setCode] = useState(0);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(e);

    const formData = new FormData();
    formData.append("code", code);
    const response = await axios.post("/api/user/signup", formData);
  };

  const onChangeHandler = (event) => {
    console.log(event);
    const value = event.target.value;
    if (value.length < 7 && parseInt(value) >= 0) {
      setCode(value);
    }
  };
  return (
    <div className="p-10">
      <h1 className="font-semibold text-2xl">Two-factor authentication</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          type="number"
          onChange={onChangeHandler}
          value={code}
          className="p-3 text-center h-10 rounded-lg mt-5 border border-gray-500 "
        ></input>
        <div>
          <button
            type="submit"
            className="mt-8 w-20 h-10 bg-black text-white rounded-lg;
"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
