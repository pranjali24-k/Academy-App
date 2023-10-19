import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const YourCourses = () => {
    const courses = useSelector(state => state.courses)
    const userCourses = useSelector(state => state.user.selectedCourse);
    const navigate = useNavigate();
    var yourCourses=[];
    if (userCourses && courses) {
        for (let i = 0; i < userCourses.length; i++) {
            courses.map((element) => {
                if(element.name == userCourses[i]){
                    yourCourses.push(element)
                }
            })
        }
    }

    return (
        <div className='wrapper'>
            <h2>Your Courses</h2>
                    {
            yourCourses.length>0 ?(
                <div className='card-wrapper'>
                    {
                        yourCourses.map((element)=>(
                            <Card
                                key={element.id}
                                id={element.id}
                                title={element.name}
                                displayImage={element.displayImage}
                                path={`coursedetails/${element.id}`}
                            />
                        ))
                    }
                </div>
            )
        
               
                :
                    <>
                        <p>Opps ! No Course Booked Yet</p>
                        <p 
                            style={{ cursor: 'pointer' }}
                            onClick={() => { navigate('/courses') }}
                        >
                            Click here to Go to Courses
                        </p>
                    </>
            }
        </div>
    )
}

export default YourCourses