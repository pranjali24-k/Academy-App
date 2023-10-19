import { collection, doc, getDoc, onSnapshot, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import LectureAccordion from '../components/LectureAccordion';

const CourseDetails = () => {
    let [course, setCourse] = useState([]);
    let courseSelected = useRef(false);
    let [lectures,setLectures] = useState([]);
    let [courseAccess, setCourseAccess] = useState(false)
    let currentStudent = useSelector(state => state.user);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function studentData() {
        try {
            const user = auth.currentUser;
            const userDoc = await getDoc(doc(db, 'students', user.uid));
            const userData = userDoc.data();
            await setDoc(doc(db, 'students', user.uid), {
                name: userData.name,
                number: userData.number,
                email: user.email,
                uid: user.uid,
                profilePic: userData.profilePic, // added profile pic url to doc
                applicationStatus: userData.applicationStatus,
                selectedCourse: [...userData.selectedCourse, course.name]
            });
            toast.success('Course Selected')
            courseSelected.current = true;
        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(
          query(collection(db, "courses", id, "lectures")),
          (querySnapshot) => {
            const lecturesData = [];
            querySnapshot.forEach((doc) => {
              lecturesData.push({ id: doc.id, ...doc.data() });
            });
            setLectures(lecturesData);
          },
          (error) => {
            console.error("Error fetching lectures:", error);
          }
        );
    
        return () => {
          unsubscribe();
        };
      }, [id]);

    const getData = async () => {
        try {
            const docRef = doc(db, "courses", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCourse({ id: id, ...docSnap.data() });
            } else {
                console.log("No such course!");
                toast.error("No such course!");
                navigate("/courses");
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    if (currentStudent.selectedCourse) {
        currentStudent.selectedCourse.map((element) => {
            if (element === course.name) {
                courseSelected.current = true;
            }
        })
    }
    // console.log(lectures)
    return (
        <div className='wrapper'>
            <div className='course-details-header'>
                <h2>{course.name}</h2>
                {
                    !courseSelected.current && currentStudent.isStudent &&
                    (<Button
                        width={'80px'}
                        text={'Book Now !'}
                        onClick={studentData}
                    />)
                }
                {
                    courseSelected.current && currentStudent.applicationStatus == 'approved'
                    && !currentStudent.paymentStatus
                    &&
                    (
                        <Button
                            width={'80px'}
                            text={'Make Payment'}
                            onClick={() => { toast.warning('Payment getway Comming Soon till that you can contact admin for payment details.') }}
                        />
                    )
                }
                {
                    courseSelected.current && currentStudent.applicationStatus == 'approved'
                    && currentStudent.paymentStatus && currentStudent.isStudent
                    &&!courseAccess &&
                    (
                        <Button
                            width={'80px'}
                            text={'Start Course'}
                            onClick={() => {setCourseAccess(true)}}
                        />
                    )
                }
                {
                    !currentStudent.isStudent &&
                    currentStudent.name == course.teacher &&
                    (
                        <Button
                            width={'80px'}
                            text={'Upload Lectures'}
                            onClick={() => { navigate(`/courses/${id}/upload-lectures`) }}
                        />
                    )
                }
            </div>
            <div className='banner-wrapper'>
                <img src={course.bannerImage} alt="Course Banner Image" />
            </div>
            {
                !courseAccess && (
                    <>
                        <div className='course-description'
                            style={{ border: 'none', fontWeight: 'bolder' }}
                        ><p>Tutor : Prof. {course.teacher}</p>  <p>Course Fee : {course.courseFee}  &#8377;</p>
                        </div>
                        <p className='course-description'
                            style={{ border: 'none', fontWeight: 'bolder' }}
                        >Course Overview</p>
                        <p className='course-description' style={{ paddingBottom: '20px' }}>
                            {course.desciption}
                        </p>
                    </>
                )
            }
            {
                courseAccess && (
                    <div className='lectures'>
                        <h2>Lectures</h2>
                        {
                            lectures?.length>0 && 
                               <LectureAccordion
                                    lectures={lectures}
                               />
                            
                        }
                        
                    </div>
                )
            }
        </div>
    )
}

export default CourseDetails