import React, { useEffect, useState } from 'react'
import styles from "../styles/LoginPage.module.scss"
import { useRouter } from 'next/navigation';
import withAuth from '../HOC/auth/withAuth';
import { signIn } from "next-auth/react";

const LoginPage = (props) => {
    const [isActive, setIsActive] = useState(false);
    const { session } = props
    const toggleActive = () => {
        setIsActive(!isActive);
    };
    if (session) return null;
    return (
        <div className='h-screen w-full flex justify-center items-center pr-8 pl-8'>
            <div className={`${styles.container} ${isActive ? styles.active : ''}`} id="container">
                <div className={`${styles.formContainer} ${styles.signUp}`}>
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className={styles.socialIcons}>
                            <a href="#" className={styles.icon} onClick={() => signIn('google')}>
                                <svg viewBox="0 0 48 48">
                                    <title>Google Logo</title>
                                    <clipPath id="g">
                                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                                    </clipPath>
                                    <g className="colors" clipPath="url(#g)">
                                        <path fill="#FBBC05" d="M0 37V11l17 13z" />
                                        <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                                        <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                                        <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                                    </g>
                                </svg>                            </a>
                            {/* <a href="#" className={styles.icon}><i className="fa-brands fa-facebook-f"></i></a>
           <a href="#" className={styles.icon}><i className="fa-brands fa-youtube"></i></a>
           <a href="#" className={styles.icon}><i className="fa-brands fa-x-twitter"></i></a> */}
                        </div>
                        <span>or use your email for register</span>
                        <input type="text" placeholder="Full Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>

                <div className={`${styles.formContainer} ${styles.signIn}`}>
                    <form action="#">
                        <h1>Sign In</h1>
                        <div className={styles.socialIcons}>
                            <a href="#" className={styles.icon} onClick={() => signIn('google')}>
                                <svg viewBox="0 0 48 48">
                                    <title>Google Logo</title>
                                    <clipPath id="g">
                                        <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                                    </clipPath>
                                    <g className="colors" clipPath="url(#g)">
                                        <path fill="#FBBC05" d="M0 37V11l17 13z" />
                                        <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                                        <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                                        <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                                    </g>
                                </svg>
                            </a>

                        </div>
                        <span>or use your email and password</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>

                <div className={styles.toggleContainer}>
                    <div className={styles.toggle}>
                        <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of the site features.</p>
                            <button className={styles.hidden} onClick={toggleActive}>Sign In</button>
                        </div>

                        <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                            <h1>Hello, Subscriber!</h1>
                            <p>Register with your personal details to use all of the site features.</p>
                            <button className={styles.hidden} onClick={toggleActive}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default withAuth(LoginPage, { redirectIfAuthenticated: true });
