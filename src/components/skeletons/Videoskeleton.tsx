import React from 'react'

type Props = {}

const Videoskeleton = (props: Props) => {
    const COUNTER = 8;
    const mycounter = [1,2,3,4,5,6,7,8,9]
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-[10px] gap-[5px]'>
            {/* first card */}
            {mycounter.map((index)=>
            <div key={index} className='skeleton mb-[20px]'>
                <div className='min-w-[200px] rounded-sm h-[200px] bg-[#313131]'>
                </div>
                <div className='flex justify-around mt-[15px]'>
                    <div className='w-[36px] rounded-full h-[36px] bg-[#313131]'></div>
                    <div className='flex flex-col w-[80%]'>
                        <div className='bg-[#313131] rounded-sm mb-[5px] h-[20px]'></div>
                        <div className='bg-[#313131] h-[20px]'></div>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default Videoskeleton;