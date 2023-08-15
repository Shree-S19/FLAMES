import React, { useState, createContext } from 'react'
import "./Flames.css"
import InputForm from './InputForm';
import Lottie from "lottie-react"
import balloons from "../assets/balloons.json"

export const AppContext = createContext();

export default function FlamesHome() {
  const [userName,setUserName] = useState("");
  const [crushName,setCrushName] = useState("");

  return (
    <div id='flamesHome'>
        <div id='flames-container'>
            <div id='container-left'>
              <AppContext.Provider value={{userName,setUserName,crushName,setCrushName}}>
                  <InputForm/>
              </AppContext.Provider>
            </div>
            <div id='container-right'>
              <Lottie animationData={balloons} loop={false} />
            </div>
        </div>
    </div>
  )
}
