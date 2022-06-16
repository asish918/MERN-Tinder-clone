import cookies, { useCookies } from 'react-cookie'


const ChatHeader = ({ user }) => {
    const[cookies, setCookies, removeCookies] = useCookies(['user'])
    
    const logout = () => {
        removeCookies('AuthToken', cookies.AuthToken)
        removeCookies('UserId', cookies.UserId)
        window.location.reload();
    }

    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="image-container">
                    <img src={user.url} alt="profile-pic" />
                </div>
                <h5>{user.first_name}</h5>
            </div>
            <i className="log-out-icon" onClick={logout}>⇦</i>
        </div>
    )
}

export default ChatHeader;