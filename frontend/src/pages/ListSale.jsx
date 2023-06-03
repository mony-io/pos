import React from 'react';
import Navbar from '../components/Navbar';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { IoMdEye } from 'react-icons/io';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import PrintPayment from '../components/sales/PrintPayment';
import { useReactToPrint } from 'react-to-print';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useAuth } from '../utls/auth';
import { useNavigate } from 'react-router-dom';

const ListSale = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [listSales, setListSales] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [sale_id, setSaleId] = useState(0);
  const [invoice, setInvoice] = useState([]);
  // modal hook
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //console.log(invoice);

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
    setLoading(false);
  };

  // on change page change function
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  // query client
  const queryClient = useQueryClient();
  // =========== update =============
  const handleUpdateSale = async (id) => {
    if (id !== '') {
      const { data } = await axios.get(
        `http://localhost:3001/api/sale_products/${id}`
      );
      console.log(data);
      if (data && data.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(data));
        navigate('/sale');
        auth.setIsUpdate(true);
      }
    }
  };

  console.log(listSales)

  // delete saleitem
  const handleDelete = async () => {
    try {
      if (sale_id > 0) {
        const { data } = await axios.delete(
          `http://localhost:3001/api/sale/${sale_id}`
        );
        if (data.success) {
          setOpen(false);
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`${data.message}`, {
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
          toast.error(`${data.message}`, {
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

  // ======== delete  =========
  const deleteMutaion = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries(['list-sales']);
    },
  });

  // get current date time
  const currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    '/' +
    currentdate.getHours() +
    '/' +
    currentdate.getMinutes() +
    '/' +
    currentdate.getSeconds();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${datetime}/pssinvoice`,
  });

  // format date
  function DateFormmat(props) {
    moment.locale('en');
    let dt = props.date;
    let formatDate = moment(dt).format('YYYY-MM-DD');
    return formatDate;
  }

  // fetch list sale data
  const fetchListSales = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/list-sales?limit=${limit}&page=${page}&search=${keyword}&user_id=${
        auth.id
      }&role=${+auth.isAdmin}`
    );
    // console.log(data)
    return data;
  };

  const { data, isLoading } = useQuery(
    ['list-sales', keyword, limit, page],
    fetchListSales
  );

  // console.log(data);
  // fetch invoice
  const fetchInvoiceSale = async (id = 0) => {
    if (id > 0) {
      const { data } = await axios.get(
        `http://localhost:3001/api/view_invoice/${id}`
      );
      setInvoice(data[0]);
      setSaleId(0);
    }
  };
  //console.log(data)

  useEffect(() => {
    if (data) {
      setListSales(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows.totalRows);
    }
  }, [data]);

  const totalItem = invoice.reduce((pre, cur) => pre + cur.qty_sales, 0);
  const totalPrice = invoice.reduce((a, c) => a + c.price * c.qty_sales, 0);
  //console.log(totalItem, totalPrice);

  // useEffect(() => {
  //   if (invoice.length > 0) {
  //     handlePrint();
  //   }
  // }, [invoice]);

  return (
    <>
      <div className="flex-1 h-screen bg-gray-100 overflow-auto">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-2 text-left mt-3">បញ្ជីការលក់</h1>
          <div className="w-full h-1 bg-blue-400 shadow-sm"></div>
          <span className="text-sm mb-7 inline-block mt-1">
            អ្នកអាចច្រោះទិន្នន័យដោយប្រើតារាងខាងក្រោម
          </span>
          <div className="flex justify-between mb-5">
            <div className="flex">
              <div>
                <span>Show</span>
                <select
                  className=" border bg-transparent rounded-sm ml-2 mr-2 outline-none px-3 shadow py-[2px]"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                </select>
                <span>Entities</span>
              </div>
            </div>
            <div className="flex">
              <span>
                <input
                  className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2 hover:shadow"
                  placeholder="លេខរិក្កយបត្រ..."
                  type="search"
                  style={{ width: '18rem' }}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="rounded-sm shadow-sm overflow-auto hidden md:block h-[550px]">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b-2 border-gray-100 bg-blue-100">
                  <th className="p-3 text-md font-semibold tracking-wide text-center">
                    №
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ការបរិច្ឆេទ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    លេខវិក័យបត្រ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    អតិថិជន
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    តម្លៃសរុប
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    បានបង់
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    នៅសល់
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ប្រតិបត្តិការណ៍
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading &&
                  listSales.map((item, index) => (
                    <tr
                      className="text-center bg-white border-b-2 border-gray-100"
                      key={item.invoice_number}>
                      <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {<DateFormmat date={item.sale_date} />}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.invoice_number}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.customerName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.totalPrice.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.amount.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.money_change.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="flex justify-center">
                          {auth.isAdmin && 
                            <button
                            className="px-3 py-1.5 mr-2 rounded-sm font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                            onClick={() => {
                              auth.setSaleId(item.sale_id);
                              handleUpdateSale(item.sale_id);
                            }}>
                            <BsPencilSquare size={20} />
                          </button>
                          }
                          {
                            auth.isAdmin &&  <button
                            onClick={() => {
                              showModal();
                              setSaleId(item.sale_id);
                            }}
                            className="px-3 py-1.5 mr-2 rounded-sm font-medium tracking-wider text-red-600 bg-red-200 hover:shadow">
                            <AiTwotoneDelete size={20} />
                          </button>
                          }
                         
                          <button
                            className="px-3 py-1.5 rounded-sm font-medium tracking-wider text-white bg-green-500 hover:shadow"
                            onClick={async () => {
                              await fetchInvoiceSale(item.sale_id);
                              setIsModalOpen(true);
                            }}>
                            <IoMdEye size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
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
        <div className="hidden mr-16">
          {invoice.length > 0 && (
            <PrintPayment componentRef={componentRef} data={invoice} />
          )}
        </div>
      </div>
      {/* print sale */}
      <Modal
        title={
          <span className="text-gray-800 text-lg">ទិន្ន័យការលក់</span>
        }
        open={isModalOpen}
        width={900}
        onCancel={handleCancel}
        footer={[
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-red-600 text-white leading-tight rounded-sm shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1
                              text-md
                              "
            onClick={handleCancel}>
            បោះបង់
          </button>,
          <button
            onClick={async () => {
              setIsModalOpen(false);
              handlePrint();
            }}
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white text-md leading-tight rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
            បោះពុម្ភ
          </button>,
        ]}
        className={'modal-font'}>
        <div>
          <div className="flex flex-col h-[500px] overflow-auto">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500">
                          #
                        </th>
                        <th
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500">
                          បរិយាយទំនិញ
                        </th>
                        <th
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500">
                          បរិមាណ
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-4 border-r dark:border-neutral-500">
                          តម្លៃរាយ
                        </th>
                        <th
                          scope="col"
                          className="border-r px-6 py-4 dark:border-neutral-500">
                          តម្លៃសរុប
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.map((item, index) => {
                        return (
                          <tr
                            className="border-b dark:border-neutral-500"
                            key={index + 1}>
                            <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                              {item.product_name}
                            </td>
                            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                              {item.qty}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 border-r dark:border-neutral-500">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              ${item.subtotal.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="border-b dark:border-neutral-500">
                        <td
                          colSpan={2}
                          className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 text-right">
                          ចំនួនសរុប
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {totalItem}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 text-right">
                          សរុប
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          ${totalPrice.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 mt-3 gap-2 text-center mb-9 text-sm bg-[#333] p-3 text-white">
            <div className="col-span-2">
              <h3>
                បង់ដោយ:
                <span>{invoice.length > 0 && invoice[0].payment_type}</span>
              </h3>
            </div>
            <div className="col-span-2">
              <h3>
                ប្រាក់បានបង់:
                <span>${invoice.length > 0 && invoice[0].amount}</span>
              </h3>
            </div>
            <div className="col-span-2">
              <h3>
                ប្រាក់បានអាប់:
                <span>${invoice.length > 0 && invoice[0].money_change}</span>
              </h3>
            </div>
          </div>
        </div>
        {/* end of change password modal */}
      </Modal>

      {/* delete user modal */}
      <Modal
        title="លុបការលក់"
        className="modal-fonts"
        onCancel={onClose}
        open={open}
        footer={[
          <Button
            key="cancel"
            type="button"
            className="bg-red-500 text-white leading-tight rounded-sm shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
            onClick={onClose}>
            បេាះបង់
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
        <h1 className="text-lg text-center p-10">តើលោកអ្នកចង់លុបចេញមែនទេ?</h1>
      </Modal>
      {/* end off delete user model */}
    </>
  );
};

export default ListSale;
