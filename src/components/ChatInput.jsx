import axios from "axios";
import { useState } from "react";

const ChatInput = ({ user, clickedUser, getUserMessages, getClickedUserMessages }) => {
    const [textArea, setTextArea] = useState();
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userid: userId,
            to_userid: clickedUserId, 
            message: textArea
        }

        try {
            const response = await axios.post('http://localhost:8000/message', {message})
            getClickedUserMessages()
            getUserMessages()
            setTextArea('')
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="chat-input">
            <textarea name="" id="" value={textArea} onChange={(e) => setTextArea(e.target.value)}></textarea>
            <button className="secondary-button" onClick={addMessage}>Submit</button>
        </div>
    )
}

export default ChatInput;