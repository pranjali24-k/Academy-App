import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InputComponent from "./Input";
import FileInput from "./Input/FileInput";
import Button from "./Button";
function EditProfileForm() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [fileURL, setFileURL] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  async function handleOnClick() {
    setLoading(true)
    const updatedData={
      email:email,
      number:number,
      name:fullname,
      profilePic:fileURL
    }
    try { 
      await setDoc(doc(db, "students", user.uid),updatedData);
      toast.success('Profile Updated !')
      setLoading(false)
      
    } catch (e) {
      console.log("Error = ",e)
      toast.error(e.message)
      setLoading(false)
    }
  }

  //adding profile picture to storage and generate url .
  const profileImageHandle = async (file) => {
    setLoading(true);
    try {
      const imageRef = ref(storage, `profile/${Date.now()}`);
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      setFileURL(imageURL);
      setLoading(false);
      toast.success("Image Uploaded!");
    } catch (e) {
      console.log(e);
      toast.error("Error Occurred!");
    }
  }

  return (
    <>
      <InputComponent
        state={fullname}
        setState={setFullname}
        placeholder='Update Name'
        type="text"
        required={true}
      />
      <InputComponent
        state={number}
        setState={setNumber}
        placeholder='Update Number'
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder='Update Email'
        type="email"
        required={true}
      />
      <FileInput
        accept={'image/*'}
        id={'profile-image-input'}
        fileHandleFnc={profileImageHandle}
        text={'Upload Updated Profile Picture'}
      />
      <Button
        text={loading ? "Loading.." : "Edit Profile"}
        onClick={handleOnClick}
        disabled={loading}
      />
    </>
  )
}

export default EditProfileForm