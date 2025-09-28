import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID


export default function SignUp() {
  const [apiError , setApiError] = useState(null)
  const [loading , setLoading] = useState(false)
  , navigator = useNavigate()
  , phoneRegex = /^01[0125][0-9]{8}/
  , passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  ,{t} = useTranslation()

  , yupSchema = Yup.object().shape({
    name: Yup.string().min(3 , 'name is too short').max(20 , 'name is long').required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().matches(phoneRegex , 'phone number is invalid').required('phone number is required'),
    password : Yup.string().matches(passwordRegex , 'password must have at least eight characters one letter and one number').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')]).required('rePasswrd is required')
  })

  , formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:'',
    },
    validationSchema : yupSchema,
    onSubmit : handleLogin
  })
       
  async function handleLogin(values){
    setLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
    .then((response) => {
      localStorage.setItem('userToken' , response.data.token)
      localStorage.setItem('userName' , values.name)    
      navigator('/')
    })
    .catch((apiResponse) => {
      setApiError(apiResponse?.response?.data?.message)
      setLoading(false)   
    })
    
  }
  
  useEffect(() =>{
    if (JSON.parse(localStorage.getItem("userName")) || JSON.parse(localStorage.getItem("userToken"))) {
      navigator("/");
    }
  } , [])

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" , text: t('Login now')}
      );
    }
  }, []);

  function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    // send token to backend for verification
    localStorage.setItem('userToken',JSON.stringify(response.credential))
    console.log(response);   
    navigator('/') 
  }
  return (
    <>
      <div className="py-10">
        <form
          onSubmit={formik.handleSubmit}
          className="w-[80%] sm:w-[70%] lg:w-[40%] mx-auto flex flex-col gap-6"
        >
          <h1 className='text-3xl text-orange-500 text-center'>{t('Register')}</h1>

          <div id="g_id_signin" className="w-full  flex justify-center text-5xl"></div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">{t("or")}</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Name */}
          <div className="relative">
            <input
              name="name"
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              id="floating-phone-name"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating-phone-name"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600"
            >
              {t('Name')}
            </label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}
          </div>
  
          {/* Email */}
          <div className="relative">
            <input
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              id="floating-phone-email"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating-phone-email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600"
            >
              {t('Email')}
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}
          </div>
  
          {/* Phone */}
          <div className="relative">
            <input
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel"
              id="floating-phone-number"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating-phone-number"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600"
            >
              {t('Phone number')}
            </label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs">{formik.errors.phone}</p>
            )}
          </div>
  
          {/* Password */}
          <div className="relative">
            <input
              name="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              id="floating-phone-password"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating-phone-password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600"
            >
              {t('Password')}
            </label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
          </div>
  
          {/* Re-Password */}
          <div className="relative">
            <input
              name="rePassword"
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              id="floating-phone-rePassword"
              className="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating-phone-rePassword"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-orange-600"
            >
              {t('Re-Password')}
            </label>
            {formik.touched.rePassword && formik.errors.rePassword && (
              <p className="text-red-500 text-xs">{formik.errors.rePassword}</p>
            )}
          </div>
  
          {/* Submit button */}
          <div className="w-full flex justify-center items-center">
            <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 min-w-[120px] w-1/4 rounded-lg hover:bg-orange-600 cursor-pointer"
          >
            {loading?<i className='fas fa-spinner fa-spin'></i>:null}{t('Sign Up')}
          </button>
          </div>
          <div className='flex gap-2.5 my-2'>
            <p className='text-slate-600'>{t('switch to Login')}</p>
            <Link className='text-orange-500 hover:text-orange-600' to="/Login">{t('Login')}</Link>
          </div>
          {apiError? <p className='text-red-600 bg-red-300 p-3 w-full'>{apiError}</p>: null}
        </form>
      </div>
    </>
  );

  
}
