const Chat = ({ sortedMessages }) => {
    return (
        <div className="chat-display">
            {sortedMessages.map((message, index) => (
                <div key={index} className="">
                    <div className="chat-message-header">
                        <div className="image-container">
                            <img src={message.img} alt='chat-message' />
                        </div>
                        <p>{message.name}</p>
                    </div>
                    <p>{message.mssg}</p>
                </div>
            ))}
        </div>
    )
}

export default Chat;