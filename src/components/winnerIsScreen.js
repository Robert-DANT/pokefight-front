import './winnerIsScreen.css'



export default function StartScreen({ setWinnerIsScreen }) {
    return (
        <section className='winnerIsSection' onClick={(() => setWinnerIsScreen(false))}>
            <h1>The Winner is...</h1>
        </section>
    )
}