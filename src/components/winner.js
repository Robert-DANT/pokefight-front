import video from './img/sparkle.mp4'
import './winner.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'
/* import './font.css' */

export default function Winner ({name, winner, startFromBeginning}) {
  const [img, setImg] = useState()

  useEffect(() => {
    fetchImg()
    console.log(winner[1])
}, []);

const fetchImg = async () => {
  await Axios.get(`https://pokeapi.co/api/v2/pokemon/${winner[1]}`)
      .then((response) => setImg(response.data.sprites.front_default))
      .catch((error) => console.log(error));
};

    return(
      <section className="videoBg">
      <div className="videoPlace">
        <video src={video} autoPlay muted loop className="VideoSection" />
      </div>
      <div className="VideoContent">
        <div className="Container">
          <div>
            {winner[0] == 'You' ? <p className="pokefontWinner">Your {name} Wins!</p> :
            <p className="pokefontWinner"> Your Opponent's {name} Wins!</p>}
          </div>
          <div>
         <img src={img} width="500px" height="500px"  />
          </div>
          <div>
          <button className="pokefontStart startAgainButton" onClick={startFromBeginning} >Start Over</button>
          </div>
        </div>
      </div>
    </section>
    )
}