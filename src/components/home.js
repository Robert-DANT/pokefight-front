import Axios from 'axios'
import { useEffect, useState } from 'react'
import './font.css'
import Modal from 'react-modal';
import StartScreen from './startScreen'
import OwnSelectionScreen from './ownSelectionScreen'
import OpponentSelectionScreen from './opponentSelectionScreen'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function Home() {
    const [data, setData] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState('')
    const [pokeData, setPokeData] = useState('')
    const [img, setImg] = useState()
    const [ownPokemon, setOwnPokemon] = useState()
    const [ownPokemonPower, setOwnPokemonPower] = useState()
    const [opponentPokemon, setOpponentPokemon] = useState()
    const [opponentPokemonPower, setOpponentPokemonPower] = useState()
    const [startScreen, setStartScreen] = useState(true)
    const [winner, setWinner] = useState()
    const [winnerData, setWinnerData] = useState()

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchPokeData();
        fetchImg()
    }, [selectedPokemon]);


    const fetchData = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/`)
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    };

    const fetchPokeData = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${selectedPokemon}`)
            .then((response) => setPokeData(response.data))
            .catch((error) => console.log(error));
    };

    const fetchWinnerData = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${winner}`)
            .then((response) => setWinnerData(response.data))
            .catch((error) => console.log(error));
    };

    const fetchImg = async () => {
        await Axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
            .then((response) => setImg(response.data.sprites.front_default))
            .catch((error) => console.log(error));
    };

    const selectFirstPokemon = () => {
        setOwnPokemon(pokeData.id)
        setOwnPokemonPower(Number(pokeData.base.HP) + Number(pokeData.base.Attack) + Number(pokeData.base.Defense) + Number(pokeData.base['Sp. Attack']) + Number(pokeData.base['Sp. Defense']) + Number(pokeData.base.Speed))
        setImg()
        setPokeData('')
        setSelectedPokemon('')
    }

    const selectSecondPokemon = () => {
        setOpponentPokemon(pokeData.id)
        setOpponentPokemonPower(Number(pokeData.base.HP) + Number(pokeData.base.Attack) + Number(pokeData.base.Defense) + Number(pokeData.base['Sp. Attack']) + Number(pokeData.base['Sp. Defense']) + Number(pokeData.base.Speed))
        setImg()
        setPokeData('')
        /* setSelectedPokemon('') */
    }
    useEffect(() => {
        console.log(`Own Power: ${ownPokemonPower}`)
        console.log(`Opponent Power: ${opponentPokemonPower}`)
        calcWinner()
    }, [opponentPokemonPower, opponentPokemon]);

    const calcWinner = () => {
        if (ownPokemonPower >= opponentPokemonPower) setWinner(ownPokemon || 'You')
        else setWinner(opponentPokemon || 'Your Opponent')
    }

    const startFromBeginning = () => {
        setImg()
        setPokeData('')
        setSelectedPokemon('')
        setOwnPokemon()
        setOpponentPokemon()
        setOwnPokemonPower()
        setOpponentPokemonPower()
        setWinnerData()
        setStartScreen(true)
    }


    return (
        <>
        <Modal
         closeTimeoutMS={200}
          isOpen={startScreen}
          /* onAfterOpen={} */
          onRequestClose={(() => setStartScreen(false))}
          style={customStyles}
          contentLabel="Start Screen Modal"
        >
            <StartScreen setStartScreen={setStartScreen}/>
        </Modal>
            {!ownPokemon ? <OwnSelectionScreen pokeData={pokeData} img={img} data={data} selectFirstPokemon={selectFirstPokemon} setSelectedPokemon={setSelectedPokemon}/>
            : !opponentPokemon ?
                <OpponentSelectionScreen pokeData={pokeData} img={img} data={data} selectSecondPokemon={selectSecondPokemon} setSelectedPokemon={setSelectedPokemon} /> :
                /* Here comes the winner screen */
                <>
                <h1>The winner is: {winner}</h1>
                <button onClick={startFromBeginning} >Start Again :)</button>
                </>
                }
        </>
    )
}