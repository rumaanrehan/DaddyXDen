import React, { useState, useContext } from 'react'
// import './CSS/LoginSignUp.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from '../context/ShopContext';
const LoginSignUp = () => {
  let navigate = useNavigate();
  const [state, setstate] = useState("Sign Up")
  const [credentials, setCredentials] = useState({
    email : "", password: ""
});
const { getUser } = useContext(ShopContext);

const login= async (e)=>{
  const response = await fetch("http://localhost:4000/api/userauth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       },
       body: JSON.stringify({email: credentials.email, password:credentials.password}),
    }); 
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the authtoken to local browser storage and redirect
      localStorage.setItem('token', json.authtoken);
      getUser();
      navigate('/');
      toast("Logged In");
      // props.showAlert("Account Created Successfully", "success");
      
      }else{
        console.log(json)
        toast(json.error);
      // props.showAlert("Invalid Credentials", "danger");
    }
}
const signup = async(e)=>{
  const response = await fetch("http://localhost:4000/api/userauth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
       },
       body: JSON.stringify({name: credentials.name, email: credentials.email, password:credentials.password}),
    }); 
    const json = await response.json();
    console.log(json);
    if(json.success){
      //Save the authtoken to local browser storage and redirect
      localStorage.setItem('token', json.authtoken);
      getUser();
      navigate('/');
      // props.showAlert("Account Created Successfully", "success");

    }else{
      console.log(json)
      // props.showAlert("Invalid Credentials", "danger");
    }
}
  const onChange=(e)=>{
    //State: {description: "", tag: "", title: ""}
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  

  return (
    <div className='loginsignup w-full h-[864px] bg-[#2f2b2b] pt-24 pb-52 flex justify-center'>
    <ToastContainer/>
      <div className="loginsignup-container mx-5 md:w-[580px] h-[600px] bg-white m-auto px-10 py-14">
        <h1 className=' md:m-5 text-3xl font-semibold items-center'>{state}</h1>
        <div className="loginsignup-fields flex-col mt-8 space-y-5">
          {state==="Sign Up"?<input className='w-full h-16 pl-5 border-[1px] border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm' onChange={onChange} name='name' value={credentials.name} type="text" placeholder='Your Name'/> : <></>}
          <input className='w-full h-16 pl-5 border-[1px] border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm' name='email' onChange={onChange} value={credentials.email} type='email' placeholder='Email Address'/>

          <input className='w-full h-16 pl-5 border-[1px] border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm' name='password' onChange={onChange} value={credentials.password} type='password' placeholder='Password'/>
        </div>
        <button className='w-full h-16 text-white mt-7 bg-[#322a2a] border-none font-semibold ' onClick={()=>{state==="Login"?login() : signup()}}>Continue</button>
        {state==="Login"?
        <p className="loginsignup-login mt-5 text-[#5c5c5c] text-sm font-medium">Create an account?<span className='mx-2 cursor-pointer text-[#000000]' onClick={()=>{setstate("Sign Up")}}>Sign Up</span></p>
        :<><p className="loginsignup-login mt-5 text-[#5c5c5c] text-sm font-medium">Already have an account?<span className='mx-2 cursor-pointer text-[#000000]' onClick={()=>{setstate("Login")}}>Login</span></p>
        <div className="loginsignup-agree flex items-center mt-6 gap-5 text-[#5c5c5c] text-sm font-medium">
          <input type='checkbox' name='' id=''/>
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        </>
        }
      </div>
    </div>
  )
}

export default LoginSignUp