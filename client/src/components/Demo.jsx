import {useState} from 'react'

const Demo = ({data}) => {
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file_upload",file);
    try {
      await fetch("http://localhost:8080/api/v1/dropbox",{
        method : "POST",
        body : formData
      });
      console.log("Success to send file");
    } catch (error) {
      console.log(error);
    }
  }
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