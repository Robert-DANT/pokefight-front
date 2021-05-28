import Axios from 'axios'
import { useEffect, useState } from 'react'
import './font.css'
import Modal from 'react-modal';
import StartScreen from './startScreen'
import OwnSelectionScreen from './ownSelectionScreen'
import OpponentSelectionScreen from './opponentSelectionScreen'
import GetReadyScreen from './getReadyScreen'
import WinnerIsScreen from './winnerIsScreen'
import Winner from './winner'

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
    const [readyScreen, setReadyScreen] = useState(true)
    const [winnerIsScreen, setWinnerIsScreen] = useState(true)
    const [winner, setWinner] = useState(false)
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
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${winner[1]}`)
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
        if (ownPokemonPower >= opponentPokemonPower) setWinner(['You', ownPokemon] || 'You')
        else setWinner(['Opponent', opponentPokemon] || 'Your Opponent')
    }
    useEffect(() => {
        if (winner[1]) fetchWinnerData()
    }, [winner]);

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
        setReadyScreen(true)
        setWinnerIsScreen(true)
    }


    return (
        <>
            <Modal
                closeTimeoutMS={200}
                isOpen={startScreen}
                onRequestClose={(() => setStartScreen(false))}
                style={customStyles}
                contentLabel="Start Screen Modal"
            >
                <StartScreen setStartScreen={setStartScreen} />
            </Modal>
            {!ownPokemon ? <OwnSelectionScreen pokeData={pokeData} img={img} data={data} selectFirstPokemon={selectFirstPokemon} setSelectedPokemon={setSelectedPokemon} />
                : !opponentPokemon ?
                    <OpponentSelectionScreen pokeData={pokeData} img={img} data={data} selectSecondPokemon={selectSecondPokemon} setSelectedPokemon={setSelectedPokemon} />
                    : winnerData && readyScreen ?
                        <>
                            <Modal
                                closeTimeoutMS={200}
                                isOpen={readyScreen}
                                onRequestClose={(() => setReadyScreen(false))}
                                style={customStyles}
                                contentLabel="Ready Screen Modal"
                            >
                                <GetReadyScreen setReadyScreen={setReadyScreen} ownPokemon={ownPokemon} opponentPokemon={opponentPokemon} />
                            </Modal>
                        </> : !readyScreen && winnerIsScreen ?
                            <Modal
                                closeTimeoutMS={200}
                                isOpen={winnerIsScreen}
                                onRequestClose={(() => setWinnerIsScreen(false))}
                                style={customStyles}
                                contentLabel="Winner is... Screen Modal"
                            >
                                <WinnerIsScreen setWinnerIsScreen={setWinnerIsScreen} />
                            </Modal> : !readyScreen && !winnerIsScreen ?
                                <>
                                    {/*           <h1>The winner is: {winner[0]} with {winnerData.name.english}</h1>
                                    <button onClick={startFromBeginning} >Start Again :)</button> */}
                                    <Winner winner={winner} name={winnerData.name.english} startFromBeginning={startFromBeginning} opponentPokemonPower={opponentPokemonPower} ownPokemonPower={ownPokemonPower}/>
                                </>
                                : 'loading...'
            }
        </>
    )
}