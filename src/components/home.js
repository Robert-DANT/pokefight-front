import Axios from 'axios'
import { useEffect, useState } from 'react'
import chooseImg from './img/choose.png'
import { Label, Select } from '@rebass/forms'
import { Box, Card, Image, Heading, Text, Flex } from 'rebass'
import './home.css'

export default function Home() {
    const [data, setData] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState('')
    const [pokeData, setPokeData] = useState('')
    const [img, setImg] = useState()
    const [ownPokemon, setOwnPokemon] = useState()

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




    return (
        <>
            <img src={chooseImg} width={500} />
            <Flex mx={-2}>
                <Box width={1 / 3} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        Image of your Pokemon:
                        <br />
                        {img && pokeData.name ? <img src={img} className='pokeImg' a={pokeData.name.english} /> : <><p>Please select a Pokemon first :)</p></>}
                    </Text>
                </Box>
                <Box width={1 / 3} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        Please Select your own Pokemon
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

                                {img && pokeData.name && <button onClick={selectFirstPokemon}>Select {pokeData.name.english} as your Pokemon!</button>}
                            </>
                            : 'loading...'}
                    </Text>
                </Box>
                <Box width={1 / 3} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        Stats:
                        {pokeData.name ? <>
                            <h3>{pokeData.name.english}</h3>
                            <h4>Type: {pokeData.type[0]}{pokeData.type[1] && `, ${pokeData.type[1]}`}</h4>
                            <h5>Stats: <ul>
                                <li>HP: {pokeData.base.HP}</li>
                                <li>Attack: {pokeData.base.Attack}</li>
                                <li>Defense: {pokeData.base.Defense}</li>
                                <li>SP. Attack: {pokeData.base['Sp. Attack']}</li>
                                <li>SP. Defense: {pokeData.base['Sp. Defense']}</li>
                                <li>Speed: {pokeData.base.Speed}</li>
                            </ul></h5>
                        </> : <><p>Please select a Pokemon first :)</p></>}
                    </Text>
                </Box>
            </Flex>
        </>
    )
}