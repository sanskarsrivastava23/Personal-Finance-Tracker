import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth, db, provider } from '../../firebase';
import Button from '../Button';
import Input from "../Input";
import "./styles.css";
function SignupSigninComponent() {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [confirmPassword, setConfirmPassword]=useState("");
  const [loading, setLoading]=useState(false);
  const [loginForm, setLoginForm]=useState(false);
  const navigate=useNavigate();
  function signupWithEmail(){
    setLoading(true);
    console.log("Name", name);
    console.log("Email", email);
    console.log("Password", password);
    console.log("confirmPassword", confirmPassword); 

    if(name!=="" && email!=="" && password!=="" && confirmPassword!=="")
    {
      if(password===confirmPassword)
      {
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("User>>", user);
    toast.success("User created");
    setLoading(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    createDoc(user);
    navigate("/dashboard");
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
    // ..
  });
      }
      else
      {
        toast.error("Password and Confirm Password does not match");
        setLoading(false);
      }
      
    }
    else{
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log("email", email);
    console.log("password", password);
    setLoading(true);
    if(email!=="" && password!=="")
    {
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setLoading(false);
    toast.success("user logged in");
    console.log("User", user);
    navigate("/dashboard");
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
  });
    }
    else
    {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    if(!user)
      return;

    const userRef=doc(db, "users", user.uid);
    const userData=await getDoc(userRef);
    if(!userData.exists())
    {
      try{
      await setDoc(doc(db, "users", user.uid), {
      name:user.displayName?user.displayName:name,
      email:user.email,
      photoURL:user.photoURL?user.photoURL:"",
      createdAt:new Date(),
    });
    toast.success("Doc created");
    setLoading(false);
    }
    catch(e){
      toast.error(e.message);
      setLoading(false);
    }
    }
    else{
      //toast.error("Doc already exists");
      setLoading(false);
    }
  }

  function googleAuth()
  {
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
  .then((result) => {
    setLoading(false);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // The signed-in user info.
    const user = result.user;
    console.log("User>>>", user);
    createDoc(user);
    navigate("/dashboard");
    toast.success("user authenticated");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    setLoading(false);
    const errorMessage = error.message;
    toast.error(errorMessage);
    // ...
  });
    }
    catch(e){
      toast.error(e.message);
      setLoading(false);
    }
    
  }
  return (
    <>
    {loginForm ? <div className="signup-wrapper">
      <h2 className="title">Login on <span style={{ color: "var(--theme)"}}>Financely</span></h2>
      <form>
        <Input
        type="email"
        label={"Email"}
        state={email}
        setState={setEmail}
        placeholder={"johndoe@gmail.com"}
        />
        <Input
        type="password"
        label={"Password"}
        state={password}
        setState={setPassword}
        placeholder={"********"}
        />
        <Button
        disabled={loading}
         text={loading?"Loading...":"Login using email and Password"} 
         onClick={loginUsingEmail}/>
        <p style={{textAlign: "center", margin: 0}}>or</p>
        <Button 
        onClick={googleAuth}
        text={loading?"Loading...":"Login using Google"} blue={true}/>
        <p style={{textAlign: "center", margin: 0, cursor:"pointer"}}>
          Do not have an account? <span onClick={()=>setLoginForm(!loginForm)}>Click here!</span>
          </p>
      </form>
    </div> : 
    <div className="signup-wrapper">
      <h2 className="title">Sign Up on <span style={{ color: "var(--theme)"}}>Financely</span></h2>
      <form>
        <Input
        label={"Full Name"}
        state={name}
        setState={setName}
        placeholder={"John Doe"}
        />
        <Input
        type="email"
        label={"Email"}
        state={email}
        setState={setEmail}
        placeholder={"johndoe@gmail.com"}
        />
        <Input
        type="password"
        label={"Password"}
        state={password}
        setState={setPassword}
        placeholder={"********"}
        />
        <Input
        type="password"
        label={"Confirm Password"}
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder={"********"}
        />
        <Button
        disabled={loading}
         text={loading?"Loading...":"SignUp using email and Password"} 
         onClick={signupWithEmail}/>
        <p style={{textAlign: "center", margin: 0}}>or</p>
        <Button 
        onClick={googleAuth}
        text={loading?"Loading...":"SignUp using Google"} blue={true}/>
        <p style={{textAlign: "center", margin: 0, cursor:"pointer"}}>
          Already have an account have an account? <span onClick={()=>setLoginForm(!loginForm)}>Click here!</span>
          </p>
      </form>
    </div>}
    
    </>
  )
}

export default SignupSigninComponent
