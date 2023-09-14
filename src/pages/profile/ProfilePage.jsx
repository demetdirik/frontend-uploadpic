import React , {useEffect} from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import MainLayout from "../../components/MainLayout";
import {getUserProfile} from "../../services/index/users";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);

  const {data: profileData, isLoading: profileIsLoading} = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });
  

   useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);




  const {register,handleSubmit,formState:{errors,isValid},
      
    } = useForm({
      defaultValues:{  
        name:"",
      email:"",
      password:"",
      },
     values :{
      name: profileIsLoading ? "": profileData.name,
      email: profileIsLoading ? "" : profileData.email,
     },
     mode : "onChange",

    });


   const submitHandler = (data) =>{ };
 
   return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
              {...register("name")}
                placeholder="Enter name"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] "
                
              />
              
              </div>

              <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Enter password"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] "
              />  
            </div>


             

            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter password"
                className="placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border border-[#c3cad9] "
              />  
            </div>
            
            <button
              type="submit"
              
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Register
            </button>

            

          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;