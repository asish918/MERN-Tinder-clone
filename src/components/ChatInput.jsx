import { useState } from "react";

const ChatInput = () => {
    const [textArea, setTextArea] = useState();
    
    return (
        <div className="chat-input">
            <textarea name="" id="" value={textArea} onChange={(e) => setTextArea(e.target.value)}></textarea>
            <button className="secondary-button">Submit</button>
        </div>
    )
}

export default ChatInput;