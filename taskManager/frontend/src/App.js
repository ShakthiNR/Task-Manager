import React  from 'react';
import CategoryInput from './functionality/categoriesPanel/CategoryIntput';





function App() {
  return (
<>
    {/* <div className='w-[100vw] 
    sticky   
    top-0 z-50 text-center 
    py-5 bg-white border-b-gray-200 shadow-sm font-mono '>
      <span
      className='
      text-xl md:text-2xl   bg-gradient-to-r bg-clip-text  text-transparent  
             from-black via-slate-700/60 to-black animate-text cursor-pointer
      '
      >
   Task Manager
      </span>

          
    </div> */}
<div className="sticky bg-gray-200  
    top-0 z-50 ">
<div className="  cursor-pointer flex justify-center items-center flex-col md:block
text-xl md:text-2xl font-mono mt-4 uppercase font-normal  w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl container mx-auto">
 
  Taskify React-Django App
  <div className='border-b-2 rounded-lg border-purple-500 w-[25%] md:w-[10%] mt-2 md:block'> </div>
  
       
</div></div>




      <div className='min-h-screen flex flex-col items-center mt-4  w-full  md:max-w-3xl lg:max-w-4xl xl:max-w-5xl container mx-auto'> 
        <div className=' max-w-6xl container border-b-2 border-b-purple-400 bg-white shadow-md border border-gray-200 rounded'>
        <CategoryInput />

        </div>
     

      </div>

      </>  
 
  );
}

export default App;