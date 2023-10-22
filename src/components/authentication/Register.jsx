import { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Register = ({ cardStyle, formHeaderStyle, inputStyle }) => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ name, setName ] = useState("");

    const navigate = useNavigate();

    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleNameChange(e){
        setName(e.target.value);
    }

    function handleRegister(e) {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
            return updateProfile(user, {
                displayName: name
            }).then(() => {
                navigate("/todo-app");
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
        });
        
    }

    return (
        <section className={cardStyle}>
            <div className='grid gap-2'>
                <p className={formHeaderStyle}>Sign Up!</p>
                <form className='grid gap-4' action="">
                    <div className='grid'>
                        <label className='text-Light_veryLightGray' htmlFor="email">Email</label>
                        <input id='email' onChange={handleEmailChange} value={email} placeholder='e.g. example@mail.com' className={inputStyle} type="email" />
                    </div>
                    <div className='grid'>
                        <label className='text-Light_veryLightGray' htmlFor="password">Password</label>
                        <input id='passoword' onChange={handlePasswordChange} value={password} placeholder='e.g. ksafkk45ä#+F' className={inputStyle} type='password'/>
                    </div>
                    <div className='grid'>
                        <label className='text-Light_veryLightGray' htmlFor="name">Name</label>
                        <input id='name' onChange={handleNameChange} value={name} placeholder='e.g. Lucas Cerri' className={inputStyle} type="text" />
                    </div>
                    <button onClick={handleRegister} className='mt-8 bg-lightGrayishBlue w-[120px] h-[35px] font-bold rounded-sm'>Sign Up</button>
                </form>

                <div className='mt-8 justify-self-center text-center grid justify-items-center gap-2'>
                    <p className='dark:text-Light_veryLightGray text-veryDarkDesaturatedBlue'>Do you have an account?</p>
                    <Link className='bg-lightGrayishBlue w-[120px] h-[35px] font-bold rounded-sm inline-grid place-items-center' to={"/login"}>Sign In</Link>
                </div>
            </div>
        </section>
    )
}

export default Register