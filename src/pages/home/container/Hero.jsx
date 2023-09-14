import React from 'react';
import {FcSearch} from "react-icons/fc";
import {images} from "../../../constants" ;



const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5  ">
       <div className="mt-10 lg:w-1/2">
         <h1 className="font-roboto text-3xl text-left font-bold text-dark-soft md:text-2xl lg:tex-left lg:max-w-[540px]">Read the interesting article</h1>
         <p className ="text-dark-light mt-4 text-center md:text-xl lg:text-left ">
          Lorem ipsum dolor sit amet.
         </p>
       

         <div className="flex flex-col gap-y-2.5 mt-10 relative">
           <div className="relative">
             <FcSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
             <input className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] md:py-4" 
             type="text"  
             placeholder="Search"/>
           </div>
          
            <button className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute  md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
              Search</button>

        </div>
         
             <div> 
               <span></span>
               <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
           </div>
          <div className="hidden"></div>
        </div>

     
    </section>
  )
}

export default Hero
