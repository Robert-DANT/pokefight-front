import Axios from 'axios'
import { useEffect, useState } from 'react'
import './BattleScreen.css';
import { Box, Card, Image, Heading, Button, Flex } from 'rebass'
import './font.css'

export default function BattleScreen({ setBattleScreen, ownPokemon, opponentPokemon, calcWinner, setWinnerScore }) {
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [playerData, setPlayerData] = useState(false)
    const [opponentData, setOpponentData] = useState(false)
    const [playerHp, setPlayerHp] = useState(100)
    const [opponentHp, setOpponentHp] = useState(100)
    const [recharge, setRecharge] = useState(false)
    const [spCharges, setSpCharges] = useState(4)

    const attackRate = 20000

    useEffect(() => {
        fetchImg1()
        fetchImg2()
        fetchPlayerData()
        fetchOpponentData()
    }, []);

    useEffect(() => {
        if (playerData && opponentData) {
            setPlayerHp(playerData.base.HP)
            setOpponentHp(opponentData.base.HP)
        }
    }, [playerData, opponentData])

    /* All fetching Data Functions */

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

    const fetchPlayerData = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${ownPokemon}`)
            .then((response) => setPlayerData(response.data))
            .catch((error) => console.log(error));
    };

    const fetchOpponentData = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${opponentPokemon}`)
            .then((response) => setOpponentData(response.data))
            .catch((error) => console.log(error));
    };

   /*  All Attack / Defense Funtions */

    const normalAttack = () => {
        setRecharge(true)
        let calculatedHp = Math.floor(opponentHp - (10 * playerData.base.Attack / opponentData.base.Defense))
        setOpponentHp(calculatedHp)
    }

    const oppAttack = () => {
        let calculatedHp = Math.floor(playerHp - (10 * opponentData.base.Attack / playerData.base.Defense))
        setPlayerHp(calculatedHp)
    }

    const specDefense = () => {
        setRecharge(true)
        let calculatedHp = Math.ceil(playerHp + (playerData.base['Sp. Defense']/3))
        if (calculatedHp > playerData.base.HP) setPlayerHp(playerData.base.HP)
        else setPlayerHp(calculatedHp)
    }

    const oppSpecDefense = () => {
        let calculatedHp = Math.ceil(opponentHp + (opponentData.base['Sp. Defense']/6))
        if (calculatedHp > opponentData.base.HP) setOpponentHp(opponentData.base.HP)
        else setOpponentHp(calculatedHp)
    }

    const specAttack = () => {
        setRecharge(true)
        let calculatedHp = Math.floor(opponentHp - (10 * (playerData.base.Attack+playerData.base['Sp. Attack']) / opponentData.base.Defense))
        setOpponentHp(calculatedHp)
        setSpCharges(spCharges-1)
    }
/* Opponent Use Effects */

    useEffect(() => {
        if (opponentData && playerData) {  
        const interval = setInterval(() => {
                oppAttack()
            }, (attackRate/opponentData.base.Speed));
            return () => clearInterval(interval)
        }
    }, [opponentData, playerHp]);
    useEffect(() => {
        if (opponentData && playerData) {  
        const interval = setInterval(() => {
                oppSpecDefense()
            }, (2*attackRate/opponentData.base.Speed));
            return () => clearInterval(interval)
        }
    }, [opponentData, opponentHp]);
/* Recharge Player Buttons Use Effect */
    useEffect(() => {
        if (opponentData && playerData) {
        const interval = setInterval(() => {
                setRecharge(false)
            }, (attackRate/playerData.base.Speed));
            return () => clearInterval(interval)
        }
    }, [recharge]);
/* Checking if Winner Use Effect */
    useEffect(() => {
        if (opponentHp <= 0) {
            calcWinner(1)
            setWinnerScore(playerHp * 5)
            setBattleScreen(false)
        }
        else if (playerHp <= 0) {
            calcWinner(2)
            setWinnerScore(0)
            setBattleScreen(false)
        }
    }, [opponentHp, playerHp])

    return (
        <div className='battleDiv'>
            {/* // <h1> Battle </h1> */}

            <Flex flexWrap='wrap' mx={-2}>
                <Box width={2 / 3} px={2}>
                    <div className='player1'>
                        <Image src={img1}
                            sx={{ width: ['50vw', '100%'] }} className='flipped' />
                        <p className='pokefont' as='h3'>{playerData && playerData.name.english}</p>
                        <div className='progressbar'>
                            {/* Start first Progress Bar */}
                            <div>
                                {playerHp && playerData && <><label for="file" className='pokefont' style={{ color: "yellow" }}>HP: </label>
                                    <progress id="file" value={playerHp} max={playerData.base.HP} /></>}
                            </div>
                            {/* Here Starts Special Attack PB */}
                            <div>
                                <label for="file" className='pokefont' style={{ color: "yellow" }}>SA: </label>
                                <progress id="file" value={spCharges} max="4" />
                            </div>
                        </div>
                    </div>
                </Box>
                <Box width={2 / 3} px={2}>
                    <div className='button1'>
                        <Button onClick={normalAttack} disabled={recharge}>Normal Attack</Button>
                    </div>
                    <div className='button2'>
                        <Button onClick={specDefense} disabled={recharge}>Heal</Button>
                    </div>
                    <div className='button3'>
                        <Button onClick={specAttack} disabled={recharge || spCharges==0}>Special Attack</Button>
                    </div>
                </Box>
                <Box width={2 / 3} px={2}>
                    <div className='player2'>
                        <br></br>
                        {/* Start first Progress Bar */}
                        <div>
                            {opponentHp && opponentData && <><label for="file" className='pokefont' style={{ color: "yellow" }}>HP: </label>
                                <progress id="file" value={opponentHp} max={opponentData.base.HP} /></>}
                        </div>
                        {/* Here Starts Special Attack PB */}
{/*                         <div>
                            <label for="file" className='pokefont' style={{ color: "yellow" }}>SD: </label>
                            <progress id="file" value="32" max="32" />
                        </div> */}
                        <Image src={img2}
                            sx={{ width: ['50vw', '100%'] }} />
                        <p className='pokefont' as='h3'>{opponentData && opponentData.name.english}</p>
                    </div>
                </Box>
            </Flex>
        </div>
    )
}