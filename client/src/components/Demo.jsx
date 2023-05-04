import {useState} from 'react'

const Demo = () => {
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file_upload",file);
    
    try {
      await fetch("")
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
          <button type='submit' onSubmit={handleSubmit}>
              Upload*
          </button>
      </form>
    </>
  )
}

export default Demo