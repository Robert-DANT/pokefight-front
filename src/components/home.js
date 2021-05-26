import Axios from 'axios'
import { useEffect, useState } from 'react'
import chooseOwnImg from './img/chooseOwn.png'
import chooseOppImg from './img/chooseOpp.png'
import ball from './img/ball.png'
import pokeball from './img/pokeball.png'
import video from './img/video.mp4'
import { Label, Select } from '@rebass/forms'
import { Box, Card, Image, Heading, Text, Flex } from 'rebass'
import './home.css'
import './startScreen.css'
import Modal from 'react-modal';

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
    const [opponentPokemon, setOpponentPokemon] = useState()
    const [startScreen, setStartScreen] = useState(true)

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

    const fetchImg = async () => {
        await Axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
            .then((response) => setImg(response.data.sprites.front_default))
            .catch((error) => console.log(error));
    };

    const selectFirstPokemon = () => {
        setOwnPokemon(pokeData.id)
        setImg()
        setPokeData('')
        setSelectedPokemon('')
    }

    const selectSecondPokemon = () => {
        setOpponentPokemon(pokeData.id)
        setImg()
        setPokeData('')
        setSelectedPokemon('')
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
            {/* Outer Wrapper */}
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
            <img src="https://fontmeme.com/permalink/210526/d6e962a9abeca391ff743d18f8288629.png" alt="pokemon-font" border={0} />
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
        </Modal>
            {!ownPokemon ?
            <div className='selectionScreen'>
            <img src={chooseOwnImg} className='headingText '/>
            <Flex mx={-2} className='ownSelectBox'>
                <Box width={[1/2, 4 / 11]} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <br />
                        {img && pokeData.name ? <><h3>{pokeData.name.english}</h3> <img src={img} className='pokeImg flip-horizontally' a={pokeData.name.english} /> </>
                        : <img src={pokeball} className='pokeImg' a='pokeball' />}
                    </Text>
                </Box>
                <Box width={[1/2, 3 / 11]} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <h2 className='selectHeading'>Please Select your own Pokemon</h2>
                        {data ?
                            <>
                                <Box>
                                    <Label htmlFor='pokemon'>Choose your fighter!</Label>
                                    <Select
                                        id='pokemon'
                                        name='pokemon'
                                        defaultValue={null}
                                        onChange={((e) => setSelectedPokemon(e.target.selectedIndex + 1))}>
                                        {Object.entries(data).map(([key, e]) => (
                                            <option
                                                key={key}>
                                                {e.name.english}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <button className='selectButton' onClick={(() => setSelectedPokemon(Math.ceil(Math.random() * 808)))}>Random Pokemon</button> <br/>
                                {img && pokeData.name && <button className='selectButton' onClick={selectFirstPokemon}>Select {pokeData.name.english} as your Pokemon!</button>}
                            </>
                            : 'loading...'}
                    </Text>
                </Box>
                <Box width={[1/1, 4 / 11]} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        {pokeData.name ? <>
                            <h3>Stats of {pokeData.name.english}:</h3>
                            <h4>Type: {pokeData.type[0]}{pokeData.type[1] && `, ${pokeData.type[1]}`}</h4>
                            <ul>
                                <li>HP: {pokeData.base.HP}</li>
                                <li>Attack: {pokeData.base.Attack}</li>
                                <li>Defense: {pokeData.base.Defense}</li>
                                <li>SP. Attack: {pokeData.base['Sp. Attack']}</li>
                                <li>SP. Defense: {pokeData.base['Sp. Defense']}</li>
                                <li>Speed: {pokeData.base.Speed}</li>
                            </ul>
                        </> : <><p>Select a Pokemon to show its Stats :)</p></>}
                    </Text>
                </Box>
            </Flex>
            </div>:

                /* Here Starts the Opponent Select */
                <div className='selectionScreen' style={{background: 'linear-gradient(90deg, rgba(101,4,186,1) 0%, rgba(237,123,129,1) 100%)'}}>
                <img src={chooseOppImg} className='headingText '/>
                <Flex mx={-2} className='oppSelectBox'>
                    <Box width={4 / 11} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        {pokeData.name ? <>
                            <h3>Stats of {pokeData.name.english}:</h3>
                                <h4>Type: {pokeData.type[0]}{pokeData.type[1] && `, ${pokeData.type[1]}`}</h4>
                                <ul>
                                    <li>HP: {pokeData.base.HP}</li>
                                    <li>Attack: {pokeData.base.Attack}</li>
                                    <li>Defense: {pokeData.base.Defense}</li>
                                    <li>SP. Attack: {pokeData.base['Sp. Attack']}</li>
                                    <li>SP. Defense: {pokeData.base['Sp. Defense']}</li>
                                    <li>Speed: {pokeData.base.Speed}</li>
                                </ul>
                            </> : <><p>Select a Pokemon to show its Stats :)</p></>}
                        </Text>
                    </Box>
                    <Box width={3 / 11} px={2}>
                        <Text p={1} color='background' bg='primary'>
                        <h2 className='selectHeading'>Please Select your opponents Pokemon</h2>
                        {data ?
                                <>
                                    <Box>
                                        <Label htmlFor='pokemon'>Choose who you fight against!</Label>
                                        <Select
                                            id='pokemon'
                                            name='pokemon'
                                            defaultValue={null}
                                            onChange={((e) => setSelectedPokemon(e.target.selectedIndex + 1))}>
                                            {Object.entries(data).map(([key, e]) => (
                                                <option
                                                    key={key}>
                                                    {e.name.english}
                                                </option>
                                            ))}
                                        </Select>
                                    </Box>
                                    <button className='selectButton' onClick={(() => setSelectedPokemon(Math.ceil(Math.random() * 808)))}>Random Pokemon</button> <br/>
                                    {img && pokeData.name && <button className='selectButton' onClick={selectSecondPokemon}>Select {pokeData.name.english} as your opponents Pokemon!</button>}
                                </>
                                : 'loading...'}
                        </Text>
                    </Box>
                    <Box width={4 / 11} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <br />
                            {img && pokeData.name ? <><h3>{pokeData.name.english}</h3> <img src={img} className='pokeImg' a={pokeData.name.english} /> </>
                            : <img src={pokeball} className='pokeImg' a='pokeball' />}
                        </Text>
                    </Box>
                </Flex>
                </div>}
        </>
    )
}