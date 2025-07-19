"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const page = ({ searchParams }) => {
  const [id, setId] = useState();
  const router = useRouter();
  const [code, setCode] = useState(0);

  //set the userId from the url to id first when page is render
  useEffect(() => {
    setId(searchParams?.id);
  }, []);

  //function when user click on submit button for code checking
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

  //Function for user to change the value of code, restrict the value to have length = 6 and cannot have negative value
  const onChangeHandler = (event) => {
    const value = event.target.value;
    if (value.length < 7 && parseInt(value) >= 0) {
      setCode(value);
    }
  };

  //show "Please login first" if userId is not define in url, else show the dynamic code page
  return (
    <>
      {id ? (
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
      ) : (
        <div className="flex justify-center items-center h-screen text-2xl">
          Please login first
        </div>
      )}
    </>
  );
};

export default page;
