"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [colour, setColour] = useState("#ef9052");
  const [isGradient, setIsGradient] = useState(false);

  const handleColourChange = (e) => {
    setColour(e.target.value);
    e.preventDefault()
  };

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24" style={{backgroundColor: colour}}>
      <input
        type="color"
        value={colour}
        placeholder="Enter a colour"
        onChange={handleColourChange}
        className="size-20"
      >
      </input>
      {isGradient ? (
        <div
        ><input type="color" className="size-20"></input></div>
      ) : (null)}
      <div className="flex flex-row gap-4">
      <label for="checkbox">Select for gradient</label>
      <input type="checkbox" id="checkbox" onChange={() => setIsGradient(!isGradient)} className="size-6">
      </input>
      </div>
      
    </main>
  );
}
