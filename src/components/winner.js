import video from './img/sparkle.mp4'
import './winner.css'
import { useEffect, useState } from 'react'
import Axios from 'axios'
/* import './font.css' */

export default function Winner ({name, winner, startFromBeginning, winnerScore}) {
  const [img, setImg] = useState()
  const [leaderboard, setLeaderboard] = useState()
  const [userName, setUserName] = useState('')
  const queryString = require('query-string');
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchImg()
    fetchLeadb()
    console.log(winner[1])
}, []);


const fetchImg = async () => {
  await Axios.get(`https://pokeapi.co/api/v2/pokemon/${winner[1]}`)
      .then((response) => setImg(response.data.sprites.front_default))
      .catch((error) => console.log(error));
};

const fetchLeadb = async () => {
  await Axios.get(`https://pokefight-leaderboard.herokuapp.com/leaderboard`)
      .then((response) => setLeaderboard(response.data))
      .catch((error) => console.log(error));
};

const addScore = async () => {
  let scoreData = queryString.stringify({name: userName, score: winnerScore})
  await Axios.post(`https://pokefight-leaderboard.herokuapp.com/leaderboard`, scoreData)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error.data));
  fetchLeadb()
};

const saveScore = () => {
  console.log('saving ...')
  addScore()
  setSaved(true)
}

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
          <div className='leaderboard pokefont'>
            Leaderboard: <br/>
            {leaderboard ? <>
            1. {leaderboard[0].name} {leaderboard[0].score} <br/>
            2. {leaderboard[1].name} {leaderboard[1].score} <br/>
            3. {leaderboard[2].name} {leaderboard[2].score} <br/>
            4. {leaderboard[3].name} {leaderboard[3].score} <br/>
            5. {leaderboard[4].name} {leaderboard[4].score} <br/>
            </> : 'Loading Scores ...'}
          </div>
          <div>
         <img src={img} width="400px" height="400px"  />
          </div>
          <div className='saveScore pokefont'>
            Your Score is {winnerScore}! <br/>
            <input className='inputName pokefont' onChange={((e) => setUserName(e.target.value))} placeholder='Name' maxlength = "3"/>
            <br/>
            <button onClick={saveScore} className='pokefont startAgainButton saveButton' disabled={saved}>{!saved ? 'Save Score' : 'Saved!'}</button>
          </div>
          <div>
          <button className="pokefontStart startAgainButton" onClick={startFromBeginning}>Start Over</button>
          </div>
        </div>
      </div>
    </section>
    )
}