import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [cookies, setCookies, removeCookies] = useCookies(['user'])
    const [genderedUsers, setGenderedUsers] = useState([]);

    const userId = cookies.UserId;

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

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/genderedusers', {
                params: { gender: user?.gender_interest }
            })

            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

    const updateMatches = async (matchedUser) => {
        try {
            const response = await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUser
            })
        } catch (error) {
            console.log(error);
        }
        getUser()
    }

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))

    const characters = filteredGenderedUsers;

    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, swipedUser) => {
        setLastDirection(direction)

        if (direction === 'right') {
            updateMatches(swipedUser)
        }

        getUser();
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
                                <TinderCard className='swipe' key={character.first_name} onSwipe={(dir) => swiped(dir, character.user_id)} onCardLeftScreen={() => outOfFrame(character.first_name)}>
                                    <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                        <h3>{character.first_name}</h3>
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