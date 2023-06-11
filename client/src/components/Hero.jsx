import {useState,useEffect} from 'react'
import Form from './Form';

const Hero = () => {
  const [file, setFile] = useState();
  const [jwt_access_token,setJwt_access_token] = useState("")
  //Request Token
  useEffect(()=>{
    if(window.localStorage.getItem("jwt_access_key")){
      setJwt_access_token(window.localStorage.getItem("jwt_access_key"));
    }else{
      const request_token_access = async () => {
        const response = await fetch("https://dropfile-unsecured.onrender.com/api/v1/backblaze",{
          method : "GET",
          headers : {
            "Content-Type" : "application/json"
          },
        });
        const result = await response.json();
        console.log(result.backblaze_token);
        window.localStorage.setItem("jwt_access_key",result.backblaze_token[0].token);
        setJwt_access_token(result.backblaze_token[0].token);
    };
    request_token_access();
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file_upload",file);
    formData.append("jwt_token",jwt_access_token)
    try {
      await fetch("https://dropfile-unsecured.onrender.com/api/v1/backblaze",{
        method : "POST",
        body : formData
      });
      
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  }

  //build function to request an api key
  return (
    <div className='bg-primary-color min-h-screen w-screen flex justify-center items-center'>
      {/* <h1>Drop File</h1>
      <form>
          <input 
          type="file" 
          onChange={(e) =>  setFile(e.target.files[0])}
          />
          <button type='submit' onClick={(e)=>handleSubmit(e)}>
              Upload*
          </button>
      </form> */}
      <Form file={file} setFile={setFile}  handleSubmit={handleSubmit}  />
    </div>
  )
}

export default Hero