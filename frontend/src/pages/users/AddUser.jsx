import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// =========== fetch user role function ============
const fetchRoles = async () => {
  const { data } = await axios.get('http://localhost:3001/api/roles');
  return data;
};

// email validate
//const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regUsername = /^[a-zA-Z]{3,}.*/
// fetch status from api
const fetchStatus = async () => {
  const { data } = await axios.get('http://localhost:3001/status');
  return data;
};

const Adduser = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');

  // confirm message
  // const [confirmMsg, setConfirmMsg] = useState('')

  const showPassword = (e) => {
    setIsHidden(!isHidden);
  };

  // =============== useRef ==============
  const usernameRef = useRef();
  const pwdRef = useRef();

  // message
  const [userMsg, setUserMsg] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [roleMsg, setRoleMsg] = useState('');
  const [comfirmPwdMsg,setComfirmMsgPwd] = useState('');

  //  if password match or valid hook
  const [valid,setIsValid] = useState(false)
  const [isValidUsername,setIsValidUsername] = useState(false);

  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: '',
    role_id: '',
    status_id: 1,
    confirmPwd: '',
  });

 // console.log(valid)

  // clear data function
  const clear_data = () => {
    setUser({
      username: '',
      password: '',
      email: '',
      phone_number: '',
      role_id: '',
      confirmPwd: '',
      status_id:1
    });
    setIsValid(false)
    setUserMsg('');
    setPwdMsg('');
    setRoleMsg('');
    setEmailMsg('');
    setComfirmMsgPwd('')

    usernameRef.current?.focus();
  };

  // function work when something chnage in input field
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // fetch user role data
  const { data } = useQuery('roles', fetchRoles);

  // fetch status
  const res = useQuery('status', fetchStatus);

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  // ====
  const handleSubmit = async () => {
    try {
      if (user.username === '') {
        setUserMsg('សូម! បញ្ចូលឈ្មេាះគណនី');
        usernameRef.current?.focus();
      } else if (user.password === '') {
        setPwdMsg('សូម! បញ្ជូលពាក្យសម្ងាត់');
        pwdRef.current?.focus();
      }else if(user.confirmPwd===''){
        setComfirmMsgPwd('សូម! ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់')
      } else if (user.role_id === '') {
        setRoleMsg('សូម! ជ្រើសរើសតួនាទីអ្នកប្រើប្រាស់');
      } else {
        if(valid && isValidUsername){
        const res = await axios.post('http://localhost:3001/api/user', user);
        if (res.data.success) {
          clear_data();
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`${res.data.message}`, {
            position: 'top-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        } else {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.error(`${res.data.message}`, {
            position: 'top-center',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          clear_data();
        }
      }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <div className="h-screen overflow-auto bg-gray-100 flex-1">
      <Navbar />
      <div className="p-5 mt-5">
        <h1 className="text-xl mb-4 text-left">បន្ថែមអ្នកប្រើប្រាស់</h1>
        <div className="w-full h-1 bg-blue-400 mb-3 shadow-sm"></div>
        <h2 className="text-md ml-3">សូមបញ្ជូលពត៍មានខាងក្រោម</h2>
        <div className="grid grid-cols-4 gap-4 mt-7">
          <div className="col-span-2 px-9">
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                ឈ្មោះ​គណនី <span className='text-red-500'>*</span>
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.code === 'Space') {
                    e.preventDefault();
                  }
                }}
                onKeyUp={
                  ()=>{
                    if(user.username!==''){
                      if(regUsername.test(user.username)){
                        setUserMsg('')
                        setIsValidUsername(true)
                      }else{
                        setUserMsg('បញ្ជាក់! ឈ្មោះត្រូវចាប់ផ្ដើមចាប់ពី ៣តួអក្សរឡើងទៅ')
                        setIsValidUsername(false)
                      }
                    }else{
                      setIsValidUsername(false)
                    }
                  }
                }
                onChange={handleChange}
                value={user.username}
                ref={usernameRef}
                type="text"
                id="username"
                name="username"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded-sm
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                placeholder=""
              />
              {userMsg && (
                <span className="text-red-500 text-sm">{userMsg}</span>
              )}
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900">
                ពាក្យសម្ងាត់<span className='text-red-500'>*</span>
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.code === 'Space') {
                    e.preventDefault();
                  }
                }}
                onKeyUp={()=>{
                  if(user.password===''){
                    setPwdMsg('សូម! បញ្ចូលពាក្យសម្ងាត់')
                  }else if(user.password!=="" && user.password.length<4){
                    setPwdMsg('បញ្ជាក់! ពាក្យសម្ងាត់ត្រូវចាប់ពី ៤ខ្ទង់ឡើងទៅ')
                  }else{
                    setPwdMsg('');
                    if(password!==comfirmPwdMsg){
                      setIsValid(false)
                    }
                  }
                }}
                onChange={handleChange}
                ref={pwdRef}
                value={user.password}
                type={isHidden ? 'text' : 'password'}
                id="password"
                name="password"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded-sm
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                placeholder=""
              />
              {pwdMsg && <span className="text-red-500 text-sm">{pwdMsg}</span>}
              <span
                onClick={showPassword}
                className="cursor-pointer -mt-8 right-0 mr-2 absolute">
                {!isHidden ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPwd"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់<span className='text-red-500'>*</span>
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.code === 'Space') {
                    e.preventDefault();
                  }
                  
                }}
                onKeyUp = {()=>{
                  if(user.confirmPwd===''){
                    setComfirmMsgPwd('សូម! ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់')
                  }else if(user.password!=='' && user.confirmPwd!==''){
                    if(user.password!==user.confirmPwd){
                      setComfirmMsgPwd('ពាក្យសម្ងាត់មិនផ្ទៀងផ្ទាត់!')
                      setIsValid(false)
                    }else{
                      setIsValid(true)
                      setComfirmMsgPwd('')
                    }
                  }
                }}
                onChange={handleChange}
                value={user.confirmPwd}
                type={isHidden ? 'text' : 'password'}
                id="confirmPwd"
                name="confirmPwd"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded-sm
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                placeholder=""
              />
              {comfirmPwdMsg && <span className="text-red-500 text-sm">{comfirmPwdMsg}</span>}
              <span
                onClick={showPassword}
                className="cursor-pointer absolute -mt-8 right-0 mr-2">
                {!isHidden ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
            <div className="mb-6">
              <label
                htmlFor="roles"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                ប្រភេទអ្នកប្រើប្រាស់<span className='text-red-500'>*</span>
              </label>
              <select
                onChange={(e)=>{
                  handleChange(e);
                  setRoleMsg('')
                }}
                id="rolse"
                name="role_id"
                value={user.role_id}
                className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded-sm
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example">
                <option className="text-sm">ជ្រើសរើសតួនាទី</option>
                {data &&
                  data.map((item, index) => {
                    return (
                      <option value={item.role_id} key={index + 1}>
                        {item.role_name}
                      </option>
                    );
                  })}
              </select>
              {roleMsg && (
                <span className="text-red-500 text-sm">{roleMsg}</span>
              )}
            </div>
          </div>
          <div className="col-span-2 px-9">
            <div className="mb-6">
              <label
                htmlFor="status_id"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                ស្ថានភាព
              </label>
              <select
                onChange={handleChange}
                id="status_id"
                name="status_id"
                value={user.status_id}
                className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded-sm
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Default select example">
                {res.data &&
                  res.data.map((item, index) => {
                    return (
                      <option value={item.id} key={index + 1}>
                        {item.status}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                លេខទូរស័ព្ទ
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="phone_number"
                name="phone_number"
                value={user.phone_number}
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded-sm
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 ">
                អុីមែល
              </label>
              <input
                onChange={handleChange}
                // onKeyUp={(e) => {
                //   if (regEmail.test(user.email)) {
                //     setEmailMsg('');
                //   } else {
                //     setEmailMsg('សូមមេត្តាបញ្ជូលអីមែលអោយបានត្រឺមត្រូវ!');
                //   }
                //   if (user.email === '') {
                //     setEmailMsg('');
                //   }
                // }}
                onKeyDown={(e) => {
                  if (e.code === 'Space') {
                    e.preventDefault();
                  }
                  
                }}
                type="email"
                id="email"
                value={user.email}
                name="email"
                className="
                form-control
                block
                w-full
                px-3
                py-2.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded-sm
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              />
              {emailMsg && (
                <span className="text-red-500 text-sm">{emailMsg}</span>
              )}
            </div>
            <div className="mt-[54px]">
              <button
                onClick={clear_data}
                type="submit"
                className="text-white bg-red-700 mr-4 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:focus:ring-red-800">
                សម្អាត
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                បញ្ជូន
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adduser;
