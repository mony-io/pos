import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ReactPaginate from 'react-paginate';
import Navbar from '../components/Navbar';

//play sound
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState({
    id: '',
    categoryName: '',
    desc: '',
  });

  const [msg, setMsg] = useState('');
  const [colorStyle, setColorStle] = useState('');

  // query client
  const queryClient = useQueryClient();

  // clear function
  function clearData() {
    setCategory({ categoryName: '', desc: '', id: '' });
    setMsg('');
  }

  const fetchCategories = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/categories?limit=${limit}&page=${page}&search=${keyword}`
    );
    return data;
  };

  const { data } = useQuery(
    ['getCategory', keyword, page, limit],
    fetchCategories
  );

  const handleChange = (e) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // on change page change function
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const createCategory = async () => {
    try {
      if (category.categoryName.trim() !== '') {
        const res = await axios.post(
          'http://localhost:3001/categories',
          category
        );
        // console.log(res)
        if (res.data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          clearData();
          setMsg(res.data.message);
          setColorStle('bg-green-100 text-green-700');
          fetchCategories();
        } else {
          clearData();
          setMsg(res.data.message);
          setColorStle('bg-red-100 text-red-700');
        }
      } else {
        setMsg('សូម! បញ្ចូលឈ្មេាះក្រុមផលិតផល');
        setColorStle('bg-red-100 text-red-700');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle update function
  const handleUpdate = async () => {
    try {
      if (category.categoryName.trim() !== '') {
        const res = await axios.put(
          `http://localhost:3001/categories/${category.id}`,
          category
        );
        if (res.data.success) {
          // playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          clearData();
          setColorStle('bg-green-100 text-green-700');
          setMsg(res.data.message);
          fetchCategories();
        } else {
          clearData();
          setColorStle('bg-red-100 text-red-700');
          setMsg(res.data.message);
        }

        //console.log(res);
      } else {
        setColorStle('bg-red-100 text-red-700');
        setMsg('សូម! បញ្ចូលឈ្មេាះក្រុមផលិតផល');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/categories/${id}`);
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
        fetchCategories();
        clearData();
      } else {
        playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
        toast.error(`🦄 ${res.data.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle delete mutation
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      if (categories.length - 1 === 0) {
        setPage(page - 1);
      }
      queryClient.invalidateQueries(['getCategory']);
    },
  });

  // handle update mutation
  const handleUpdateMutation = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries(['getCategory']);
    },
  });

  // handle add mutation
  const handleCreateMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(['getCategory']);
    },
  });

  useEffect(() => {
    if (data) {
      setCategories(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows);
    }
    fetchCategories();
  }, [data]);

  // React Pagination

  return (
    <>
      <div className="flex-1 h-screen bg-gray-100 overflow-auto">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-4 text-left">ប្រភេទផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-5 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <div className="flex">
              <button
                className="hidden md:block px-5 h-9 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 text-white hover:shadow"
                data-bs-toggle="modal"
                data-bs-target="#addCategory">
                បន្ថែម
              </button>
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
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2 hover:shadow"
              placeholder="ឈ្មោះក្រុមផលិតផល"
              type="text"
              style={{ width: '18rem' }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            {/* add category model */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="addCategory"
              tabIndex="-1"
              aria-labelledby="exampleModalLgLabel"
              aria-modal="true"
              role="dialog"
              onClick={(e) => {
                if (e.target.id === 'addCategory') {
                  clearData();
                }
              }}>
              <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-sm outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-sm">
                    <h5
                      className="text-xl font-medium leading-normal text-gray-800"
                      id="exampleModalLgLabel">
                      បន្ថែមប្រភេទផលិតផល
                    </h5>
                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={clearData}></button>
                  </div>
                  <div className="modal-body relative p-4 mt-5 mb-5">
                    <label
                      htmlFor="unit"
                      className="form-label inline-block mb-2 text-gray-700">
                      ប្រភេទផលិតផល <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="form-control
                      block
                      w-full
                      px-4
                      py-2
                      text-sm
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded-sm
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 
                      focus:bg-white focus:border-blue-600 
                      focus:outline-none"
                      placeholder="ឈ្មោះប្រភេទ"
                      type="text"
                      name="categoryName"
                      onChange={handleChange}
                      value={category.categoryName}
                    />

                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label inline-block mb-2 text-gray-700 mt-5">
                      ការពណ៏នា
                    </label>
                    <textarea
                      className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-sm
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
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="ការពិពណ៌នា"
                      name="desc"
                      onChange={handleChange}
                      value={category.desc}></textarea>
                    {/* ====== alert message ===== */}
                    {msg && (
                      <div
                        className={`rounded-sm py-1 text-center text-base mt-1 ${colorStyle}`}
                        role="alert">
                        {msg}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-sm">
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                      onClick={clearData}>
                      បិទ
                    </button>

                    {/* spin button */}

                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      onClick={handleCreateMutation.mutate}>
                      យល់ព្រម
                    </button>

                    {/* end of spin button */}
                  </div>
                </div>
              </div>
            </div>
            {/* end of add model */}
          </div>
          <div className="rounded-sm shadow-sm overflow-auto mt-4 h-[600px]">
            <table className="w-full table-auto">
              <thead className="bg-blue-100 border-gray-200">
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-md font-semibold tracking-wide text-center">
                    &#8470;
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឈ្មោះប្រភេទ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ការពិពណ៌នា
                  </th>
                  <th>ប្រតិបត្តិការណ៍</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.result.map((item, index) => {
                    // console.log(item.id)
                    return (
                      <tr
                        className="text-center bg-white border-b-2 border-gray-100"
                        key={index + 1}>
                        <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.categoryName}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.desc}
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          <button
                            className="mx-2 px-3 py-1.5 rounded-sm font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#updateCategory"
                            onClick={async () => {
                              try {
                                setMsg('');
                                const res = await axios.get(
                                  `http://localhost:3001/categories/${item.id}`
                                );
                                setCategory(...res.data);
                              } catch (err) {
                                console.log(err);
                              }
                            }}>
                            <BsPencilSquare size={20} />
                          </button>

                          {/* update brand model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="updateCategory"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLgLabel"
                            aria-modal="true"
                            role="dialog">
                            <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-sm outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-sm">
                                  <h5
                                    className="text-xl font-medium leading-normal text-gray-800"
                                    id="updateBrand">
                                    កែប្រែប្រភេទក្រុមផលិតផល
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                                </div>
                                <div className="modal-body relative p-4 mt-5 mb-5 text-left">
                                  <label
                                    htmlFor="unit"
                                    className="form-label inline-block mb-2 text-gray-700">
                                    ប្រភេទផលិតផល{' '}
                                    <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    className="form-control
                                  block
                                  w-full
                                  px-4
                                  py-2
                                  text-sm
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding
                                  border border-solid border-gray-300
                                  rounded-sm
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 
                                  focus:bg-white focus:border-blue-600 
                                  focus:outline-none"
                                    placeholder="ឈ្មោះប្រភេទ"
                                    type="text"
                                    name="categoryName"
                                    value={category.categoryName}
                                    onChange={handleChange}
                                  />
                                  <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label inline-block mb-2 text-gray-700 mt-5">
                                    ការពណ៌នា
                                  </label>
                                  <textarea
                                    className="
                                  form-control
                                  block
                                  w-full
                                  px-3
                                  py-1.5
                                  text-sm
                                  font-normal
                                  text-gray-700
                                  bg-white bg-clip-padding
                                  border border-solid border-gray-300
                                  rounded-sm
                                  transition
                                  ease-in-out
                                  m-0
                                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="ការពណ៌នា"
                                    name="desc"
                                    value={category.desc}
                                    onChange={handleChange}></textarea>

                                  {/* ====== alert message ===== */}
                                  {msg && (
                                    <div
                                      className={`rounded-sm py-1 text-center text-base mt-1 ${colorStyle}`}
                                      role="alert">
                                      {msg}
                                    </div>
                                  )}
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-sm">
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal">
                                    បិទ
                                  </button>

                                  {/* spin button */}

                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    onClick={handleUpdateMutation.mutate}>
                                    យល់ព្រម
                                  </button>
                                  {/* end of spin button */}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end of update model */}

                          <button
                            className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={async () => {
                              try {
                                const res = await axios.get(
                                  `http://localhost:3001/categories/${item.id}`
                                );
                                setCategory(...res.data);
                              } catch (err) {
                                console.log(err);
                              }
                            }}>
                            <AiTwotoneDelete size={20} />
                          </button>

                          {/* delete model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="deleteModal"
                            //tabIndex="-1"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-modal="true"
                            role="dialog">
                            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-sm outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-sm">
                                  <h5
                                    className="text-xl font-medium leading-normal text-red-500"
                                    id="exampleModalScrollableLabel">
                                    លុបប្រភេទ
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                                </div>
                                <div className="modal-body relative p-4">
                                  <h2>
                                    តើ​អ្នក​ប្រាកដ​ឬ​អត់? ចង់លុបប្រភេទ...!
                                  </h2>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-sm">
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal">
                                    បោះបង់
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-light text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    data-bs-dismiss={'modal'}
                                    aria-label="Close"
                                    onClick={(e) => {
                                      deleteMutaion.mutate(category.id);
                                      clearData();
                                    }}>
                                    លុប
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end of delete modal */}
                        </td>
                      </tr>
                    );
                  })}
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
                'border mr-3 px-2 text-gray-800 border-gray-400'
              }
              nextLinkClassName={
                'border ml-3 px-2 text-gray-800 border-gray-400'
              }
              activeLinkClassName={'bg-blue-500 border border-gray-400'}
              disabledLinkClassName={
                'text-gray-300 cursor-auto border-gray-300 border'
              }
            />
          </nav>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Category;
