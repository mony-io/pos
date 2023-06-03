import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ReactPaginate from 'react-paginate';
import Navbar from '../Navbar';
import { useAuth } from '../../utls/auth';

//play sound
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

const ProductBrands = () => {
  const auth = useAuth();
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [brand, setBrand] = useState({ brandName: '', desc: '', id: '' });

  const [msg, setMsg] = useState('');
  const [colorStyle, setColorStle] = useState('');

  // set id for delete
  const [id,setId] = useState(0);

  // query client
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    setBrand((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // clear function
  function clearData() {
    setBrand({ brandName: '', desc: '' });
    setMsg('');
  }

  // fetch data
  const fetchBrands = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/brands?search=${keyword}&page=${page}&limit=${limit}`
    );
    return data;
  };

  const { data } = useQuery(['getBrands', keyword, page, limit], fetchBrands);
  console.log(data);

  useEffect(() => {
    if (data) {
      setBrands(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows);
    }
    fetchBrands();
  }, [data]);

  // on change page change function
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const createBrand = async () => {
    try {
      if (brand.brandName === '') {
        setMsg('សូម! បញ្ចូលឈ្មោះម៉ាក');
      } else {
        const res = await axios.post('http://localhost:3001/brands', brand);
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

  // handle update function
  const handleUpdate = async () => {
    try {
      if (brand.brandName.trim() !== '') {
        const res = await axios.put(
          `http://localhost:3001/brands/${brand.id}`,
          brand
        );
        if (res.data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          clearData();
          setColorStle('bg-green-100 text-green-700');
          setMsg(res.data.message);
          fetchBrands();
        } else {
          clearData();
          setColorStle('bg-red-100 text-red-700');
          setMsg(res.data.message);
        }

        //console.log(res);
      } else {
        setColorStle('bg-red-100 text-red-700');
        setMsg('សូម! បញ្ចូលឈ្មោះម៉ាកផលិតផល!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      if(id===0||id==='') return;
      const res = await axios.delete(`http://localhost:3001/brands/${id}`);
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
        fetchBrands();
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
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle delete mutation
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      if (brands.length - 1 === 0) {
        setPage(page - 1);
      }
      queryClient.invalidateQueries(['getBrands']);
    },
  });

  // handle update muttation
  const updateMutation = useMutation({
    mutationFn:handleUpdate,
    onSuccess:()=>{
      queryClient.invalidateQueries(['getBrands']);
    }
  })

  // handle add mutation
  const addMutation = useMutation({
    mutationFn:createBrand,
    onSuccess:()=>{
      queryClient.invalidateQueries(['getBrands']);
    }
  })

 //console.log(id)

  return (
    <>
      <div className="flex-1 h-screen overflow-auto bg-gray-100">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-4 text-left">ម៉ាកផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-5 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <div className="flex">
              {auth.isAdmin && <button
                data-bs-toggle="modal"
                data-bs-target="#addBrand"
                className="hidden md:block px-5 h-9 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
                បន្ថែម
              </button>}
              
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
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2.5 hover:shadow"
              placeholder="ឈ្មោះម៉ាក"
              type="text"
              style={{ width: '20rem' }}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {/* add brand model */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="addBrand"
              tabIndex="-1"
              aria-labelledby="exampleModalLgLabel"
              aria-modal="true"
              role="dialog"
              onClick={async (e) => {
                if (e.target.id === 'addBrand') {
                  clearData();
                }
              }}>
              <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-sm relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-sm outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-sm">
                    <h5
                      className="text-xl font-medium leading-normal text-gray-800"
                      id="exampleModalLgLabel">
                      បន្ថែមម៉ាកផលិតផល
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
                      ឈ្មោះ​ម៉ាកផលិតផល <span className='text-red-500'>*</span>
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
                      placeholder="ម៉ាកផលិតផល"
                      id="brand"
                      type="text"
                      name="brandName"
                      onChange={handleChange}
                      value={brand.brandName}
                    />

                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label inline-block mb-2 text-gray-700 mt-5">
                      ការពិពណ៌នា
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
                      value={brand.desc}></textarea>
                    {/* ====== alert message ===== */}
                    {msg && (
                      <div
                        className={`rounded py-1 text-center text-base mt-1 ${colorStyle}`}
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
                      បោះបង់
                    </button>

                    {/* spin button */}
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      onClick={addMutation.mutate}>
                      បញ្ជូន
                    </button>

                    {/* end of spin button */}
                  </div>
                </div>
              </div>
            </div>
            {/* end of add model */}
          </div>
          <div className="rounded-sm shadow-sm overflow-auto hidden md:block mt-3 h-[600px]">
            <table className="w-full table-auto">
              <thead className="bg-blue-100 border-gray-200">
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-md font-semibold tracking-wide text-center">
                    &#8470;
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឈ្មោះ​ម៉ាកផលិតផល
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ការពិពណ៌នា
                  </th>
                  <th>ប្រតិបត្តិការណ៏</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.result.map((item, index) => {
                    return (
                      <tr
                        className="text-center bg-white border-b-2 border-gray-100"
                        key={index + 1}>
                        <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.brandName}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.desc}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            className="mx-2 px-3 py-1.5 rounded-sm font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#updateBrand"
                            onClick={async () => {
                              const res = await axios.get(
                                `http://localhost:3001/brands/${item.id}`
                              );
                              //console.log(res.data)
                              setBrand(...res.data);
                            }}>
                            <BsPencilSquare size={20} />
                          </button>
                          {/* update brand model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="updateBrand"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLgLabel"
                            aria-modal="true"
                            role="dialog"
                            onClick={(e) => {
                              if (e.target.id === 'addBrand') {
                                clearData();
                              }
                            }}>
                            <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-sm outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-sm">
                                  <h5
                                    className="text-xl font-medium leading-normal text-gray-800"
                                    id="updateBrand">
                                    កែប្រែម៉ាក
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={clearData}></button>
                                </div>
                                <div className="modal-body relative p-4 mt-5 mb-5 text-left">
                                  <label
                                    htmlFor="unit"
                                    className="form-label inline-block mb-2 text-gray-700">
                                    ឈ្មោះ​ម៉ាក់ <span className='text-red-500'>*</span>
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
                                    placeholder="ឈ្មោះ​ម៉ាក់"
                                    id="brand"
                                    type="text"
                                    name="brandName"
                                    onChange={handleChange}
                                    value={brand.brandName}
                                  />
                                  <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label inline-block mb-2 text-gray-700 mt-5">
                                    ការពិពណ៌នា
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
                                    placeholder="ការពិពណ៌នា"
                                    name="desc"
                                    value={brand.desc}
                                    onChange={handleChange}></textarea>
                                  {/* ====== alert message ===== */}
                                  {msg && (
                                    <div
                                      className={`rounded py-1 text-center text-base mt-1 ${colorStyle}`}
                                      role="alert">
                                      {msg}
                                    </div>
                                  )}
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-sm">
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounde-sm shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                    onClick={clearData}>
                                    បោះបង់
                                  </button>
                                  {/* spin button */}
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-sm hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    onClick={updateMutation.mutate}>
                                    បញ្ជូន
                                  </button>

                                  {/* end of spin button */}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end of add model */}
                          <button
                          onClick={()=>{setId(item.id)}}
                            className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal">
                            <AiTwotoneDelete size={20} />
                          </button>
                          {/* delete model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="deleteModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-modal="true"
                            role="dialog">
                            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-sm relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-sm outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-sm">
                                  <h5
                                    className="text-xl font-medium leading-normal text-red-500"
                                    id="exampleModalScrollableLabel">
                                    លុបម៉ាក
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                                </div>
                                <div className="modal-body relative p-4">
                                  <h2>
                                    តើ​អ្នក​ប្រាកដ​ឬ​អត់? ចង់លុបម៉ាកផលិតផល...!
                                  </h2>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-sm">
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-sm hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal">
                                    បោះបង់
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-light text-xs leading-tight uppercase rounded-sm shadow-sm hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    data-bs-dismiss={'modal'}
                                    aria-label="Close"
                                    onClick={deleteMutaion.mutate}>
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
          {/* toast message */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ProductBrands;
