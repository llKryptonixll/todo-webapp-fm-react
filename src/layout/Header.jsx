import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Header = ({ switchTheme, theme, greetingMessage }) => {

    const navigate = useNavigate();

    function handleLogout() {
        signOut(auth).catch(err => {alert(err.message)});
        navigate("/login");
        location.reload();
    }

    return (
        <header className='flex justify-between md:w-[650px] w-[90%] gap-8 items-center relative self-end'>
            <h1 className='text-4xl font-bold tracking-[15px] text-Light_veryLightGray'>TODO</h1>
            <button aria-label='switch-theme-button' onClick={switchTheme}>
                <img src={theme === "dark" ? "images/icon-sun.svg" : "images/icon-moon.svg"} alt="switch-theme" />
            </button>
            <div className='absolute -bottom-8 text-Light_veryLightGrayishBlue text-lg flex justify-between w-full'>
                <p className=''>Welcome {greetingMessage}</p>
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </header>
    )
}

export default Header