import React, { useState, createContext } from 'react'
import "./Flames.css"
import InputForm from './InputForm';


export const AppContext = createContext();

export default function FlamesHome() {
  const [userName,setUserName] = useState("");
  const [crushName,setCrushName] = useState("");

  return (
    <div id='flamesHome'>
            <AppContext.Provider value={{userName,setUserName,crushName,setCrushName}}>
                 <InputForm/>
            </AppContext.Provider>
    </div>
  )
}
