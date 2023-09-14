import React,{useEffect} from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { useDispatch,  useSelector } from "react-redux";

import MainLayout from "../../components/MainLayout";
import { login } from "../../services/index/users";

import { userActions } from "../../store/reducers/userReducers";

const  LoginPage = () => {
  

    const {mutate,isLoding}=useMutation({
    mutationFn:({email,password}) =>{
      return login({email,password});
    },
    onSuccess:(data) =>{
        console.log(data);

    },
   });

   

  
  const {register,handleSubmit,formState:{errors,isValid},
      watch,
    } = useForm({
      defaultValues:{  
        
      email:"",
      password:"",
      },
   mode:"onChange",
    });


   const submitHandler = (data) => {
    const {email,password}= data;
    mutate({email,password})
   };
 
   return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            

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
              Sign In
            </button>

            

          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage