import React from 'react'

const Form = () => {
  return (
    <div className='w-[480px] h-[300px] bg-white rounded-2xl p-6'>
        <form className='bg-primary-color w-full h-full border border-dashed border-gray-700 rounded-xl
            flex flex-col items-center justify-center 
        '>
            <h4 className='w-2/3 text-center text-gray-600'>
                Drag Your Documents,photos or videos here to start uploading.
            </h4>
            <div className='flex items-center gap-3'>
                <div className='w-[40px] border border-gray-400' />
                <span className='text-gray-400'>
                    OR
                </span>
                <div className='w-[40px] border border-gray-400' />
            </div>
        </form>
    </div>
  )
}

export default Form
