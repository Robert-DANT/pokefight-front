import Axios from 'axios'
import { useEffect, useState } from 'react'
import chooseOwnImg from './img/chooseOwn.png'
import chooseOppImg from './img/chooseOpp.png'
import pokeball from './img/pokeball.png'
import { Label, Select } from '@rebass/forms'
import { Box, Card, Image, Heading, Text, Flex } from 'rebass'
import './home.css'

export default function Home() {
    const [data, setData] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState('')
    const [pokeData, setPokeData] = useState('')
    const [img, setImg] = useState()
    const [ownPokemon, setOwnPokemon] = useState()
    const [opponentPokemon, setOpponentPokemon] = useState()

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
        document.body.style.backgroundColor = 'lightblue';
    }

    const selectSecondPokemon = () => {
        setOpponentPokemon(pokeData.id)
        setImg()
        setPokeData('')
        setSelectedPokemon('')
    }




    return (
        <>
            
            {!ownPokemon ?
            <>
            <img src={chooseOwnImg} className='headingText '/>
            <Flex mx={-2} className='ownSelectBox'>
                <Box width={1 / 3} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <br />
                        {img && pokeData.name ? <img src={img} className='pokeImg flip-horizontally' a={pokeData.name.english} /> : <img src={pokeball} className='pokeImg' a='pokeball' />}
                    </Text>
                </Box>
                <Box width={1 / 3} px={2}>
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

                                {img && pokeData.name && <button className='selectButton' onClick={selectFirstPokemon}>Select {pokeData.name.english} as your Pokemon!</button>}
                            </>
                            : 'loading...'}
                    </Text>
                </Box>
                <Box width={1 / 3} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        {pokeData.name ? <>
                            <h3>{pokeData.name.english}</h3>
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
            </>:

                /* Here Starts the Opponent Select */
                <>
                <img src={chooseOppImg} className='headingText '/>
                <Flex mx={-2} className='oppSelectBox'>
                    <Box width={1 / 3} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        {pokeData.name ? <>
                                <h3>{pokeData.name.english}</h3>
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
                    <Box width={1 / 3} px={2}>
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

                                    {img && pokeData.name && <button className='selectButton' onClick={selectSecondPokemon}>Select {pokeData.name.english} as your opponents Pokemon!</button>}
                                </>
                                : 'loading...'}
                        </Text>
                    </Box>
                    <Box width={1 / 3} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <br />
                            {img && pokeData.name ? <img src={img} className='pokeImg' a={pokeData.name.english} /> : <img src={pokeball} className='pokeImg' a='pokeball' />}
                        </Text>
                    </Box>
                </Flex>
                </>}
        </>
    )
}