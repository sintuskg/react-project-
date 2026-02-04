import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8)
  const [charactorallowed, setCharactorallowed] = useState(false)
  const [numberallowed, setNumberallowed] = useState(false)
  const [password, setPassword] = useState("")
  //password generator function
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallowed) str += "0123456789"
    if (charactorallowed) str += "!@#$%^&*()_+-={}[]|\\:;'<>,.?/~`"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
    
    pass += str.charAt(char)

    }
    setPassword(pass)



  }, [length, charactorallowed, numberallowed, setPassword])

  const passwordRef = useRef(null)

  useEffect(()=>{
    passwordGenerator()
  },[length,charactorallowed,numberallowed,passwordGenerator])

  const passwordcopttoclipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className="w-full text-orange-500 max-w-md mx-auto shadow-lg rounded-xl px-4 py-5 my-8 bg-gray-700">
  <h1 className="text-white text-center text-xl font-semibold mb-4">
    Password Generator
  </h1>

  <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-800">
    <input
      type="text"
      value={password}
      className="
        outline-none 
        w-full 
        px-3 
        py-2
        bg-transparent
        text-white
        placeholder-gray-400
      "
      placeholder="password"
      readOnly
      ref={passwordRef}
    />
    <button className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '
      onClick={passwordcopttoclipboard}
    >
    copy
    </button>
  </div>
  <div className=' flex text-sm gap-x-2 '>
    <div className=' flex items-center gap-x-1 '>
      <input 
      type="range" 
      min={6}
      max={100}
      value={length}
      className=' cursor-pointer '
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label>Length:{length}</label>
    </div>
    <div className=' flex items-center gap-x-1'>
      <input type="checkbox"
      defaultChecked={numberallowed}
      id="numberInput"
      onChange={()=> {
        setNumberallowed((prev)=>!prev)
      }}
      />
      <label htmlFor='numberInput'>Numbers</label>
    </div>
    <div className=' flex items-center gap-x-1'>
      <input type="checkbox"
      defaultChecked={charactorallowed}
      id="charInput"
      onChange={()=> {
        setCharactorallowed((prev)=>!prev)
      }}
      />
      <label htmlFor='charInput'>Charactor</label>
    </div>
  </div>
</div>

  )
}

export default App
