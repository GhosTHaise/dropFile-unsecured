import {useState,useEffect} from 'react'

const Demo = () => {
  const [file, setFile] = useState();
  const [jwt_access_token,setJwt_access_token] = useState("")
  //Request Token
  useEffect(()=>{
    if(window.localStorage.getItem("jwt_access_key")){
      setJwt_access_token(window.localStorage.getItem("jwt_access_key"));
    }else{
      const request_token_access = async () => {
        const response = await fetch("http://localhost:4000/api/v1/backblaze",{
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
      await fetch("http://localhost:8080/api/v1/backblaze",{
        method : "POST",
        body : formData
      });
      console.log("Success to send file");
    } catch (error) {
      console.log(error);
    }
  }

  //build function to request an api key
  return (
    <>
      <h1>Drop File</h1>
      <form>
          <input 
          type="file" 
          onChange={(e) =>  setFile(e.target.files[0])}
          />
          <button type='submit' onClick={(e)=>handleSubmit(e)}>
              Upload*
          </button>
      </form>
    </>
  )
}

export default Demo