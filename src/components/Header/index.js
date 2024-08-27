import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import "./styles.css";
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate=useNavigate();
  useEffect(()=> {
    if(user){
      navigate("/dashboard");
    }
  }, [user, loading])

  function logoutFnc() {
    try{
        signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged out Successfully!");
        navigate("/");
      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
    }
    catch(e){
      toast.error(e.message);
    }
    
  }
  return (
    <div className="navbar">
      <p className='logo'>Financely</p>
      {user && (
        <div style={{display: "flex", alignContent: "center", gap: "0.25rem"
        }}>
          <img src={user.photoURL ? user.photoURL : user} style={{height:"1.5rem", width:"1.5rem", padding:"1rem", borderRadius:"50%"}}/>
        <p className='logo link' onClick={logoutFnc}>
        Logout
      </p>
      </div>)}
      
    </div>
  )
}

export default Header;
