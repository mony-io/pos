import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { BsPencilSquare } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ReactPaginate from 'react-paginate';
import { useAuth } from '../../utls/auth';

//play sound
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

const ListSupplier = () => {
  const [supplier, setSupplier] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  // open modal function
  const showModal = () => {
    setOpen(true);
  };

  // handle close
  const onClose = () => {
    setOpen(false);
    setId('');
    setLoading(false);
  };

  // query client
  const queryClient = useQueryClient();

  // fetch data
  const fetchAllSuppliers = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/supplier?search=${keyword}&page=${page}&limit=${limit}`
    );
    return data;
  };

  const { data } = useQuery(
    ['getSuppliers', keyword, page, limit],
    fetchAllSuppliers
  );
  console.log(data);

  useEffect(() => {
    if (data) {
      data.result;
      setSupplier(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows);
    }
    fetchAllSuppliers();
  }, [data]);

  const handleDelete = async () => {
    try {
      if (id !== '') {
        setLoading(true);
        const res = await axios.delete(`http://localhost:3001/supplier/${id}`);
        if (res.data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`🦄 ${res.data.message}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setOpen(false);
          setLoading(false);
        } else {
          toast.error('🦄 Delete failed!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setOpen(false);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // on change page change function
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  // handle delete mutation
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      if (supplier.length - 1 === 0) {
        setPage(page - 1);
      }
      queryClient.invalidateQueries(['getSuppliers']);
    },
  });

  // open modal function
  const showModalUpdate = () => {
    setOpenUpdate(true);
  };

  // handle close update
  const onCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // find one of customer
  const fetchOne = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/supplier/${id}`);
      //console.log(res.data[0]);
      setSup({
        supName: res.data[0].supName,
        companyName: res.data[0].companyName,
        email: res.data[0].email,
        phone: res.data[0].phone,
        address: res.data[0].address,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const [sup, setSup] = useState({
    supName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleUpdate = async () => {
    try {
      if (id !== '') {
        const res = await axios.put(
          `http://localhost:3001/supplier/${id}`,
          sup
        );
        console.log(res);
        if (res.data.success) {
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
          setId('');
          setOpenUpdate(false);
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
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // mutation for update
  const updateMutation = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries(['getSuppliers']);
    },
  });

  // handle change
  const handleChange = (e) => {
    setSup((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="h-screen overflow-auto bg-gray-100 flex-1">
      <Navbar />
      <div className="p-5">
        <h1 className="text-xl mb-3 text-left">បញ្ជីអ្នកផ្គត់ផ្គង់</h1>
        <div className="w-full h-1 bg-blue-400 shadow-sm mb-5"></div>
        <div className="flex justify-between mb-3">
          <div className="flex">
            {auth.isAdmin && (
              <Link to="/addsup">
                <button className="hidden md:block ml-1 mr-3 px-6 py-1.5 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
                  បន្ថែម
                </button>
              </Link>
            )}
            <div>
              Show
              <select
                className=" border bg-transparent rounded-sm ml-2 mr-2 outline-none px-3 shadow-sm py-[2px]"
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                value={limit}>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              Entities
            </div>
          </div>
          <input
            className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2.5 hover:shadow mr-2"
            placeholder="ឈ្មោះអ្នកផ្គត់ផ្គង់"
            type="text"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            style={{ width: '20rem' }}
          />
        </div>
        <div className="rounded-sm overflow-auto h-[600px] shadow-sm">
          <table className="w-full table-auto">
            <thead className="bg-blue-100 border-gray-200">
              <tr className="border-b-2 border-gray-100">
                <th className="p-3 text-md font-semibold tracking-wide text-center">
                  №
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  ឈ្មោះអ្នកផ្គត់ផ្គង់
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  ឈ្មោះក្រុមហ៊ុន
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  អុីមែល
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  លេខទូរស័ព្ទ
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  អាសយដ្ឋាន
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">
                  ប្រតិបត្តិការ
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                supplier.map((item, index) => {
                  return (
                    <tr
                      className="text-center bg-white border-b-2 border-gray-100"
                      key={index}>
                      <td className="p-3 text-sm text-blue-500 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.supName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.companyName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.phone}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.address}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {auth.isAdmin ? (
                          <button
                            onClick={async () => {
                              await fetchOne(item.id);
                              setId(item.id);
                              showModalUpdate(false);
                            }}
                            disabled={auth.isAdmin ? false : true}
                            className="mx-2 px-3 py-1.5 rounded-sm font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow">
                            <BsPencilSquare size={20} />
                          </button>
                        ) : (
                          <button
                            onClick={async () => {
                              await fetchOne(item.id);
                              setId(item.id);
                              showModalUpdate(false);
                            }}
                            disabled={auth.isAdmin ? false : true}
                            className="mx-2 px-3 py-1.5 rounded-sm font-medium tracking-wider text-slate-400 bg-slate-300 hover:shadow">
                            <BsPencilSquare size={20} />
                          </button>
                        )}
                        {auth.isAdmin ? (
                          <button
                            disabled={auth.isAdmin ? false : true}
                            onClick={() => {
                              showModal();
                              setId(item.id);
                            }}
                            className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-red-600 bg-red-200 hover:shadow">
                            <AiTwotoneDelete size={20} />
                          </button>
                        ) : (
                          <button
                            disabled={auth.isAdmin ? false : true}
                            onClick={() => {
                              showModal();
                              setId(item.id);
                            }}
                            className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-slate-400 bg-slate-300 hover:shadow">
                            <AiTwotoneDelete size={20} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

              {/* delete customer modal */}
              <Modal
                title="លុបអ្នកប្រើប្រាស់"
                className="modal-fonts"
                open={open}
                onCancel={onClose}
                footer={[
                  <Button
                    key="cancel"
                    type="button"
                    className="bg-red-500 text-white leading-tight rounded-sm shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
                    onClick={onClose}>
                    បោះបង់
                  </Button>,
                  <Button
                    key="submit"
                    loading={loading}
                    onClick={deleteMutaion.mutate}
                    type="button"
                    className="bg-blue-600 text-white text-md leading-tight rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                    យល់ព្រម
                  </Button>,
                ]}>
                <h1 className="text-lg text-center p-10">
                  អ្នកផ្គត់ផ្គង់ និងត្រូវលុបចេញពីប្រព័ន្ធ?
                </h1>
              </Modal>

              {/* update customer */}
              <Modal
                open={openUpdate}
                onCancel={onCloseUpdate}
                title="កែប្រែអ្នកផ្គត់ផ្គង់"
                width={900}
                className="modal-fonts font-bold"
                footer={[
                  <Button
                    onClick={onCloseUpdate}
                    key="cancel"
                    type="button"
                    className="bg-red-500 text-white leading-tight rounded-sm shadow-sm hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md">
                    បោះបង់
                  </Button>,
                  <Button
                    onClick={updateMutation.mutate}
                    key="submit"
                    type="button"
                    className="bg-blue-600 text-white text-md leading-tight rounded-sm shadow-sm hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                    កែប្រែ
                  </Button>,
                ]}>
                {/* ======== content ======== */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-4">
                    <label
                      htmlFor="username"
                      className="form-label inline-block text-gray-700 mt-5 text-sm mb-2">
                      ឈ្មោះអ្នកផ្គត់ផ្គង់<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded-sm
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder=""
                      id="supName"
                      name="supName"
                      type={'text'}
                      onChange={handleChange}
                      value={sup.supName}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="username"
                      className="form-label inline-block text-gray-700 mt-5 text-sm mb-2">
                      ឈ្មោះក្រុមហ៊ុន
                    </label>
                    <input
                      className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded-sm
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder=""
                      id="companyName"
                      name="companyName"
                      type={'text'}
                      onChange={handleChange}
                      value={sup.companyName}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="text"
                      className="form-label inline-block text-gray-700 text-sm mb-2">
                      អុីមែល
                    </label>
                    <input
                      className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded-sm
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder=""
                      id="email"
                      name="email"
                      type={'text'}
                      onChange={handleChange}
                      value={sup.email}
                    />
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="roles"
                      className="form-label inline-block text-gray-700 text-sm mb-2">
                      លេខទូរស័ព្ទ<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2
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
                      onChange={handleChange}
                      value={sup.phone}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="">
                      <label
                        htmlFor="comfirmPassword"
                        className="form-label inline-block text-gray-700 text-sm mb-2">
                        អាសយដ្ឋាន
                      </label>
                      <textarea
                        type="text"
                        id="address"
                        name="address"
                        className="h-28 p-3 w-full nt-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  rounded-sm
                  transition
                  ease-in-out
                  m-0
                  border border-solid border-gray-300 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="អាសយដ្ឋាន
                          "
                        onChange={handleChange}
                        value={sup.address}></textarea>
                    </div>
                  </div>
                </div>
                {/* ========= end of content ==== */}
              </Modal>
              {/* end of update customer model */}
            </tbody>
          </table>
        </div>
        <p className="my-3 text-xs text-gray-500">{`ជួរដេកសរុប : ${
          data && data.totalRows
        } ទំព័រ: ${data && data.totalRows ? data && data.page : 1} នែ ${
          data && data.totalPage
        }`}</p>
        <nav
          role="navigation"
          aria-label="pagination"
          key={data && data.totalRows}>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={data && data.totalPage}
            onPageChange={changePage}
            containerClassName={'flex my-3'}
            pageLinkClassName={'border text-gray-600 px-3 border-gray-400'}
            previousLinkClassName={
              'border mr-3 px-2 text-gray-800 border-gray-400'
            }
            nextLinkClassName={'border ml-3 px-2 text-gray-800 border-gray-400'}
            activeLinkClassName={'bg-blue-500 border border-gray-400'}
            disabledLinkClassName={
              'text-gray-300 cursor-auto border-gray-300 border'
            }
          />
        </nav>
      </div>
    </div>
  );
};

export default ListSupplier;
