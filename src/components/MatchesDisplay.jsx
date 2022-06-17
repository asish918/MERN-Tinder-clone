import axios from 'axios'
import { useEffect, useState } from 'react'

const MatchesDisplay = ({ matches, setClickedUser }) => {
    const[matchedProfile, setMatchedProfile] = useState(null);
    const matchedUserIds = matches.map(({ user_id }) => user_id)
    
    const getMatches = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users', {
                params: {
                    userIds: JSON.stringify(matchedUserIds)
                }
            })
            setMatchedProfile(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMatches()
    }, [])

    console.log(matchedProfile)
    
    return (
        <div className="matches-display">
            {matchedProfile?.map((match, index) => (
                <div key={index} className='match-card' onClick={() => setClickedUser(match)}>
                    <div className="image-container">
                        <img src={match?.url} alt='match-profile' />
                    </div>
                    <h3>{match.first_name}</h3>
                </div>
            ))}
        </div>
    )
}

export default MatchesDisplay;