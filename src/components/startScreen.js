import ball from './img/ball.png'
import video from './img/video.mp4'
import './startScreen.css'

export default function StartScreen ({setStartScreen}) {
    return(
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
          <div className='startFont'>
          <img src="https://fontmeme.com/permalink/210526/d6e962a9abeca391ff743d18f8288629.png" alt="pokemon-font" border={0} />
          </div>
          <div className="start">
            <div>
              <img className="ball" src={ball} />
            </div>
            <div>
              <h1>Click to start</h1>
            </div>
            <div>
              <img className="ball" src={ball} />
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}