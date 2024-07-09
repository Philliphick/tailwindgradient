"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export default function Home() {

  const [colour, setColour] = useState("#816654");
  const [isGradient, setIsGradient] = useState(false);
  const [isDirection, setIsDirection] = useState(false);
  const [newInput, setNewInput] = useState("")
  const [direction, setDirection] = useState('2deg')
  const [colour2, setColour2] = useState("#234131");

  const [hidden, setHidden] = useState(true)

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false)

  const [submit, setSubmit] = useState(false)

  const [white, setWhite] = useState(false);

  const handleHide = (e) => {
    setHidden(!hidden)
    console.log(hidden)
  }

  const handleColourChange = (e) => {
    setColour(e.hex);
    // if(e.rgb.r <= 109){
    //   setWhite(true);
    // } else {
    //   setWhite(false);
    // }
  };

  const handleColour2Change = (e) => {
    setColour2(e.hex);
    if (e.rgb.r <= 109) {
      setWhite(true);
    } else {
      setWhite(false);
    }
  };

  const handleInputChange = (e) => {

    setNewInput(e.target.value)
    console.log("New direction", direction)
  }

  const handleDirectionChange = (e) => {

    setDirection(`${newInput}deg`)
    console.log(direction)
  }

  const handleSubmit = () => {
    handleDirectionChange()
  }



  // useEffect(() => {
  //   setColour("#292D2E")
  //   setColour2("#719599")
  //   setDirection('50deg')
  // }, [])

  // useEffect(() => {
  //   handleDirectionChange()
  // }, [submit])

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
          ? `linear-gradient(${direction}, ${colour}, ${colour2})`
          : colour
      }}
    >
      <button className="" onClick={handleHide}>
        {hidden ? (
        <svg className="fixed top-12 right-12 size-20 hover:scale-110" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill-rule="nonzero" /></svg>
        ) : (<svg className="fixed top-12 right-12 size-20 hover:scale-110" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z" fill-rule="nonzero"/></svg>
        )}
        </button>


      {/* start of hidden?  */}
      {hidden ? (
      <>

        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-4">
            <button className="border-2 p-4 rounded-xl shadow-2xl dark:text-white hover:scale-110" style={{ background: colour }} onClick={handleButton1}>Colour One</button>

            {showPicker1 ? (<SketchPicker
              color={colour}
              onChangeComplete={handleColourChange}
            />) : (null)}
          </div>

          {isGradient ? (
            <div className="flex flex-col gap-4">
              <button className="border-2 p-4 rounded-xl shadow-2xl dark:text-white hover:scale-110" style={{ background: colour2 }} onClick={handleButton2}>Colour Two</button>
              {showPicker2 ? (<SketchPicker
                color={colour2}
                onChangeComplete={handleColour2Change}
              />) : (null)}


            </div>) : (null)}
        </div>
        <div className="flex flex-row gap-4 text-center font-bold">
          <label for="checkbox" className="dark:text-white">Select for gradient</label>
          <input type="checkbox" id="checkbox" onChange={() => setIsGradient(!isGradient)} className="size-6">
          </input>
        </div>
        <div className="flex flex-row text-center font-bold">
          <form action={handleSubmit}>
            <label for="direction" className="dark:text-white">Gradient Direction 1 - 360</label>
            <input type="text" id="direction" placeholder="(1 - 360)" onChange={handleInputChange} className="mx-4 text-center w-1/3"></input>
            <input type="submit" className="border-2 border-solid border-black p-2 rounded-lg dark:text-white hover:scale-110"></input>
          </form>

        </div>

      </>) : (null)} 
      {/*  */}
      <div className="flex flex-row gap-12 fixed top-10 left-12">
        <div className="flex flex-col text-center">
          <h3 className="text-lg pb-2 dark:text-white">Colour One</h3>
          <h2 className="ring-4 p-4 dark:text-white text-xl">{colour}</h2>
        </div>
        {isGradient ?
          <div className="flex flex-col text-center">
            <h3 className="text-lg pb-2 dark:text-white">Colour Two</h3>
            <h2 className="ring-4 p-4 dark:text-white text-xl">{colour2}</h2>
          </div>
          : null}
      </div>


    </main>
  );
}
