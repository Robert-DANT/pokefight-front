import { Label, Select } from '@rebass/forms'
import { Box, Text, Flex } from 'rebass'
import pokeball from './img/pokeball.png'
import chooseOwnImg from './img/chooseOwn.png'
import './home.css'
import './font.css'


export default function OwnSelectionScreen ({pokeData, img, data, setSelectedPokemon, selectFirstPokemon}) {
    return(
        <div className='selectionScreen'>
            <img src={chooseOwnImg} className='headingText '/>
            <Flex mx={-2} className='ownSelectBox'>
                <Box width={[1/2, 4 / 11]} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <br />
                        {img && pokeData.name ? <><h1 className='pokefont'>{pokeData.name.english}</h1> <img src={img} className='pokeImg flip-horizontally' a={pokeData.name.english} /> </>
                        : <img src={pokeball} className='pokeImg' a='pokeball' />}
                    </Text>
                </Box>
                <Box width={[1/2, 3 / 11]} px={2}>
                    <Text p={1} color='background' bg='primary'>
                        <h2 className='selectHeading pokefont'>Please Select your own Pokemon</h2>
                        {data ?
                            <>
                                <Box>
                                    <Label htmlFor='pokemon' className='pokefont'>Choose your fighter!</Label>
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
                                {img && pokeData.name && <button className='selectButton pokefont' onClick={selectFirstPokemon}>Select {pokeData.name.english} as your Pokemon!</button>}
                            </>
                            : 'loading...'}
                    </Text>
                </Box>
                <Box width={[1/1, 4 / 11]} px={2}>
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
                                
                            </ul></div>
                        </> : <><p className='pokefont selectHeading'>Select a Pokemon to show its Stats</p></>}
                    </Text>
                </Box>
            </Flex>
            </div>
    )
}