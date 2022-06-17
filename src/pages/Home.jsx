import Nav from "../components/Nav";
import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useCookies } from 'react-cookie'

const Home = () => {

    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookies, removeCookies] = useCookies(['user'])

    const authToken = cookies.authToken

    const minimal = false

    const handleClick = () => {
        if(authToken) {
            removeCookies('UserId', cookies.UserId)
            removeCookies('AuthToekn', cookies.AuthToken)
            window.location.reload();
            return
        }

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