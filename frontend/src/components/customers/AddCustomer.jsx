import Navbar from '../Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  // message
  const [msg, setMsg] = useState('');
  const [pnMsg, setPnMsg] = useState('');

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  // clear function
  function clearData() {
    setCustomer({ customerName: '', phoneNumber: '', email: '', address: '' });
    setMsg('');
    setPnMsg('');
  }

  const createCustomer = async () => {
    try {
      if (customer.customerName === '') {
        setMsg('សូម! បញ្ចូលឈ្មោះអតិថិជន');
      } else if (customer.phoneNumber === '') {
        setPnMsg('សូម! បញ្ចូលលេខទូរស័ព្ទ');
      } else {
        const res = await axios.post(
          'http://localhost:3001/api/customer',
          customer
        );
        if (res.data.success) {
          clearData();
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
          // clearData();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function work when something chnage in input field
  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(handleChange);

  return (
    <>
      <div className="h-screen overflow-auto bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5 mt-5">
          <h1 className="text-xl mb-4 text-left">បន្ថែមអតិថិជន</h1>
          <div className="w-full h-1 bg-blue-400 mb-3 shadow-sm"></div>
          <h2 className="ml-3 text-lg">សូមបញ្ជូលពត៍មានខាងក្រោម</h2>
          <div className="grid grid-cols-4 gap-4 mt-7">
            <div className="col-span-2 px-9">
              <div className="mb-6">
                <label
                  htmlFor="customer"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  ឈ្មោះអតិថិជន<span className="text-red-500">*</span>
                </label>
                <input
                  onChange={handleChange}
                  value={customer.customerName}
                  onKeyDown={(e) => {
                    if (e.code === 'Space') {
                      e.preventDefault();
                    }
                  }}
                  type="text"
                  id="customerName"
                  name="customerName"
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
                  placeholder="ឈ្មោះអតិថិជន"
                />
                {msg && <span className="text-red-500 text-xs">{msg}</span>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  លេខទូរសព្ទ<span className="text-red-500">*</span>
                </label>
                <input
                  onKeyDown={(e) => {
                    if (e.code === 'Space') {
                      e.preventDefault();
                    }
                  }}
                  onChange={handleChange}
                  value={customer.phoneNumber}
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
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
                  placeholder="លេខទូរស័ទ្ទ"
                />
                {pnMsg && <span className="text-red-500 text-xs">{pnMsg}</span>}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="comfirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  អ៊ីមែល
                </label>
                <input
                  onChange={handleChange}
                  value={customer.email}
                  onKeyDown={(e) => {
                    if (e.code === 'Space') {
                      e.preventDefault();
                    }
                  }}
                  type="email"
                  id="email"
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
                  placeholder="អីម៉េល"
                />
              </div>
            </div>
            <div className="col-span-2 px-9">
              <div className="">
                <label
                  htmlFor="comfirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  អាសយដ្ឋាន
                </label>
                <textarea
                  onChange={handleChange}
                  value={customer.address}
                  onKeyDown={(e) => {
                    if (e.code === 'Space') {
                      e.preventDefault();
                    }
                  }}
                  type="text"
                  id="address"
                  name="address"
                  className="h-36 p-3 w-full nt-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  rounded-sm
                  transition
                  ease-in-out
                  m-0
                  border border-solid border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="អាសយដ្ឋាន"></textarea>
              </div>
              <div className="mt-[52px]">
                <button
                  onClick={clearData}
                  type="submit"
                  className="text-white bg-red-700 mr-4 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:focus:ring-red-800">
                  សម្អាត
                </button>
                <button
                  onClick={createCustomer}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                  បញ្ជូន
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
