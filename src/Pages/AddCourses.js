import React, { useState } from 'react'
import InputComponent from '../components/Input'
import Button from '../components/Button'
import FileInput from '../components/Input/FileInput'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

const AddCourses = () => {
    const [courseName, setCourseName] = useState('')
    const [courseTeacher, setCourseTeacher] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseFee, setCourseFee] = useState(null)
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [loading,setLoading] = useState(false);

    async function handleOnClick() {
        if (courseName && courseDescription && displayImage && bannerImage) {
            try {
                setLoading(true)
                //banner Image
                const bannerImageRef = ref(storage, `courses/'Karne's Academy'/${Date.now()}`);
                await uploadBytes(bannerImageRef, bannerImage);
                const bannerImageUrl = await getDownloadURL(bannerImageRef)
                //Display Image
                const displayImageRef = ref(storage, `courses/'Karne's Academy'/${Date.now()}`);
                await uploadBytes(displayImageRef, displayImage);
                const displayImageUrl = await getDownloadURL(displayImageRef)

                const coursesData = {
                    name: courseName,
                    desciption: courseDescription,
                    teacher:courseTeacher,
                    bannerImage: bannerImageUrl,
                    displayImage: displayImageUrl,
                    courseFee : courseFee
                }

                await addDoc(collection(db, 'courses'), coursesData);
                setCourseName('')
                setCourseDescription('')
                setCourseTeacher('');
                setDisplayImage(null)
                setBannerImage(null)
                setCourseFee(null);
                setLoading(false)
                toast.success('Course Created !')
            } catch (e) {
                setLoading(false)
                toast.error(e.message)
                console.log(e)
            }
        } else {
            setLoading(false)
            toast.error('All fields are mandatory !')
        }
    }
    const displayImageHandle = (file) => {
        setDisplayImage(file)
    }
    const bannerImageHandle = (file) => {
        setBannerImage(file)
    }
    return (
        <div className='wrapper'>
            <h2>Add Courses</h2>
            <>
                <InputComponent
                    state={courseName}
                    setState={setCourseName}
                    placeholder='Name of Course'
                    type="text"
                    required={true}
                />
                <InputComponent
                    state={courseDescription}
                    setState={setCourseDescription}
                    placeholder='Course Description'
                    type="text"
                    required={true}
                />
                <InputComponent
                    state={courseTeacher}
                    setState={setCourseTeacher}
                    placeholder='Name of Teacher'
                    type="text"
                    required={true}
                />
                <FileInput
                    accept={'image/*'}
                    id={'display-image-input'}
                    fileHandleFnc={displayImageHandle}
                    text={'Upload Display Image'}
                />
                <FileInput
                    accept={'image/*'}
                    id={'banner-image-input'}
                    fileHandleFnc={bannerImageHandle}
                    text={'Upload Banner Image'}
                />
                <InputComponent
                    state={courseFee}
                    setState={setCourseFee}
                    placeholder='Course Fee'
                    type="number"
                    required={true}
                />
                <Button
                    text={!loading?'Add':'Loading ...'}
                    onClick={handleOnClick}
                    disabled={false}
                />
            </>
        </div>
    )
}

export default AddCourses