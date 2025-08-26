"use client";

import { VarifyLoginCode, getCode } from "@/services/login";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IoIosRefreshCircle } from "react-icons/io";
import Swal from "sweetalert2";

const VerifyPage = () => {
  const [timer, setTimer] = useState(120);

  const router = useRouter();
  const params = useSearchParams();

  const phoneNumber = params.get("phone");
  // console.log(phoneNumber);

  const handleCode = async (e) => {
    e.preventDefault();
    try {
      let codeEl = document.getElementById("txtCode");

      const res = await VarifyLoginCode(codeEl.value, phoneNumber);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.access_token);
        router.push("/");
      }
    } catch (e) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: e.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleGetCode = async (e) => {
    e.preventDefault();
    try {
      const res = await getCode(phoneNumber);
      // console.log(res);
      if (res) {
        setTimer(120);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // set timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // formet timer
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    // container
    <div className="w-full flex justify-center items-center min-h-dvh bg-gray-400">
      {/* log in modal */}
      <div className=" relative w-[320px] h-[568px]  bg-[#ffffff] ">
        {/* top content Frame12*/}
        <div className="flex gap-y-2 flex-col absolute w-[256px] h-[68px] top-14 left-8 ">
          <h4 className="text-xl font-bold leading-9 ">Connect with Moms</h4>
          <p className="text-[#454545] leading-6">
            Share and learn with others
          </p>
        </div>
        {/* buttom content */}
        <div className="relative top-[272px] w-full h-[296px] ">
          <h5 className="absolute font-bold leading-6 top-8 left-10">
            Sign up
          </h5>
          <h6 className="absolute py-3 font-bold text-sm leading-6 text-[#A5A5A5] top-14 left-10">
            Enter Code
          </h6>
          <input
            type="text"
            id="txtCode"
            placeholder=""
            className="absolute left-10 right-10 top-26 bg-[#a5a5a54f] leading-4 text-sm rounded-lg px-3 py-3 "
          />
          <div className="absolute left-12 top-36  flex gap-3 justify-center items-center text-sm text-gray-500">
            <span>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
            {timer <= 0 ? (
              <button
                className="text-xl cursor-pointer "
                onClick={(e) => handleGetCode(e)}
              >
                <IoIosRefreshCircle />
              </button>
            ) : null}
          </div>
          <button
            onClick={(e) => handleCode(e)}
            className=" rounded-lg cursor-pointer absolute left-10 right-10 top-44 py-3 bg-purple-400 font-bold text-white hover:bg-purple-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
