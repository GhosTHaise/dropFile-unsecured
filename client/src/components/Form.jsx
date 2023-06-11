import {useRef} from 'react';

const Form = ({ file,setFile,handleSubmit }) => {
    const fileInputRef = useRef(null);

    const openFile = (e) => {
        e.preventDefault()
        fileInputRef.current.click();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setFile(null)
    }
  return (
    <div className='w-[480px] h-[350px] bg-white rounded-2xl p-6'>
        <form className='bg-primary-color w-full h-full border border-dashed border-gray-700 rounded-xl
            flex flex-col items-center justify-center 
        '>
            <img 
                src="/icon-folder.png" 
                alt="icon-folder" 
                className='w-[64px] mb-6 h-auto object-contain ' />
            <h4 className='w-2/3 text-center text-gray-600 mb-2'>
               {file?.name ||  "Drag Your Documents,photos or videos here to start uploading."}
            </h4>
            <div className='flex items-center gap-3'>
                <div className='w-[40px] border border-gray-400' />
                <span className='text-gray-400'>
                    OR
                </span>
                <div className='w-[40px] border border-gray-400' />
            </div>
            {
            !file ?
            <div>
                <button onClick={openFile} className='mt-2 px-4 py-2 bg-[#4553f0] rounded-md text-white text-sm text font-medium'>
                     Browse files
                 </button>
                <input onChange={(e) =>  setFile(e.target.files[0])} ref={fileInputRef} hidden type="file" />
            </div>
            
            :
            <div className='flex gap-2'>
                <button onClick={handleCancel} className='mt-2 px-4 py-2 bg-[#cc3d11] rounded-md text-white text-sm text font-medium'>
                    Cancel
                </button>
                <button onClick={handleSubmit} className='mt-2 px-4 py-2 bg-[#4553f0] rounded-md text-white text-sm text font-medium'>
                    Upload File
                </button>
            </div>
            }
            
        </form>
    </div>
  )
}

export default Form
