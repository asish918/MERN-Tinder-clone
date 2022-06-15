import Nav from "../components/Nav";

const Home = () => {

    const authToken = false;
    const minimal = false

    const handleClick = () => {
        console.log('Clicked bimches')
    }

    return (
        <>
            <div className="overlay">
                <Nav minimal={minimal} authToken={authToken} />
                <div className="home">
                    <h1>Swipe Right™</h1>
                    <button className="primary-button" onClick={handleClick}>
                        {authToken ? 'Signout' : 'Create Account'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;