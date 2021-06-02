import Axios from 'axios'
import { useEffect, useState } from 'react'
import './BattleScreen.css';
import {Box,Card,Image,Heading,Button,Flex} from 'rebass'
import './font.css'

export default function BattleScreen() {
    return (
        <>
            {/* // <h1> Battle </h1> */}

            <Flex flexWrap='wrap' mx={-2}>
                <Box width={2 / 3} px={2}>
                    <div className='player1'>
                        <Image src={'https://cdn.pixabay.com/photo/2020/01/22/06/26/pokemon-4784547_960_720.png'}
                            sx={{ width: ['50%', '20%'] }} />
                        <p className='pokefont' as='h3'> {'Name'} </p>
                        <div className='progressbar'>
                            {/* Start first Progress Bar */}
                            <div>
                                <label for="file" className='pokefont' style={{ color: "yellow" }}>HP: </label>
                                <progress id="file" value="32" max="100" > 32% </progress>
                            </div>
                            {/* Here Starts Special Attack PB */}
                            <div>
                                <label for="file" className='pokefont' style={{ color: "yellow" }}>SA: </label>
                                <progress id="file" value="32" max="100"> 32% </progress>
                            </div>
                        </div>
                    </div>
                </Box>
                <Box width={2 / 3} px={2}>
                    <div className='button1'>
                        <Button>Normal Attack</Button>
                    </div>
                    <div className='button2'>
                        <Button>Special Attack </Button>
                    </div>
                </Box>
                <Box width={2 / 3} px={2}>
                    <div className='player2'>
                        <br></br>
                        {/* Start first Progress Bar */}
                        <div>
                            <label for="file" className='pokefont' style={{ color: "yellow" }}>HP: </label>
                            <progress id="file" value="32" max="100" > 32% </progress>
                        </div>
                        {/* Here Starts Special Attack PB */}
                        <div>
                            <label for="file" className='pokefont' style={{ color: "yellow" }}>SA: </label>
                            <progress id="file" value="32" max="100"> 32% </progress>
                        </div>
                        <Image src='https://cdn.pixabay.com/photo/2020/01/22/06/26/pokemon-4784547_960_720.png'
                            sx={{ width: ['50%', '20%'] }} />
                        <p className='pokefont' as='h3'> {'Name'} </p>
                    </div>
                </Box>
            </Flex>
        </>
    )
}