"use client";
import axios from "axios";

const URL_SERVER = "http://82.115.21.156:8000";

export const getCode = (phoneNumber) => {
  console.log(phoneNumber);
  const url = `${URL_SERVER}/accounts/login/`;
  const data = {
    country_code: "98",
    local_phone: phoneNumber,
    language: "Persian",
  };
  return axios.post(url, data);
};

export const VarifyLoginCode = (code, phoneNumber) => {
  const url = `${URL_SERVER}/accounts/verify-login`;
  const data = {
    country_code: "98",
    local_phone: phoneNumber,
    one_time_pass: code,
  };
  return axios.post(url, data);
};

export const logout = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const url = `${URL_SERVER}/accounts/logout`;
  return axios.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
