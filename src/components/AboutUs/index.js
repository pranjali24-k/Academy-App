import React from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import './styles.css';
const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <header>
                <h1>About Us</h1>
            </header>
            <section className="content">
                <h2>Welcome to Our Coaching Academy!</h2>
                <p>We are a leading coaching academy offering classes for 11th and 12th-grade science students, as well as comprehensive computer classes that cover topics like Angular, React, and frontend development.</p>
                <p>At our academy, we believe in providing quality education and nurturing a learning environment that helps students excel in their studies and professional growth.</p>

                <section className="contact">
                    <div>
                        <h3>Contact Information</h3>
                        <p>Address: Shrirampur Near Kanda Market, Dist. Ahemadnagar, Maharashtra</p>
                        <p>Contact Number: 9552002220</p>
                        <Button
                            width={'100px'}
                            text={'Faculty'}
                            onClick={() => { navigate('/ourfaculty') }}
                        />
                    </div>
                    <div>
                        <h3>Our Courses</h3>
                        <ul>
                            <li>11th and 12th Science All Subjects</li>
                            <li>Computer Classes:</li>
                            <ul>
                                <li>Angular Development</li>
                                <li>React Development</li>

                                {/* <!-- Add more computer courses here --> */}
                            </ul>
                        </ul>
                    </div>
                </section>
            </section>

        </div>
    )
}

export default AboutUs