import axios from "axios";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import ChatInput from "./ChatInput";

const ChatDisplay = ({ user, clickedUser }) => {

    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [userMessages, setUserMessages] = useState(null);
    const [clickedUserMessages, setClickedUserMessages] = useState(null);

    const getUserMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: {
                    userId: userId, correspondingUserId: clickedUserId
                }
            })
            setUserMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getClickedUserMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: {
                    userId: clickedUserId, correspondingUserId: userId
                }
            })
            setClickedUserMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserMessages()
        getClickedUserMessages()
    }, [])

    const messages = []

    userMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['mssg'] = message.message
        formattedMessage['timestamp'] = message.timestamp

        messages.push(formattedMessage)
    })

    clickedUserMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['mssg'] = message.message
        formattedMessage['timestamp'] = message.timestamp

        messages.push(formattedMessage)
    })

    const sortedMessages = messages?.sort((a, b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
            <Chat sortedMessages={sortedMessages} />
            <ChatInput />
        </>
    )
}

export default ChatDisplay;