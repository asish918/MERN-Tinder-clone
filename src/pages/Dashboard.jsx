import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [cookies, setCookies, removeCookies] = useCookies(['user'])

    const userId = cookies.UserId;

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user', {
                    params: { userId }
                })

                setUser(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        getUser()
        console.log(user)
    }, [])


    const characters = [
        {
            name: 'Richard Hendricks',
            url: 'https://picsum.photos/400/600'
        },
        {
            name: 'Erlich Bachman',
            url: 'https://picsum.photos/400/600'
        },
        {
            name: 'Monica Hall',
            url: 'https://picsum.photos/400/600'
        },
        {
            name: 'Jared Dunn',
            url: 'https://picsum.photos/400/600'
        },
        {
            name: 'Dinesh Chugtai',
            url: 'https://picsum.photos/400/600'
        }
    ]

    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <>
            {user && (
                <div className="dashboard">
                    <ChatContainer user={user} />

                    <div className="swipe-container">
                        <div className="card-container">
                            {characters.map((character) =>
                                <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                                    <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                        <h3>{character.name}</h3>
                                    </div>
                                </TinderCard>
                            )}

                            <div className="swipe-info">
                                {lastDirection && <p>You swiped {lastDirection}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard;