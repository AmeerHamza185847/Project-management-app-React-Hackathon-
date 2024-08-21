import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';

export const Login_SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignIn, setIsSignIn] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    let handleEamilChange = (e) => {
        setEmail(e.target.value);
    }

    let handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let handleSignUP = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password");
        }
        
         // to clear the default value from login page
         setEmail("");
         setPassword("");
 
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("userCredential =>", userCredential.user);
            })
            .catch((error) => {
                const errorMsg = error.message;
                setError(errorMsg);
                console.log("error =>", error)
            });
    }

    let handleSignIn = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password");
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log("reponse =====>", userCredential.user);
                navigate("../Dashboard");


            }).catch((error) => {
                console.log("error ====>", error.message);
            });
    }

    let handleFormSwitch = () => {
        setIsSignIn(!isSignIn);
        setError("");
    }


    return (
        <div className='formContainer'>
            <form className='myForm'>
                <h2 className={isSignIn ? "signInHeader" : "signUpHeader"}>{isSignIn ? "LOGIN" : "SIGNUP"}</h2>
                <p>
                    <label htmlFor="u_email">Email :</label><br />
                    <input
                        type="email"
                        placeholder='Write email here....'
                        id='u_email'
                        value={email}
                        onChange={handleEamilChange} />
                </p>
                <p>
                    <label htmlFor="u_password">Password :</label><br />
                    <input
                        type="password"
                        placeholder='Write name here....'
                        id='u_password'
                        value={password}
                        onChange={handlePasswordChange} />
                </p>
                {error && <p className='error'>{error}</p>}
                <p>
                    {isSignIn ?
                        (<button className='signInBtn' onClick={handleSignIn}>SIGN IN</button>)
                        :
                        (<button className='signUpBtn' onClick={handleSignUP}>SIGN UP</button>)}
                </p>
                <p>
                    {isSignIn ? <span>Don't have an account? </span> : <span>Already have an account? </span>}
                    <span className={isSignIn ? "signInLink" : "signUpLink"} onClick={handleFormSwitch}>
                        {isSignIn ? "Sign Up" : "Sign In"}
                    </span>
                </p>
            </form>
        </div>
    )
}
