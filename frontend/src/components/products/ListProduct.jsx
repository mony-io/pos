import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { SiProducthunt } from 'react-icons/si';
import Navbar from '../Navbar';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Modal, Button, Image } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utls/auth';

const ListProduct = () => {
  const queryClient = useQueryClient();
  const auth = useAuth();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');

  // view product hook
  const [viewPro, setViewPro] = useState([]);

  // ===== view product modal ======
  const [showViewModal, setShowViewModal] = useState(false);

  // fetch view product
  const fetchOneById = async (id) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/view_products/${id}`
      );
      setViewPro(data);
      setShowViewModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  // fetch data
  const fetchAllProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/products?search=${keyword}&page=${page}&limit=${limit}`
    );
    return data;
  };

  const { data } = useQuery(
    ['getProducts', keyword, page, limit],
    fetchAllProducts
  );
 // console.log(data);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  // open modal function
  const showModal = () => {
    setOpen(true);
  };

  // handle close
  const onClose = () => {
    setOpen(false);
    setId('');
    setName('');
    setLoading(false);
  };

  // handle delete
  const handleDelete = async () => {
    try {
      if (id !== '') {
        setLoading(true);
        const res = await axios.delete(`http://localhost:3001/product/${id}`);
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
          setOpen(false);
          setLoading(false);
          // setId('');
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
          setOpen(false);
          setLoading(false);
          // setId('');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ======== delete  =========
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      console.log(products.length);
      if (products.length - 1 === 0) {
        setPage(page - 1);
      }
      queryClient.invalidateQueries(['getProducts']);
    },
  });
  useEffect(() => {
    if (data) {
      setProducts(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows.TotalRows);
    }
  }, [data]);

  return (
    <>
      <div className="h-screen bg-gray-100 overflow-auto flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-2 text-left mt-3">បញ្ជីផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-5 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <div className="flex">
              {auth.isAdmin && 
                <Link to={'/addproduct'}>
                <button className="hidden md:block px-5 py-1.5 rounded-sm font-medium tracking-wider bg-teal-400 hover:bg-teal-500 duration-200 text-white hover:shadow">
                  បន្ថែម
                </button>
              </Link>
              }
              
              <div className="ml-5">
                <span className="text-sm">Show</span>
                <select
                  className=" border bg-transparent rounded-sm ml-2 mr-2 outline-none px-3 shadow py-[1px]"
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm">Entities</span>
              </div>
            </div>

            <input
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2 hover:shadow"
              placeholder="លេខកូដ/ឈ្មោះផលិតផល"
              type="search"
              style={{ width: '18rem' }}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </div>
          <div className="rounded-sm shadow-sm overflow-auto hidden md:block h-[600px]">
            <table className="w-full table-auto">
              <thead className="bg-blue-100 border-gray-200">
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-md font-semibold tracking-wide text-center">
                    №
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    រូបភាព
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    កូដ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឈ្មោះ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ម៉ាក
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ប្រភេទ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ការចំណាយ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    តម្លៃ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    បរិមាណ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឯកតា
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    បរិមាណជូនដំណឹង
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ស្ថានភាព
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    សកម្មភាព
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  return (
                    <tr
                      className="text-center bg-white border-b-2 border-gray-100"
                      key={index + 1}>
                      <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="w-[40px] h-[50px] flex justify-center p-1 bg-white border rounded-sm">
                          <img
                            src={item.product_image && `${item.product_image}`}
                            className="object-cover w-[30px] h-[40px]"
                          />
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.product_code}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.product_name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.brandName ? item.brandName : 'គ្មាន'}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.categoryName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.unit_price.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.qty}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.unit}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.reorder_number}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.status}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {
                          auth.isAdmin && <Link to={`/update-product/${item.product_id}`}>
                          <button className="mx-2 px-3 py-1.5 rounded-sm font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow">
                            <BsPencilSquare size={20} />
                          </button>
                        </Link>
                        }
                        {auth.isAdmin && 
                        <button
                        className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                        onClick={() => {
                          showModal();
                          setId(item.product_id);
                          setName(item.product_name);
                        }}>
                        <AiTwotoneDelete size={20} />
                      </button>
                        }
                       
                        <button
                          className="ml-2 px-3 py-1.5 rounded-sm font-medium tracking-wider text-green-600 bg-green-200 hover:shadow"
                          onClick={() => {
                            fetchOneById(item.product_id);
                          }}>
                          <AiFillEye size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* delete user modal */}
                <Modal
                  title="លុបអ្នកប្រើប្រាស់"
                  className="modal-fonts"
                  open={open}
                  onCancel={onClose}
                  footer={[
                    <Button
                      key="cancel"
                      type="button"
                      className="bg-red-500 text-white leading-tight rounded-sm shadow-sm hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
                      onClick={onClose}>
                      បោះបង់
                    </Button>,
                    <Button
                      key="submit"
                      loading={loading}
                      onClick={deleteMutaion.mutate}
                      type="button"
                      className="bg-blue-600 text-white text-md leading-tight rounded-sm shadow-sm hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                      យល់ព្រម
                    </Button>,
                  ]}>
                  <h1 className="text-lg text-center p-10">
                    អ្នកប្រើប្រាស់ {name} និងត្រូវលុបចេញពីប្រព័ន្ធ?
                  </h1>
                </Modal>
                {/* end off delete user model */}

                <Modal
                  title={
                    <span className="text-blue-500">
                      <SiProducthunt size={40} />
                    </span>
                  }
                  width={800}
                  open={showViewModal}
                  onCancel={() => {
                    setShowViewModal(false);
                  }}
                  footer={[
                    <Button
                      key="cancel"
                      type="button"
                      className="bg-red-500 text-white leading-tight px-6 rounded-sm shadow-sm hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-sm focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-sm transition duration-150 ease-in-out ml-1 text-md"
                      onClick={() => {
                        setShowViewModal(false);
                      }}>
                      បិទ
                    </Button>,
                  ]}>
                  <div className="flex justify-around">
                    <div>
                      <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        {viewPro.length > 0 && (
                          <>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                              <tbody>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">
                                      លេខកូដផលិតផល
                                    </span>{' '}
                                    : {viewPro[0].product_code}
                                  </td>
                                </tr>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">ឈ្មោះ</span> :{' '}
                                    {viewPro[0].product_name}
                                  </td>
                                </tr>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">ប្រភេទ</span> :{' '}
                                    {viewPro[0].categoryName}
                                  </td>
                                </tr>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">ម៉ាក</span> :{' '}
                                    {viewPro[0].brandName}
                                  </td>
                                </tr>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">ឯកតា</span> :{' '}
                                    {viewPro[0].unit}
                                  </td>
                                </tr>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">បរិមាណ</span> :{' '}
                                    {viewPro[0].qty}
                                  </td>
                                </tr>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">តម្លៃដើម</span>{' '}
                                    : $ {viewPro[0].unit_price.toFixed(2)}
                                  </td>
                                </tr>
                                <tr className="bg-white border-b-[0.5px] dark:border-gray-700">
                                  <td className="py-4">
                                    <span className="font-bold">
                                      តម្លៃលក់ចេញ
                                    </span>
                                    : $ {viewPro[0].price.toFixed(2)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <Image
                        className=""
                        width={200}
                        height={200}
                        style={{ objectFit: 'cover' , borderRadius: '2px'}}
                        src={viewPro.length > 0 && viewPro[0].product_image}
                      />
                    </div>
                  </div>
                </Modal>
                {/* end of view product model */}
              </tbody>
            </table>
          </div>
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
        </div>
      </div>
    </>
  );
};

export default ListProduct;
