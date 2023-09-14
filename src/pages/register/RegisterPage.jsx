import React , {useEffect} from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import MainLayout from "../../components/MainLayout";
import { signup } from "../../services/index/users";

import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import { userActions} from "../../store/reducers/userReducers";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);


    const {mutate,isLoding}=useMutation({
    mutationFn:({name,email,password}) =>{
      return signup({name,email,password});
    },
    onSuccess:(data) =>{
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account',JSON.stringify(data));
    },
   }); 

   useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);




  const {register,handleSubmit,formState:{errors,isValid},
      watch,
    } = useForm({
      defaultValues:{  
        name:"",
      email:"",
      password:"",
      },
   mode:"onChange",
    });


   const submitHandler = (data) => {
    const {name,email,password}= data;
    mutate({name,email,password})
   };
 
   return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Sign Up
          </h1>
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

export default RegisterPage
