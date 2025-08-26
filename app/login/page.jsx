"use client";

import { getCode } from "@/services/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetCode = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let purePhoneNumber = document.getElementById("txtPhone").value;
      const phoneNumber = normalizePhone(purePhoneNumber);
      // console.log(phoneNumber);
      const res = await getCode(phoneNumber);
      if (res.status == 200) {
        router.push(`/login/verify?phone=${phoneNumber}`);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const normalizePhone = (purePhoneNumber) => {
    const contryCode = "98";

    let tel = String(purePhoneNumber || "").trim();
    // فقط ارقام
    tel = tel.replace(/\D+/g, "");
    // حذف کد کشور
    const cc = contryCode.replace(/^\+/, "");
    tel = tel.replace(new RegExp(`^(?:00?${cc}|${cc})`), "");
    // حذف صفر اول شماره
    tel = tel.replace(/^0+/, "");
    return tel;
  };

  loading ?? <div>loading ....</div>;

  return (
    // container
    <div className="w-full flex justify-center items-center min-h-dvh bg-gray-400">
      {/* log in modal */}
      <div className=" relative w-[320px] h-[568px]  bg-[#ffffff] ">
        {/* top content Frame12*/}
        <div className="flex gap-y-2 flex-col absolute w-[256px] h-[68px] top-14 left-8 ">
          <h4 className="text-xl font-bold leading-9 ">AI Support, Anytime</h4>
          <p className="text-[#454545] leading-6">
            Quick answers to your questions
          </p>
        </div>
        {/* buttom content */}
        <div className="relative top-[272px] w-full h-[296px] ">
          <h5 className="absolute font-bold leading-6 top-8 left-10">
            Sign up
          </h5>
          <h6 className="absolute py-3 font-bold text-sm leading-6 text-[#A5A5A5] top-14 left-10">
            Enter Phone Number
          </h6>
          <input
            type="tel"
            id="txtPhone"
            placeholder="+989167652024"
            className="absolute left-10 right-10 top-26 bg-[#a5a5a54f] leading-4 text-sm rounded-lg px-3 py-3 "
          />
          <button
            onClick={(e) => handleGetCode(e)}
            className="rounded-lg absolute left-10 right-10 top-44 py-3 cursor-pointer bg-purple-400 hover:bg-purple-500"
          >
            Get Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
