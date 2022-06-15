import wlogo from './images/white-logo.png'
import clogo from './images/color-logo.png'

const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignUp }) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? clogo : wlogo} alt='logo' />
            </div>

            {!authToken && !minimal && (
                <button className='nav-button' onClick={handleClick} disabled={showModal}>Log In</button>
            )}

        </nav>
    )
}

export default Nav;