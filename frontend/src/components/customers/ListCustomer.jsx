import React, { useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { Modal, Button } from 'antd';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ReactPaginate from 'react-paginate';
import Navbar from '../Navbar';
import { useAuth } from '../../utls/auth';
//play sound
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

const ListCustomer = () => {
  const auth = useAuth();
  const [customer, setCustomer] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  // query client
  const queryClient = useQueryClient();

  // open modal function
  const showModal = () => {
    setOpen(true);
  };

  // open modal function
  const showModalUpdate = () => {
    setOpenUpdate(true);
  };

  // handle close update
  const onCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // handle close
  const onClose = () => {
    setOpen(false);
    setId('');
    setLoading(false);
  };

  // fetch data
  const fetchAllCustomers = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/customers?search=${keyword}&page=${page}&limit=${limit}`
    );
    return data;
  };

  const { data } = useQuery(
    ['getCustomers', keyword, page, limit],
    fetchAllCustomers
  );
  // console.log(data);

  const handleDelete = async () => {
    try {
      if (id !== '') {
        setLoading(true);
        const res = await axios.delete(
          `http://localhost:3001/api/customers/${id}`
        );
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

  useEffect(() => {
    if (data) {
      data.result.shift();
      setCustomer(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows);
    }
    fetchAllCustomers();
  }, [data]);

  // on change page change function
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  // handle delete mutation
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      if (customer.length - 1 === 0) {
        setPage(page - 1);
      }
      queryClient.invalidateQueries(['getCustomers']);
    },
  });

  //console.log(id);

  // update customer
  const [cus, setCus] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  console.log(cus);

  // find one of customer
  const fetchOne = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/customers/${id}`);
      //console.log(res.data[0]);
      setCus({
        customerName: res.data[0].customerName,
        phoneNumber: res.data[0].phoneNumber,
        email: res.data[0].email,
        address: res.data[0].address,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // handle change
  const handleChange = (e) => {
    setCus((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      if (id !== '') {
        const res = await axios.put(
          `http://localhost:3001/api/customers/${id}`,
          cus
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
      queryClient.invalidateQueries(['getCustomers']);
    },
  });

  return (
    <>
      <div className="h-screen overflow-auto bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-3 text-left">បញ្ជីអតិថិជន</h1>
          <div className="w-full h-1 bg-blue-400 shadow-sm mb-5"></div>
          <div className="flex justify-between mb-3">
            <div className="flex">
              {auth.isAdmin && (
                <Link to="/addcustomer">
                  <button className="hidden md:block ml-1 px-6 py-1.5 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
                    បន្ថែម
                  </button>
                </Link>
              )}

              <div className="ml-5">
                <span className="text-bold">Show</span>
                <select
                  className=" border bg-transparent rounded-sm ml-2 mr-2 outline-none px-3 shadow py-[2px]"
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}>
                  <option value={10}>10</option>
                  <option value={5}>5</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>Entities</span>
              </div>
            </div>
            <input
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2.5 hover:shadow mr-2"
              placeholder="ឈ្មោះអតិថិជន"
              type="text"
              style={{ width: '18rem' }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
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
                    ឈ្មោះអតិថិជន
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    លេខទូរស័ព្ទ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    អុីមែល
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
                  customer.map((item, index) => {
                    return (
                      <tr
                        className="text-center bg-white border-b-2 border-gray-100"
                        key={index + 1}>
                        <td className="p-3 text-sm text-blue-400 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.customerName}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.phoneNumber}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.address}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <>
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
                                className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                                onClick={() => {
                                  showModal();
                                  setId(item.id);
                                }}>
                                <AiTwotoneDelete size={20} />
                              </button>
                            ) : (
                              <button
                                disabled={auth.isAdmin ? false : true}
                                className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-slate-400 bg-slate-300 hover:shadow"
                                onClick={() => {
                                  showModal();
                                  setId(item.id);
                                }}>
                                <AiTwotoneDelete size={20} />
                              </button>
                            )}
                          </>
                        </td>
                      </tr>
                    );
                  })}

                {/* delete customer modal */}
                <Modal
                  title="លុបអតិថិជន"
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
                    អតិថិជន និងត្រូវលុបចេញពីប្រព័ន្ធ?
                  </h1>
                </Modal>

                {/* update customer */}
                <Modal
                  open={openUpdate}
                  onCancel={onCloseUpdate}
                  title="កែប្រែអតិថិជន"
                  width={900}
                  className="modal-fonts"
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
                        ឈ្មោះអតិថិជន<span className="text-red-500">*</span>
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
                        id="customerName"
                        name="customerName"
                        type={'text'}
                        onChange={handleChange}
                        value={cus.customerName}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="text"
                        className="form-label inline-block text-gray-700 mt-5 text-sm mb-2">
                        លេខទូរសព្ទ<span className="text-red-500">*</span>
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
                        id="phoneNumber"
                        name="phoneNumber"
                        type={'text'}
                        onChange={handleChange}
                        value={cus.phoneNumber}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="roles"
                        className="block mb-2 text-sm font-medium text-gray-900 ">
                        អ៊ីមែល
                      </label>
                      <input
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
                        onChange={handleChange}
                        value={cus.email}
                      />
                    </div>
                    <div className="mt-4 mb-5">
                      <div className="">
                        <label
                          htmlFor="comfirmPassword"
                          className="block mb-2 text-sm font-medium text-gray-900 ">
                          អាសយដ្ឋាន
                        </label>
                        <textarea
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
                          placeholder="អាសយដ្ឋាន
                          "
                          onChange={handleChange}
                          value={cus.address}></textarea>
                      </div>
                    </div>
                  </div>
                  {/* ========= end of content ==== */}
                </Modal>
                {/* end of update customer model */}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          <p className="my-3 text-xs text-gray-500">{`ជួរដេកសរុប : ${rows} ទំព័រ: ${
            rows ? page : 1
          } នែ ${pages}`}</p>
          <nav role="navigation" aria-label="pagination" key={rows}>
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pages}
              onPageChange={changePage}
              containerClassName={'flex my-3'}
              pageLinkClassName={'border text-gray-600 px-3 border-gray-400'}
              previousLinkClassName={
                'border mr-3 px-2 text-gray-600 border-gray-400'
              }
              nextLinkClassName={
                'border ml-3 px-2 text-gray-600 border-gray-400'
              }
              activeLinkClassName={'bg-blue-500 border border-gray-400'}
              disabledLinkClassName={
                'text-gray-300 cursor-auto border-gray-300 border'
              }
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default ListCustomer;
