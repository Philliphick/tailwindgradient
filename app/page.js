"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export default function Home() {

  const [colour, setColour] = useState("#ef9052");
  const [isGradient, setIsGradient] = useState(false);
  const [colour2, setColour2] = useState("#ef9052");

  const[showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false)

  const [white, setWhite] = useState(false);

 
  const handleColourChange = (e) => {
    setColour(e.hex);
    if(e.rgb.r <= 109){
      setWhite(true);
    } else {
      setWhite(false);
    }
  };

  const handleColour2Change = (e) => {
    setColour2(e.hex);
    if(e.rgb.r <= 109){
      setWhite(true);
    } else {
      setWhite(false);
    }
  };

  const handleButton1 = (e) => {
    setShowPicker1(!showPicker1);
  }

  const handleButton2 = (e) => {
    setShowPicker2(!showPicker2);
  }
  
  return (
    <main 
    className={`flex min-h-screen flex-col items-center justify-center gap-10 p-24 ${white ? 'dark' : 'light'} `}
    style={{ 
      background: isGradient 
        ? `linear-gradient(to right, ${colour}, ${colour2})` 
        : colour 
    }}
  >      
      <button className="border-2 p-4 rounded-xl shadow-2xl dark:text-white" style={{ background: colour }} onClick={handleButton1}>Colour One</button>

     {showPicker1 ? ( <SketchPicker
        color={colour}
        onChangeComplete={handleColourChange}
      /> ) : (null)} 

      {isGradient ? (
        <>
        <button className="border-2 p-4 rounded-xl shadow-2xl dark:text-white" style={{ background: colour2 }} onClick={handleButton2}>Colour Two</button>
         {showPicker2 ? ( <SketchPicker
          color={colour2}
          onChangeComplete={handleColour2Change}
          />) : (null)}
          
          
      </> ) : (null)}
      <div className="flex flex-row gap-4">
      <label for="checkbox" className="dark:text-white">Select for gradient</label>
      <input type="checkbox" id="checkbox" onChange={() => setIsGradient(!isGradient)} className="size-6">
      </input>

      </div>
      <div className="flex flex-row gap-12 text-4xl">
          <h2 className="ring-4 p-4 dark:text-white">{colour}</h2>
          {isGradient ? <h2 className="ring-4 p-4 dark:text-white">{colour2}</h2> : null}
      </div>
     
      
    </main>
  );
}
