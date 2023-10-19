import React, { useEffect } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { set_courses } from '../redux/actions/actionCreators';
import Card from '../components/Card';

const AllCourses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const courses = useSelector(state=>state.courses)
    console.log(courses)
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'courses')),
            (querySnapshot) => {
                const courseData = [];
                querySnapshot.forEach((doc) => {
                    courseData.push({ id: doc.id, ...doc.data() });
                });
                dispatch(set_courses(courseData));
            },
            (error) => {
                console.log('Error fetching courses:', error)
            }
        );
        return () => {
            unsubscribe();
        };

    }, [dispatch]);

  return (
    <div className='wrapper'>
        <h2>Courses</h2>
        {
            courses.length>0 &&(
                <div className='card-wrapper'>
                    {
                        courses.map((element)=>(
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
        }
        <Button
            width={'100px'}
            text={'Add Courses'}
            onClick={()=>{navigate('/addcourses')}}
        />
    </div>
  )
}

export default AllCourses