import { useState } from "react";
import Nav from '../components/Nav'
import { useCookies } from 'react-cookie'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
    let navigate = useNavigate();
    const[cookies, setCookies, removeCookies] = useCookies(['user']);
    const [formData, setFormData] = useState(
        {
            user_id: cookies.UserId,
            first_name: '',
            DOB_day: '',
            DOB_month: '',
            DOB_year: '',
            show_gender: false,
            gender_identity: '',
            gender_interest: '',
            url: '',
            about: '',
            matches: [],
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put('http://localhost:8000/user', {formData})

            const success = response.status === 200
            if(success) navigate('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => { }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first-name">First Name</label>
                        <input
                            id="first-name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={(e) => handleChange(e)}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">

                            <input
                                id="DOB-day"
                                type="number"
                                name="DOB_day"
                                placeholder="DD"
                                required={true}
                                value={formData.DOB_day}
                                onChange={(e) => handleChange(e)}
                            />

                            <input
                                id="DOB-month"
                                type="number"
                                name="DOB_month"
                                placeholder="MM"
                                required={true}
                                value={formData.DOB_month}
                                onChange={(e) => handleChange(e)}
                            />

                            <input
                                id="DOB-year"
                                type="number"
                                name="DOB_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.DOB_year}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="male-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value='Male'
                                onChange={(e) => handleChange(e)}
                                checked={formData.gender_identity === 'Male'}
                            />
                            <label htmlFor="male-gender-identity">Male</label>
                            <input
                                id="female-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value='Female'
                                onChange={(e) => handleChange(e)}
                                checked={formData.gender_identity === 'Female'}
                            />
                            <label htmlFor="female-gender-identity">Female</label>
                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                required={true}
                                value='More'
                                onChange={(e) => handleChange(e)}
                                checked={formData.gender_identity === 'More'}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="show-gender">Show Gender on my Profile</label>
                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={(e) => handleChange(e)}
                            checked={formData.show_gender}
                        />

                        <label>Show Me</label>
                        <div className="multiple-input-container">
                            <input
                                id="male-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="male"
                                onChange={(e) => handleChange(e)}
                                checked={formData.gender_interest === 'male'}
                            />
                            <label htmlFor="male-gender-interest">Male</label>
                            <input
                                id="female-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="female"
                                onChange={(e) => handleChange(e)}
                                checked={formData.gender_interest === 'female'}
                            />
                            <label htmlFor="female-gender-interest">Female</label>
                            <input
                                id="everyone-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="everyone"
                                onChange={(e) => handleChange(e)}
                                checked={formData.gender_interest === 'everyone'}
                            />
                            <label htmlFor="everyone-gender-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About Me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I love Dogs🐶"
                            value={formData.about}
                            onChange={(e) => handleChange(e)}
                        />

                        <input type="submit" />
                    </section>

                    <section>
                        <label htmlFor="">Profile</label>
                        <input
                            id="url"
                            name="url"
                            onChange={(e) => handleChange(e)}
                            required={true}
                            type="url" />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile-preview" />}
                        </div>
                    </section>

                </form>
            </div>
        </>
    )
}

export default OnBoarding;