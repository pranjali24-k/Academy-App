import React, { useState } from 'react'
import InputComponent from '../components/Input'
import Button from '../components/Button'
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';

const UploadLectures = () => {
    const {id} = useParams();
    const [topicName, setTopicName] = useState('');
    const [topicDetails, setTopicDetails] = useState('');
    const [lectureDate, setLectureDate] = useState();
    const [loading, setLoading] = useState(false);

    async function handleOnClick() {
        setLoading(true)
        if ((topicName, topicDetails, lectureDate)) {
            try {
                const topicsData = {
                    topicName: topicName,
                    topicDetails: topicDetails,
                    lectureDate: lectureDate,
                };
                await addDoc(
                    collection(db, "courses", id, "lectures"),
                    topicsData
                );
                setTopicName('')
                setTopicDetails('')
                setLectureDate()
                setLoading(false);
                toast.success('Lecture Uploaded')
            } catch (e) {
                setLoading(false)
                toast.error(e.message);
                console.log(e.message)
            }
        }else{
            toast.error('All fields are mandatory !')
        }
    }
    return (
        <div className='wrapper'>
            <h2>Upload Lectures</h2>
            <InputComponent
                state={topicName}
                setState={setTopicName}
                placeholder='Enter Topic Name'
                type="text"
                required={true}
            />
            <InputComponent
                state={topicDetails}
                setState={setTopicDetails}
                placeholder='Enter Topic Details'
                type="text"
                required={true}
            />
            <InputComponent
                state={lectureDate}
                setState={setLectureDate}
                type="date"
                required={true}
            />

            <Button
                text={loading ? 'Loading ...' : 'Upload Lecture'}
                onClick={handleOnClick}
                disabled={loading}
            />
        </div>
    )
}

export default UploadLectures