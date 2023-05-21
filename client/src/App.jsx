import './App.css'
import { Demo } from './components'
import { useState,useEffect } from 'react'

function App() {
  const [serverDropBoxAccess, setServerDropBoxAccess] = useState({
    haveAccess : false,
    code : null,
    redirectUrl : null
  });

  useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const code_token_access = queryParams.get("code");
    console.log(code_token_access);
    if(code_token_access) {
      setServerDropBoxAccess((prev) => (
        {
          ...prev,
          code : code_token_access
        }
      ));
    }else{
      const getStatus = async () => {
        const response = await fetch("http://localhost:8080/api/v1/auth");
        const result = await response.json();
  
        setServerDropBoxAccess((prev)=> ({
            ...prev,
            haveAccess : result.haveAccess,
            redirectUrl : result.redirectUrl
        }));
      }
  
      getStatus();
    }
  },[]);

  const handleClick = (e) => {
    if(serverDropBoxAccess){
      window.location.href = serverDropBoxAccess.redirectUrl
    }
  }
  return (
    <>
    {console.log(serverDropBoxAccess)}
      {
      serverDropBoxAccess.haveAccess ? 
      <Demo />
      :
      <button 
      className='px-8 py-4 bg-sky-700 text-white rounded-full'
      onClick={handleClick}
      >Connect</button>
      }
    </>
  )
}

export default App
