import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {



    const passref = useRef()
    const ref = useRef()

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        if (ref.current.src.includes("icons/dont_show.png")) {
            ref.current.src = "icons/show.png"
            passref.current.type = "password"
        }
        else {
            ref.current.src = "icons/dont_show.png"
            passref.current.type = "text"
        }
    }

    const savePassword = () => {

        if (form.site[0].length > 3 && form.username[0].length > 3 && form.password[0].length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, { ...form, id: uuidv4() }])
            setform({ site: "", username: "", password: "" })
            setIsSaved(true);

            // Hide the "saved" message after 5 seconds
            setTimeout(() => {
                setIsSaved(false);
            }, 3000);

        }


        else {
            toast.warn("invalid credentials!!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "dark",
            })
        }


    }





    const deletePassword = async (id) => {
        let con = await confirm("Do you really want to delete ?")
        if (con) {
            console.log("deleting password with id : " + id)
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            // toast("Deleted", {
            //     position: "bottom-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "dark",
            // })
        }

    }

    const editPassword = (id) => {
        console.log("editing password with id : " + id)
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    const copyText = (text) => {
        toast.success(`"${text}"  Copied to clipboard `, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }
    return (

        <>

            <ToastContainer
                position="bottom-rigth"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-3 md:mycontainer min-h-[88.2vh]">

                <h1 className='text-4xl font-bold text-center'><span className="text-green-500"> &lt;</span>
                    Pass
                    <span className="text-green-500">AK/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>

                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" placeholder="Enter website URL" type="text" value={form.site} name="site" id="url" />
                    <div className="flex flex-col md:flex-row  w-full justify-between gap-8">
                        <input onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" placeholder="Enter Username" type="text" value={form.username} name="username" id="username" />

                        <div className="relative">
                            <form >
                                <input ref={passref} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" placeholder="Enter Password" type="password" value={form.password} name="password" id="password" autoComplete="new-password" />
                                <span className="absolute right-1 top-[1px] cursor-pointer" onClick={showPassword}>
                                    <img ref={ref} className="p-1 " width={30} src="icons/show.png" alt="show" />
                                </span>
                            </form>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex w-fit justify-center items-center bg-green-400  hover:bg-green-300 rounded-full px-6 py-1 gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                    {isSaved && <p className='font-semibold mt-[-25px]'> &#9989; Saved successfully</p>}



                </div>


                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Saved Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-1">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100 '>

                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>

                                        <td className='py-2 border border-white text-center  gap-3'>
                                            <div className="flex justify-center items-center">
                                                <a href={item.site} target="_blank" ><span>{item.site}</span></a>
                                                <div className="cursor-pointer size-7 " onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xljvqlng.json"
                                                        trigger="hover"
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>



                                        <td className='py-2 border border-white text-center  gap-3'>
                                            <div className="flex justify-center items-center">
                                                <span>{item.username}</span>
                                                <div className="cursor-pointer size-7" onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xljvqlng.json"
                                                        trigger="hover"
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>



                                        <td className='py-2 border border-white text-center gap-3'>
                                            <div className="flex justify-center items-center">
                                                <span>{item.password}</span>
                                                <div className="cursor-pointer size-7" onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/xljvqlng.json"
                                                        trigger="hover"
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>


                                        <td className='py-2 border border-white text-center gap-3'>
                                            <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/oqaajvyl.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#000000,secondary:#000000"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>

                                })}


                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
