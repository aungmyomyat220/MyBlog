"use client";
import NavBar from "./navbar";
import { useState } from "react";
import Foryou from "./foryou";
import Suggestion from "./suggestion";

export default function Home() {
  const [activeTab, setActiveTab] = useState("foryou");
  const handleClick = (tabname) => {
    setActiveTab(tabname);
  };

  return (
    <>
      <div className="flex flex-col w-full items-center h-screen">
        <NavBar></NavBar>
        <div className="grid grid-cols-6 w-full px-36 h-full">
          {/*First Div*/}
          <div className="col-span-4 pt-10 px-16">
            {/*menu*/}
            <div className="border-b grid grid-cols-12 text-center text-gray-500">
              <span
                className={`col-span-2 py-4 cursor-pointer ${
                  activeTab === "foryou" ? `border-b border-black` : `border-0`
                }`}
                onClick={() => handleClick("foryou")}
              >
                For you
              </span>
              <span
                className={`col-span-2 py-4 cursor-pointer ${
                  activeTab === "following"
                    ? `border-b border-black`
                    : `border-0`
                }`}
                onClick={() => handleClick("following")}
              >
                Following
              </span>
              <span className="col-span-8"></span>
            </div>
            {/*Data*/}
            <div>
              <Foryou></Foryou>
            </div>
          </div>

          {/*Second Div*/}
          <div className="col-span-2 border-l pt-14 pl-10">
            <Suggestion></Suggestion>
          </div>
        </div>
      </div>
    </>
  );
}
