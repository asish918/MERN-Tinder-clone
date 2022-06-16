import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({ setShowModal, isSignUp }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookies, removeCookies] = useCookies(['user']);
    const navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match');
                return
            }

            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, {
                email, password
            })

            setCookies('UserId', response.data.userId)
            setCookies('AuthToken', response.data.token)

            const success = response.status === 201

            if (success && isSignUp) {
                navigate('/onboarding')
            }

            if (success && !isSignUp)
                navigate('/dashboard')
                
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to terms and conditions</p>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isSignUp && <input
                    type='password'
                    id='password-check'
                    name='password-check'
                    placeholder='Confirm Password'
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                }

                <input type='submit' className='secondary-button' />
                <p>{error}</p>
            </form>
            <hr />
            <h2>GET THE APP</h2>
        </div>
    )
}

export default AuthModal;