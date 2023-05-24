import {useState,useEffect} from 'react'

const Demo = ({data}) => {
  const [file, setFile] = useState();

  //Request Token
  useEffect(()=>{
    const {code} = data; 
    const request_token_access = async () => {
        const response = await fetch("http://localhost:8080/api/v1/auth",{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            access_code  : code,
          })
        });
        //const result = await response.json(); 
    };
    request_token_access();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file_upload",file);
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