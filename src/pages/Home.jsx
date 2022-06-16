import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true)

    const authToken = false;

    const minimal = false

    const handleClick = () => {
        console.log('Clicked bimches')
        setShowModal(true)
        setIsSignUp(true)
    }

    return (
        <>
            <div className="overlay">
                <Nav authToken={authToken} minimal={minimal} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp} />
                <div className="home">
                    <h1 className="primary-title">Swipe Right™</h1>
                    <button className="primary-button" onClick={handleClick}>
                        {authToken ? 'Signout' : 'Create Account'}
                    </button>

                    {showModal && (
                        <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;