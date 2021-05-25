import Axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
    const [data, setData] = useState()

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        await Axios.get(`https://pokefight-back.herokuapp.com/pokemon/`)
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    };




    return (
        <>
            <h2>This is the home component</h2>
            {data ? data.map((e) => (
                <>
                    <a href={`/pokemon/${e.id}`}><p>{e.name.english}</p></a>
                </>
            )) : 'loading...'}
        </>
    )
}