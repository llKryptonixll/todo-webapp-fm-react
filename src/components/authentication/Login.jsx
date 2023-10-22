import { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = ({ cardStyle, formHeaderStyle, inputStyle, greetUser }) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const displayName = userCredential.user.displayName;
            greetUser(displayName);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode}: ${errorMessage}`);
        }
    }

    return (
        <section className={cardStyle}>
            <div className='grid gap-2'>
                <p className={formHeaderStyle}>Sign In!</p>
                <form className='grid gap-4' action="">
                    <div className='grid'>
                        <label className='text-Light_veryLightGray' htmlFor="email">Email</label>
                        <input id='email' onChange={handleEmailChange} placeholder='e.g. example@mail.com' className={inputStyle} type="email" />
                    </div>
                    <div className='grid'>
                        <label className='text-Light_veryLightGray' htmlFor="password">Password</label>
                        <input id='password' onChange={handlePasswordChange} placeholder='e.g. ksafkk45ä#+F' className={inputStyle} type="password" />
                    </div>
                    <button onClick={handleLogin} className='mt-8 bg-lightGrayishBlue w-[120px] h-[35px] font-bold rounded-sm'>Sign In</button>
                </form>

                <div className='mt-8 justify-self-center text-center grid justify-items-center gap-2'>
                    <p className='dark:text-Light_veryLightGray text-veryDarkDesaturatedBlue'>You have no account?</p>
                    <Link className='bg-lightGrayishBlue w-[120px] h-[35px] font-bold rounded-sm inline-grid place-items-center' to={"/"}>Sign Up</Link>
                </div>
            </div>
        </section>
    )
}

export default Login