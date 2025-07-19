"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const page = ({ searchParams }) => {
  const id = searchParams?.id;
  const router = useRouter();
  const [code, setCode] = useState(0);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(`/api/code?id=${id}`);
    if (response.data.msg.code === code) {
      toast.success("Code is correct", {
        onClose: () => {
          router.push("/homepage");
        },
      });
    } else {
      toast.error("Code is not correct");
    }
  };

  const onChangeHandler = (event) => {
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
          data-testid="codeField"
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
