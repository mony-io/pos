import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Spin, Space } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingOutlined } from '@ant-design/icons';
import logo from '../assets/pss.png';

const NewPassword = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;
  const [spin, setSpin] = useState(false);
  const [loading, setLoading] = useState(false);

  const pwdRef = useRef(null);
  const cpwdRef = useRef(null);

  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');

  const [msg, setMsg] = useState('');
  const [disable, setDisable] = useState(false);

  const [validPwd, setValidPwd] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  //console.log(location.pathname.split("/"));
  const userid = location.pathname.split('/')[2];
  const token = location.pathname.split('/')[3];

  const PWD_REX = /^(?=.*).{4,}$/;

  //   const pageNotfound = () => {
  //     setTimeout(() => {
  //       navigate('*');
  //     }, 7500);
  //   };

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }
  // validate user
  const userValidate = async () => {
    const res = await axios.get(
      `http://localhost:3001/forgotpassword/${userid}/${token}`
    );
    setLoading(true);
    pwdRef.current?.focus();
    //console.log(res);
    if (res.data.success === false) {
      navigate('*');
    }
  };

  const handleClicked = async () => {
    try {
      if (password === '') {
        setMsg('សូម! បញ្ចូលពាក្យសម្ងាត់');
        pwdRef.current?.focus();
      } else if (comfirmPassword === '') {
        setMsg('សូម! ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់');
        cpwdRef.current?.focus();
      } else {
        if (validPwd) {
          setSpin(true);
          const res = await axios.put(
            `http://localhost:3001/forgotpassword/${userid}/${token}`,
            { password: password }
          );
          //console.log(res.data)
          if (res.data.success) {
            setPassword('');
            setComfirmPassword('');
            setDisable(true);
            playAudio(
              'http://localhost:3001/audio/audio-notification-sound.mp3'
            );
            toast.success(`🦄 ${res.data.message}.`, {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
            // pageNotfound();
            navigate('/login');
          } else {
            playAudio(
              'http://localhost:3001/audio/audio-notification-sound.mp3'
            );
            toast.error(`🦄 ${res.data.message}`, {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
          }
          setSpin(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      userValidate();
    }, 3000);
  }, []);

  //console.log(msg)
  return (
    <>
      {loading ? (
        <section className="bg-gray-100 w-full h-screen absolute top-0">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-[#fff] rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <img src={logo} className="h-[80px] rounded-full m-auto object-cover w-[80px]" alt="" />
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      ពាក្យសម្ងាត់​ថ្មី
                    </label>
                    <input
                      disabled={disable}
                      ref={pwdRef}
                      type="password"
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                      placeholder="••••••••"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password.trim()}
                      onKeyUp={() => {
                        if (PWD_REX.test(password)) {
                          setMsg('');
                          if (password !== '' && comfirmPassword !== '') {
                            if (password.trim() !== comfirmPassword.trim()) {
                              setMsg('ពាក្យ​សម្ងាត់​មិន​ត្រូវ​គ្នា!');
                            } else {
                              setMsg('');
                              setValidPwd(true);
                            }
                          } else if (
                            password === '' &&
                            comfirmPassword === ''
                          ) {
                            setMsg('');
                            setValidPwd(false);
                          }
                        } else {
                          setMsg(
                            'បញ្ជាក់! ពាក្យសម្ងាត់ត្រូវតែស្មើឬធំជាង4តួអក្សរ'
                          );
                        }
                      }}
                      // required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comfirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900">
                      ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់
                    </label>
                    <input
                      disabled={disable}
                      ref={cpwdRef}
                      type="password"
                      name="comfirmPassword"
                      id="comfirmPassword"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                      onChange={(e) => {
                        setComfirmPassword(e.target.value);
                      }}
                      onKeyUp={() => {
                        if (PWD_REX.test(comfirmPassword)) {
                          setMsg('');
                          if (password !== '' && comfirmPassword !== '') {
                            if (password.trim() !== comfirmPassword.trim()) {
                              setMsg('ពាក្យ​សម្ងាត់​មិន​ត្រូវ​គ្នា!');
                            } else {
                              setValidPwd(true);
                              setMsg('');
                            }
                          } else if (
                            password === '' &&
                            comfirmPassword === ''
                          ) {
                            setMsg('');
                            setValidPwd(false);
                          }
                        } else {
                          setValidPwd(false);
                          setMsg(
                            'បញ្ជាក់! ពាក្យសម្ងាត់ត្រូវតែស្មើឬធំជាង4តួអក្សរ'
                          );
                        }
                      }}
                      value={comfirmPassword.trim()}
                      // required=""
                    />
                    <span className="text-red-500 text-sm">{msg}</span>
                  </div>
                  <button
                    onClick={handleClicked}
                    type="button"
                    className="w-full text-md text-[#fff] bg-blue-500 hover:bg-blue-400 p-3 rounded">
                    {spin ? (
                      <span>
                        <Spin indicator={antIcon} className="text-blue-100" />{' '}
                        Loading...
                      </span>
                    ) : (
                      'បញ្ជូន'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* toast message */}
          <ToastContainer />
        </section>
      ) : (
        <div className="bg-[#ddd] w-full h-screen absolute top-0">
          <Space className="flex justify-center items-center h-screen bg-slate-50">
            <Spin tip="Loading..." size="large">
              <div className="mr-12" />
            </Spin>
          </Space>
        </div>
      )}
    </>
  );
};

export default NewPassword;
