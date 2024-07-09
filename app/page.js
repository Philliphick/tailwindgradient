"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import Alert from '@mui/material/Alert';




export default function Home() {

  const [colour, setColour] = useState("#546981");
  const [isGradient, setIsGradient] = useState(false);
  const [isDirection, setIsDirection] = useState(false);
  const [newInput, setNewInput] = useState("")
  const [direction, setDirection] = useState('2deg')
  const [colour2, setColour2] = useState("#234131");

  const [hidden, setHidden] = useState(true)

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false)

  const [complimentary, setComplimentary] = useState("")

  const [copyAlert, setCopyAlert] = useState(false)
  const [white, setWhite] = useState(false);

  const handleHide = (e) => {
    setHidden(!hidden)
    console.log(hidden)
  }

  const cssCode = `linear-gradient(${direction}, ${colour}, ${colour2})`

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

  const handleButton1 = (e) => {
    setShowPicker1(!showPicker1);
  }

  const handleButton2 = (e) => {
    setShowPicker2(!showPicker2);
  }

  const copyFunc = (e) => {
    // const toCopy = "linear-gradient(${direction}, ${colour}, ${colour2})"
    navigator.clipboard.writeText(cssCode)
    console.log(cssCode)

    setCopyAlert(true)
  }

  const handleComplimentary = (e) => {
    setColour2(complimentary)
  }

  // finding the complimentary colour vv


  useEffect(() => {
    hexToHSL(colour)
    console.log(complimentary, "this is complimentary")
  }, [colour])
  // call vv in a useEffect? 

  function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    // added 180 to find complimentary 
    h += 180;

    HSLToHex(h,s,l)

    // return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0, 
        b = 0; 
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);
  
    // Prepend 0s, if necessary
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    setComplimentary("#" + r + g + b)
    console.log(complimentary)
    return "#" + r + g + b;
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
            <button className="border-2 p-4 rounded-xl shadow-2xl dark:text-white hover:scale-110 text-2xl" style={{ background: colour }} onClick={handleButton1}>Colour One</button>

            {showPicker1 ? (<SketchPicker
              color={colour}
              onChangeComplete={handleColourChange}
            />) : (null)}
          </div>

          {isGradient ? (
            <div className="flex flex-col gap-4">
              <button className="border-2 p-4 rounded-xl shadow-2xl dark:text-white hover:scale-110 text-2xl" style={{ background: colour2 }} onClick={handleButton2}>Colour Two</button>
              {showPicker2 ? (<SketchPicker
                color={colour2}
                onChangeComplete={handleColour2Change}
              />) : (<div>
                <button style={{background: complimentary}} className="p-2 rounded-lg"  onClick={handleComplimentary}>Complimentary Colour</button>
              </div>)}


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
            <input type="submit" className="border-2 border-solid border-gray-800 bg-gray-400 p-2 rounded-lg dark:text-white hover:scale-110 active:bg-gray-500"></input>
          </form>
        </div>

        <section className="w-fit p-2 flex flex-col gap-2">
          {/* add func to copy tailwind code for this button */}
          {/* <div className="">
            <button className="bg-gray-300 hover:bg-gray-400 p-2 rounded-lg">
              <div className="flex flex-row gap-4"><h1>Tailwind Code</h1>
            <svg className="size-6" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm7.25-4.75h-2.5c-.414 0-.75.336-.75.75s.336.75.75.75h2.5v2.5c0 .414.336.75.75.75s.75-.336.75-.75v-2.5h2.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-2.5v-2.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm3.25-7.25v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
              </div>
            </button>
          </div> */}
          <div className="">
            <button onClick={copyFunc} className="bg-gray-300 hover:bg-gray-400 p-2 rounded-lg active:bg-green-300 visited:bg-green-400">
              <div className="flex flex-row gap-4"><h1>CSS Code</h1>
            <svg className="size-6" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm7.25-4.75h-2.5c-.414 0-.75.336-.75.75s.336.75.75.75h2.5v2.5c0 .414.336.75.75.75s.75-.336.75-.75v-2.5h2.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-2.5v-2.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm3.25-7.25v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z" fill-rule="nonzero"/></svg>
              <p className="">linear-gradient ({direction}, {colour}, {colour2})
              </p>
              </div>
            </button>
          </div>

        </section>

      </>) : (null)} 
      {/*  */}
      <div className="flex flex-row gap-12 fixed top-6 left-12">
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

      {/* {copyAlert ? setTimeout(() => {
  console.log("Delayed for 1 second.");
}, "1000")
     : (null)} */}

    </main>
  );
}
