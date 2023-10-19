import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthenticationPage from './Pages/AuthenticationPage';
import LandingPage from './Pages/LandingPage';
import Footer from './components/Footer.js';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Profile from './Pages/Profile';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { set_courses, set_user } from './redux/actions/actionCreators';
import EditProfile from './Pages/EditProfile';
import PrivateRoutes from './components/PrivateRoutes';
import AdminAuthentication from './Pages/AdminAuthentication';
import AdminPrivateRoutes from './components/AdminPrivateRoutes';
import AdminPage from './Pages/AdminPage';
import AllStudents from './Pages/AllStudents';
import AllTeachers from './Pages/AllTeachers';
import AllCourses from './Pages/AllCourses';
import AddCourses from './Pages/AddCourses';
import CourseDetails from './Pages/CourseDetails';
import Courses from './Pages/Courses';
import YourCourses from './Pages/YourCourses';
import StudentDetails from './Pages/StudentDetails';
import ShortlistedStudents from './Pages/ShortlistedStudents';
import RejectedStudents from './Pages/RejectedStudents';
import UploadLectures from './Pages/UploadLectures';
import OurFaculty from './Pages/OurFaculty';
import AboutUs from './components/AboutUs';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscibeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscibeSnapshot = onSnapshot(
          doc(db, "students", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                set_user({
                  name: userData.name,
                  number: userData.number,
                  email: user.email,
                  uid: user.uid,
                  profilePic: userData.profilePic, // added profile pic url to doc
                  applicationStatus: userData.applicationStatus,
                  selectedCourse: userData.selectedCourse,
                  isStudent: userData.isStudent,
                  paymentStatus:userData.paymentStatus
                })
              )

            }
          },
          (error) => {
            console.log('Error fetching user data: ', error)
          }
        );
        return () => {
          unsubscibeSnapshot()
        }
      }
    })
    return () => {
      unsubscibeAuth()
    };
  }, [])

  // fetch courses collection data
  useEffect(() => {
    const coursesCollectionRef = collection(db, 'courses');
    const unsubscibeSnapshot = onSnapshot(
      coursesCollectionRef,
      (querySnapshot) => {
        var cData = [];
        querySnapshot.forEach((doc) => {
          // Access individual document data using doc.data()
          const data = doc.data();
          cData.push(data)
        });
        dispatch(set_courses(cData));

      }, (error) => {
        console.error('Error fetching documents:', error);
      });
    return () => {
      unsubscibeSnapshot()
    }
  }, [])

  return (
    <div className="App">
      <ToastContainer />
      <Navbar></Navbar>

      <div className='parent-container'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<AuthenticationPage />} />
          <Route path='/adminlogin' element={<AdminAuthentication />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/ourfaculty' element={<OurFaculty />} />
          <Route element={<AdminPrivateRoutes />}>
            <Route path='/adminPage' element={<AdminPage />}></Route>
            <Route path='/allstudents' element={<AllStudents />}></Route>
            <Route path='/allteachers' element={<AllTeachers />}></Route>
            <Route path='/allcourses' element={<AllCourses />}></Route>
            <Route path='/shortlisted_students' element={<ShortlistedStudents />}></Route>
            <Route path='/rejected_students' element={<RejectedStudents />}></Route>
            <Route path='/studentDetails/:id' element={<StudentDetails />}></Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/yourcourse' element={<YourCourses />} />
            <Route path='/coursedetails/:id' element={<CourseDetails />}></Route>
            <Route path='/courses/:id/upload-lectures' element={<UploadLectures />}></Route>
          </Route>
        
        </Routes>

      <Footer/>
      </div>
    </div>

  );
}

export default App;
