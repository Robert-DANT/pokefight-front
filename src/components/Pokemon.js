import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Pokemon() {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/${id}`)
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    };


    return (
        <>
            <h2>Pokemon Component</h2>
            {data ? (
                <>
            <h3>{data.name.english}</h3>
            <h4>Type: {data.type[0]}{data.type[1] && `, ${data.type[1]}`}</h4>
            <h5>Stats: <ul>
                <li>HP: {data.base.HP}</li>
                <li>Attack: {data.base.Attack}</li>
                <li>Defense: {data.base.Defense}</li>
                <li>SP. Attack: {data.base['Sp. Attack']}</li>
                <li>Speed: {data.base.Speed}</li>
                </ul></h5>
            
               
            </>) : 'loading...'}
            <h4><a href='/'>Go Back</a></h4>
        </>
    )
}