import ball from './img/ball.png'
import video from './img/video.mp4'
import StartScreenTitle from './img/startscreentitle.png'
import './startScreen.css'
import Fiber from './fiber'

export default function StartScreen({ setStartScreen }) {
  return (
    <section className="videoBg" onClick={(() => setStartScreen(false))}>
      {/* Video */}
      <div className="videoPlace">
        <video src={video} autoPlay muted loop className="VideoSection" />
      </div>
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