import Axios from 'axios'
import { useEffect, useState } from 'react'
import Starburst from './img/starburst.png'
import ReadyScreenTitle from './img/readyscreentitle.png'
import './getReady.css';
import './font.css'
import { Box, Image, Heading, Flex } from 'rebass'
import video from './img/versus_screen.mp4'

export default function GetReady({ setReadyScreen, ownPokemon, opponentPokemon }) {
    const [pokeData1, setPokeData1] = useState()
    const [pokeData2, setPokeData2] = useState()
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()

    useEffect(() => {
        fetchPokeData1();
        fetchPokeData2();
        fetchImg1()
        fetchImg2()
    }, []);

    const fetchPokeData1 = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${ownPokemon}`)
            .then((response) => setPokeData1(response.data))
            .catch((error) => console.log(error));
    };

    const fetchPokeData2 = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${opponentPokemon}`)
            .then((response) => setPokeData2(response.data))
            .catch((error) => console.log(error));
    };

    const fetchImg1 = async () => {
        await Axios.get(`https://pokeapi.co/api/v2/pokemon/${ownPokemon}`)
            .then((response) => setImg1(response.data.sprites.front_default))
            .catch((error) => console.log(error));
    };

    const fetchImg2 = async () => {
        await Axios.get(`https://pokeapi.co/api/v2/pokemon/${opponentPokemon}`)
            .then((response) => setImg2(response.data.sprites.front_default))
            .catch((error) => console.log(error));
    };




    return (
        <section className='readyScreen' onClick={(() => setReadyScreen(false))}>

                <video src={video} autoPlay muted loop className="VideoSection" />

            <div className='readyScreenTitle'><Image src={ReadyScreenTitle} /></div>
            <br></br>
            <br></br>
            <Flex flexWrap='wrap' mx={-2}>
                <Box width={1 / 3} px={2}>
                    <div className='myimage1'>
                        <Image src={img1}
                            sx={{ width: ['100%', '50%'], borderRadius: 8, }} />
                    </div>
                    <Heading as='h3'>
                        <p className='pokefont pokeName'>{pokeData1 && pokeData1.name.english}</p>
                    </Heading>
                </Box>
                <Box width={1 / 3} px={2}>
                    <div className='myimage2'>
                        <Image src={Starburst} sx={{ width: ['100%', '50%'], borderRadius: 8, }} />
                    </div>
                    <Heading as='h3' className='versus'>
                        <p className='pokefont'>{'VS'}</p>
                    </Heading>
                </Box>
                <Box width={1 / 3} px={2}>
                    <div className='myimage3'>
                        <Image src={img2}
                            sx={{ width: ['100%', '50%'], borderRadius: 8, }} />
                    </div>
                    <Heading as='h3'>
                        <p className='pokefont pokeName'>{pokeData2 && pokeData2.name.english}</p>
                    </Heading>
                </Box>
            </Flex>
        </section>
    )
}