import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { images, stables } from "../../../../constants";
import { deletePost, getAllPosts } from "../../../../services/index/posts";
import { useEffect, useState } from "react";
import Pagination from "../../../../components/Pagination";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";




let isFirstRun = true;

const ManagePosts = () => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });


  
  const { mutateDeletePost, isLoading: isLoadingDeletePost } = useMutation({

    mutationFn: ({ slug}) => {
      return deletePost({
        slug,
        
      });
    },
    onSuccess: (data) => {
     
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post is deleted");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [refetch, currentPage]);

  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  const deletePostHandler = ({ slug}) => {
    mutateDeletePost({ slug });
  };

 return(

  
  <div>
    <h1 className="text-21 font-semibold">Manage Posts</h1>
<div className=" w-full  px-4 mx-auto ">
    <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">
                Users
            </h2>
            <div className="text-end">
                <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                    <div className=" relative ">
                        <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="name"/>
                        </div>
                        <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                            Filter
                        </button>
                    </form>
                </div>
            </div>
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Title
                                </th>
                                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Category
                                </th>
                                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Created at
                                </th>
                                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                    Tags
                                </th>
                                <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          {isLoading || isFetching ? (
                           <tr>
                            <td colSpan={5} className="text-center py-10 w-full">
                             Loading...
                            </td>
                           </tr>

                          ) : (
                             postsData?.data.map((post) => (
                               <tr>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <a href="/" className="relative block">
                                                <img
                                                src={post?.photo ? stables.UPLOAD_FOLDER_BASE_URL +
                                                post?.photo : images.samplePostImage
                                               } 
                                                alt={post.title}

                                               className="mx-auto object-cover rounded-lg h-10 w-10 aspect-square"
                                               />

                                            </a>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {post.title}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {post.categories.lenght > 0
                                        ? post.categories[0]
                                        : "Uncategorized"
                                      }
                                    </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        
                                        {new Date(post.createdAt).toLocaleDateString(
                                          "en-US",
                                          {
                                           day:"numeric",
                                           month:"short",
                                           year:"numeric", 
                                          }
                                        )}
                                    </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    
                                <div>
                                  {post.tags.length > 0 ? post.tags.map((tag,index) => (
                                    <p>{tag}</p>
                                  )) : "No tags"}
                                </div>

                                </td>



                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">

                                  <button 
                                  disabled={isLoadingDeletePost}
                                  type="button" className="text-red-600 hover:text-red-900 
                                  disabled:opacity-70 disabled:cursor-not-allowed"
                                  onClick={() => {
                                    deletePostHandler({slug:post?.slug})
                                  }}
                                  >
                                  Delete
                                  </button>


                                    <Link
                                     to={`/admin/posts/manage/edit/${post?.slug}`} 
                                    className="text-indigo-600 hover:text-indigo-900">

                                       Edit
                                   
                                    </Link>
                                </td>


                            </tr>

                             ))

                            
                          
                          )}
                           
                        </tbody>
                    </table>
                    <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                        <div className="flex items-center">
                            <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                            <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                                1
                            </button>
                            <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                2
                            </button>
                            <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                                3
                            </button>
                            <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                                4
                            </button>
                            <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                                <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>



 );


 };
export default ManagePosts;