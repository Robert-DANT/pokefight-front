import { Label, Select } from '@rebass/forms'
import { Box, Text, Flex } from 'rebass'
import pokeball from './img/pokeball.png'
import chooseOppImg from './img/chooseOpp.png'
import Fiber from './fiber2'
import './home.css'
import './font.css'


export default function OwnSelectionScreen ({pokeData, img, data, setSelectedPokemon, selectSecondPokemon}) {
    return(
        <div className='selectionScreen' style={{background: 'linear-gradient(90deg, rgba(101,4,186,1) 0%, rgba(237,123,129,1) 100%)'}}>
                <img src={chooseOppImg} className='headingText '/>
                <Flex mx={-2} className='oppSelectBox'>
                    <Box width={4 / 11} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        {pokeData.name ? <>
                            <h3 className='pokefont selectHeading'>Stats of {pokeData.name.english}:</h3>
                            <div className='statsList'>
                                <ul>
                                    <li className='pokefont'>Type: {pokeData.type[0]}{pokeData.type[1] && `, ${pokeData.type[1]}`}</li>
                                    <li className='pokefont'>HP: {pokeData.base.HP}</li>
                                    <li className='pokefont'>Attack: {pokeData.base.Attack}</li>
                                    <li className='pokefont'>Defense: {pokeData.base.Defense}</li>
                                    <li className='pokefont'>SP. Attack: {pokeData.base['Sp. Attack']}</li>
                                    <li className='pokefont'>SP. Defense: {pokeData.base['Sp. Defense']}</li>
                                    <li className='pokefont'>Speed: {pokeData.base.Speed}</li>
                                </ul>
                                </div>
                            </> : <><p className='pokefont selectHeading'>Select a Pokemon to show its Stats</p></>}
                        </Text>
                    </Box>
                    <Box width={3 / 11} px={2}>
                        <Text p={1} color='background' bg='primary'>
                        <h2 className='selectHeading pokefont'>Please Select your opponents Pokemon</h2>
                        {data ?
                                <>
                                    <Box>
                                        <Label className='pokefont' htmlFor='pokemon'>Choose who you fight against!</Label>
                                        <Select
                                            className='pokefont'
                                            id='pokemon'
                                            name='pokemon'
                                            defaultValue={null}
                                            onChange={((e) => setSelectedPokemon(e.target.selectedIndex + 1))}>
                                            {Object.entries(data).map(([key, e]) => (
                                                <option className='pokefont'
                                                    key={key}>
                                                    {e.name.english}
                                                </option>
                                            ))}
                                        </Select>
                                    </Box>
                                    <button className='selectButton pokefont' onClick={(() => setSelectedPokemon(Math.ceil(Math.random() * 808)))}>Random Pokemon</button> <br/>
                                    {img && pokeData.name && <button className='selectButton pokefont' onClick={selectSecondPokemon}>Select {pokeData.name.english} as your opponents Pokemon!</button>}
                                </>
                                : 'loading...'}
                        </Text>
                    </Box>
                    <Box width={4 / 11} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <br />
                            {img && pokeData.name ? <><h1 className='pokefont'>{pokeData.name.english}</h1> <img src={img} className='pokeImg2' a={pokeData.name.english} /> </>
                            : /* <img src={pokeball} className='pokeBall' a='pokeball' /> */ <Fiber />}
                        </Text>
                    </Box>
                </Flex>
                </div>
    )
}