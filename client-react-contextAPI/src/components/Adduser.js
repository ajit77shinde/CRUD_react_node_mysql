import React, { Fragment, useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Adduser = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLstName] = useState('');
    const [image, setImage] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { addUser, users } = useContext(GlobalContext);
    const [file, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    let history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            id: users.length + 1,
            first_name,
            last_name,
            image,
            gender,
            email,
            phone,
        }
        let formData = new FormData();
        formData.append('file',file)
        // formData.append('first_name',file)
        // formData.append('last_name',file)
        // formData.append('image',file)
        // formData.append('gender',file)
        // formData.append('email',file)
        // formData.append('phone',file)
        
        console.log('form data = ', formData)

        axios.post('http://localhost:5000/api/v1/users/uploadImage', formData).then(res => {
            console.log("res = ",res);
           
        }).catch(err => console.log(err))


    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newUser)
    //     };
    //     fetch('http://localhost:5000/api/v1/users', requestOptions)
    //         .then(response => response.json())
    //         .then(data => console.log("data = ", data));
    //     // addUser(newUser);
    //     history.push("/");
    }
    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {

        console.log("file = ", file)
        if (!file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const onSelectFile = e => {
        console.log("In on select file=========")
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    return (
        <Fragment>
            <div className="w-full max-w-sm container mt-20 mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                            First Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={first_name} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter first name" />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                            Last Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={last_name} onChange={(e) => setLstName(e.target.value)} type="text" placeholder="Enter last name" />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                            Image
                        </label>
                        {file && <img src={preview} />}

                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={image} onChange={onSelectFile} type="file" placeholder="Upload image" />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={gender} onChange={(e) => setGender(e.target.value)} type="text" placeholder="Enter gender" />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter email" />
                    </div>
                    <div className="w-full mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                            Mobile No
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Enter phone" />
                    </div>

                    {/* <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline" value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder="Enter location" />
                    </div>
                    <div className="w-full  mb-5">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="designation">
                            Designation
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={designation} onChange={(e) => setDesignation(e.target.value)} type="text" placeholder="Enter designation" />
                    </div> */}
                    <div className="flex items-center justify-between">
                        <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add User
                        </button>
                    </div>
                    <div className="text-center mt-4 text-gray-500"><Link to='/'>Cancel</Link></div>
                </form>
            </div>
        </Fragment>
    )
}