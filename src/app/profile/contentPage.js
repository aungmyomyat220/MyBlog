"use client";
import React, { useState,useEffect } from "react";
import HomeTab from "@/app/profile/HomeTab";
import AboutTab from "@/app/profile/AboutTab";

const ContentPage = (props) => {
  const [activeTab, setActiveTab] = useState("Home");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = sessionStorage["user"];
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <div className="text-black p-8">
        <span className="text-4xl font-bold">Your Profile</span>
      </div>
      <div className="text-lg text-black grid grid-cols-2">
        <span
          className={`px-5 border-b-2 py-3 cursor-pointer ${
            activeTab === "Home" ? "border-black" : "border-gray-300"
          } text-center ${activeTab === "Home" ? "font-bold" : ""}`}
          onClick={() => handleTabClick("Home")}
        >
          Home
        </span>
        <span
          className={`border-b-2 py-3 cursor-pointer ${
            activeTab === "About" ? "border-black" : "border-gray-300"
          } text-center ${activeTab === "About" ? "font-bold" : ""}`}
          onClick={() => handleTabClick("About")}
        >
          About
        </span>
      </div>
      <div>{activeTab === "Home" ? <HomeTab /> : <AboutTab />}</div>
    </>
  );
};

export default ContentPage;
