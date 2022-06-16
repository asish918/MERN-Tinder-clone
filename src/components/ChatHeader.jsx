const ChatHeader = () => {
    return (
        <div className="chat-container-header">
            <div className="profile">
                <div className="image-container">
                    <img src="https://picsum.photos/30/30" alt="profile-pic" />
                </div>
                <h5>UserName</h5>
            </div>
            <i className="log-out-icon">⇦</i>
        </div>
    )
}

export default ChatHeader;