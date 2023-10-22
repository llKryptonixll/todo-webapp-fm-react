import './App.css'
import { Routes, Route } from 'react-router-dom';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import Header from './layout/Header';
import { auth } from './firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainTodo from './components/main/MainTodo';

function App() {
  // tailwind styles
  const cardStyle = "dark:bg-veryDarkDesaturatedBlue bg-Light_veryLightGray sm:w-[650px] w-[90%] sm:p-6 p-4 mb-12 grid gap-8 items-center rounded-md shadow-md relative self-start";
  const formHeaderStyle = "dark:text-Light_veryLightGray text-veryDarkDesaturatedBlue text-xl";
  const inputStyle = "rounded-sm pl-2 dark:bg-white bg-Light_veryLightGrayishBlue text-veryDarkBlue placeholder:text-veryDarkBlue h-[35px]";

  //logic
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  function switchTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  const [greetingMessage, setGreetingMessage] = useState("Stranger");
  function greetUser(message) {
    setGreetingMessage(message)
  }

  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/todo-app")
        setTimeout(() => {
          setGreetingMessage(user.displayName)
        }, 500)
      }
      else {
        navigate("/login")
      }
    })
  }, [])

  return (
    <>
      <div className='font-josefinSans w-full h-screen grid grid-rows-[35%,65%] min-h-[650px] fixed'>
        <img className='w-full h-full md:block hidden' src={theme === "dark" ? "images/bg-desktop-dark.jpg" : "images/bg-desktop-light.jpg"} alt="background-image" />
        <img className='w-full h-full md:hidden block' src={theme === "dark" ? "images/bg-mobile-dark.jpg" : "images/bg-mobile-light.jpg"} alt="background-image" />
        <div className='dark:bg-veryDarkBlue bg-Light_veryLightGray h-full'></div>
      </div>

      <main className='font-josefinSans grid place-items-center gap-20 w-full h-screen min-h-min sm:pt-0 pt-12'>
        <Header
          switchTheme={switchTheme}
          theme={theme}
          greetingMessage={greetingMessage}
        />
        <Routes>
          <Route
            index
            element={
              <Register
                cardStyle={cardStyle}
                formHeaderStyle={formHeaderStyle}
                inputStyle={inputStyle}
              />}
          />
          <Route
            path='login'
            element={
              <Login
                cardStyle={cardStyle}
                formHeaderStyle={formHeaderStyle}
                inputStyle={inputStyle}
                greetUser={greetUser}
              />}
          />
          <Route
            path='todo-app'
            element={<MainTodo />}
          />
        </Routes>
      </main>
    </>
  )
}

export default App
