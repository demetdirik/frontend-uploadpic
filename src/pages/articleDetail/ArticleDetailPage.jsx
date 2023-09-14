import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import { useSelector } from "react-redux"
import { images, stables } from "../../constants";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";

import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Editor from "../../components/editor/Editor";
import parseJsonToHtml from "../../utils/parseJsonToHtml";


const ArticleDetailPage = () => {
  
  const { slug } = useParams();
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);


  const { data ,isLoading, isError} = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);
      setBody(parseJsonToHtml(data?.body));
        
      
    },
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });
  
 

  return (
    <MainLayout>
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5">
          <article className="flex-1">


            <BreadCrumbs data={breadCrumbsData} />
            <img 
             className="rounded-xl w-full"
             src={data?.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
              : images.samplePostImage}
             alt={data?.title}
             />
 
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>


           
            
          </article>
        </section>
    </MainLayout>
  );
};

export default ArticleDetailPage;


/*  <Link to="/blog?category=selectedCategory" className="text-primary text-sm font-roboto inline-block mt-4 "></Link>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard">
                Help Children
            </h1>
            <div className="mt-4 prose prose-sm sm:prose-base">
                {body}
            </div>
            
            */