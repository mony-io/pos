import React from 'react';
import Navbar from '../../components/Navbar';
import { DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { BsFillPrinterFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import PrintSaleReport from './PrintSaleReport';
const { RangePicker } = DatePicker;

const SaleReports = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `pss-sale-reports`,
    // onAfterPrint: () => alert("Your Payment Printed Successfully!"),
  });

  const [selectedDate, setSelectedDate] = useState(null);
  // get date method
  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  // hook
  const [sale, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');

  // handle page change
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  // format date
  function DateFormmat(props) {
    moment.locale('en');
    let dt = props.date;
    let formatDate = moment(dt).format('YYYY-MM-DD');
    return formatDate;
  }

  // fetch sale report method
  async function fetchSaleReports() {
    const { data } = await axios.get(
      `http://localhost:3001/sale-reports?limit=${limit}&page=${page}&invoiceNumber=${keyword}&start_date=${
        selectedDate && selectedDate[0]
      }&end_date=${selectedDate && selectedDate[1]}`
    );
    return data;
  }

  const { data, isLoading } = useQuery(
    ['sale-reports', selectedDate, limit, page, keyword],
    fetchSaleReports
  );

  useEffect(() => {
    if (!isLoading && data) {
      setSales(...data.result);
      setPages(data.totalPage);
      setRows(data.totalRows);
      setLimit(limit);
      setPage(data.page);
    }
  }, [data]);

  console.log(data);
  //console.log(limit)

  return (
    <>
      {
        <div className="h-screen bg-gray-100 overflow-auto flex-1">
          <Navbar />
          <div className="p-5">
            <h1 className="text-xl mb-2 text-left mt-3">របាយការណ៏ការលក់</h1>
            <div className="w-full h-1 bg-blue-400 shadow-sm"></div>
            <span className="text-sm mb-7 inline-block mt-1">
              អ្នកអាចច្រោះទិន្នន័យដោយប្រើតារាងខាងក្រោម
            </span>
            <div className="flex justify-between mb-3 items-center">
              <div className="flex">
                <div>
                  <span>Show</span>
                  <select
                    className=" border bg-transparent rounded-sm ml-2 mr-2 outline-none px-3 shadow py-[2px]"
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
                  <span>Entities</span>
                </div>
                <RangePicker
                  className="ml-[100px]"
                  style={{ borderRadius: '2px' }}
                  onChange={handleDateChange}
                />
              </div>
              <div className="flex">
                {/* <span>
                  <input
                    className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2 hover:shadow mr-2"
                    placeholder="លេខយោង..."
                    type="search"
                    style={{ width: '18rem' }}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                  />
                </span> */}
                <button
                  className="bg-blue-600 text-white text-md leading-tight rounded-sm shadow-sm hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-sm focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1 px-6 pt-3 pb-3 "
                  onClick={handlePrint}>
                  <BsFillPrinterFill />
                </button>
              </div>
            </div>
            <div className="rounded-sm shadow-sm overflow-auto hidden md:block h-[560px]">
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
                      លេខយោង
                    </th>

                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      អតិថិជន
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      តម្លៃសរុប
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      ប្រាក់បានបង់
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      នៅសល់
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center">
                      បង់ដោយ
                    </th>
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
                            {item.payment_type}
                          </td>
                        </tr>
                      );
                    })}
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
          <div className="hidden">
            {data && (
              <PrintSaleReport componentRef={componentRef} data={data.result} />
            )}
          </div>
        </div>
      }
    </>
  );
};

export default SaleReports;
