import React from 'react';

import { images , stables } from '../constants';
import {Link } from "react-router-dom";

const ArticleCard = ({post ,className}) => {

  
  return (
    <div className={'rounded-x1 overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ${className}'} >
      
      <Link to={`/blog/${post.slug}`}>
      <img 
            src={
              post.photo
               ? stables.UPLOAD_FOLDER_BASE_URL + post.photo 
               : images.samplePostImage } 
            alt="title" 
            className="w-full object-cover object-center h-auto md:auto md:h-52 lg:h-48 xl:h-60"   />
       </Link>
      

       <div className="p-5">
       <Link to={`/blog/${post.slug}`}>

        <h2 className="font-roboto font-bold text-x1 text-dark-soft md:text-2xl lg:text-[28px]">
         {post.title}
          </h2>
        <p className="text-dark-light mt-3 text-sm md:text-lg">
            {post.caption}
        </p>
         </Link>

          <div className="flex justify-between flex-nowrap items-center mt-6">
            <div className="flex items-center gap-x-2 md:gap-x-2.5">
            PROFİL RESMİ
          
            <div className="flex flex-col">
                <h4 className="font-bold italic text-dark-soft text-sm">
                 

                 
                </h4>
                 <div className="flex- items-center gap-x-2">
                   <span></span>
                   <span></span>
                 </div>
            </div>
        </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleDateString("default",{
              month: "long",
            })}
            </span>
          </div>
       </div>
    </div>

   
  );
};

export default ArticleCard
