import video from './img/video.mp4'
import StartScreenTitle from './img/startscreentitle.png'
import Modal from 'react-modal';
import './startScreen.css'
import Fiber from './fiber'
import { useState } from 'react';
import Axios from 'axios'
import jwt_decode from 'jwt-decode'


const queryString = require('query-string');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


export default function StartScreen({ setStartScreen, token, setToken }) {
  const [loginScreen, setLoginScreen] = useState(false)
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [pw, setPw] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  

  const handleLogin = (e) => {
    e.preventDefault()
    const form = document.getElementById("loginForm");
    form.reset();
    const user = queryString.stringify({
      email: email,
      password: pw
    })
    loginFunction(user).then(res => {
      if (res) {
        setStartScreen(false)
      }
      else {
        alert('Either wrong Email or wrong Password :(')
      }
    })
  }

  const loginFunction = user => {
    return Axios
      .post('https://pokefight-users.herokuapp.com/users/login', user)
      .then(response => {
        setToken(response.data)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const form = document.getElementById("registerForm");
    form.reset();
    const user = queryString.stringify({
      name: name,
      email: email,
      password: pw
    })
    registerFunction(user).then(err => {
      if (err) {
        alert(err)
      }
      else {
        alert('User Created! Please Login now :)')
        setLogin(true)
        setRegister(false)
      }
    })
  }

  const registerFunction = newUser => {
    return Axios
      .post('https://pokefight-users.herokuapp.com/users/register', newUser)
      .then(res => {
        console.log(res)
        console.log('Registered')
      })
      .catch(err => {
        return (err.response.data)
      })
  }

  const handleStartClick = () => {
    if (token) {
      const decoded = jwt_decode(token)
      if (Date.now() >= decoded.exp*1000) {
        alert('Session expired, please login again')
        setLoginScreen(true)
      }
      else if(decoded.user.name) {
        alert(`Welcome back ${decoded.user.name}!`)
        setStartScreen(false)
      }
      else setLoginScreen(true)
    }
    else setLoginScreen(true)
    
  }


  return (
    <section className="videoBg" onClick={handleStartClick}>
      {/* Video */}
      <div className="videoPlace">
        <video src={video} autoPlay muted loop className="VideoSection" />
      </div>
      <Modal
        closeTimeoutMS={200}
        isOpen={loginScreen}
        onRequestClose={(() => setLoginScreen(false))}
        style={customStyles}
        contentLabel="Start Screen Modal"
      >
        <div className='loginScreen'>
          <h2>Please Login or Register</h2>
          <button onClick={(() => {
            setLogin(!login)
            setRegister(false)
          })}>Login</button>
          <button onClick={(() => {
            setRegister(!register)
            setLogin(false)
          })}>Register</button>
          {login ?
            <><h3>Login:</h3>
              <form onSubmit={handleLogin} id='loginForm'>
                <label for="email">Email:</label><br />
                <input onChange={((e) => setEmail(e.target.value))} type="email" id="email" name="email" required /><br />
                <label for="password">Password:</label><br />
                <input onChange={((e) => setPw(e.target.value))} type="password" id="password" name="password" required /><br /><br />
                <input type="submit" value="Login" />
              </form>
            </>
            : register ?
              <><h3>Register:</h3>
                <form onSubmit={handleRegister} id='registerForm'>
                  <label for="name">Name:</label><br />
                  <input onChange={((e) => setName(e.target.value))} type="text" id="name" name="name" required /><br />
                  <label for="email">Email:</label><br />
                  <input onChange={((e) => setEmail(e.target.value))} type="email" id="email" name="email" required /><br />
                  <label for="password">Password:</label><br />
                  <input onChange={((e) => setPw(e.target.value))} type="password" id="password" name="password" required /><br /><br />
                  <input type="submit" value="Register" />
                </form>
              </>
              : ''}
        </div>
      </Modal>
      {/* Overlay */}
      <div className="VideoOverlay" />
      {/* Content */}
      <div className="VideoContent">
        <div className="Container">
          <div className='logo'>
            <img src={StartScreenTitle} alt="pokemon-font" className='startFont' border={0} />
          </div>
          <div className="start">
            <div className='fiberStart'><Fiber /></div>
            <div>
              {/* <img className="ball" src={ball} /> */}
            </div>
            <div>
              <h1>Click to start</h1>
            </div>
            <div>
              {/* <img className="ball" src={ball} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}