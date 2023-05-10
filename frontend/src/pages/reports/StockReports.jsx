import React from 'react';
import Navbar from '../../components/Navbar';
import { BsFillPrinterFill } from 'react-icons/bs';
import { Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import PrintStockReport from './PrintStockReport';

const StockReports = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `pss-stock-reports`,
    // onAfterPrint: () => alert("Your Payment Printed Successfully!"),
  });

  const [value, setValue] = useState(0);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const fetchStockReport = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/stock_report?qty=${value}&limit=${limit}&search=${keyword}&page=${page}`
    );
    return data;
  };
  const { data, isLoading } = useQuery(
    ['stock_reports', value, limit, keyword, page],
    fetchStockReport
  );
  //console.log(data);

  // handle page change
  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setPages(data.totalPage);
      setRows(data.totalRows);
      setLimit(limit);
      setPage(data.page);
    }
  }, [data]);

  return (
    <>
      <div className="h-screen bg-gray-100 overflow-auto flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-lg mb-2 text-left mt-3">របាយការណ៏ស្តុក</h1>
          <div className="w-full h-1 bg-blue-400 shadow-sm"></div>
          <span className="text-sm mb-7 inline-block mt-1">
            អ្នកអាចច្រោះទិន្នន័យដោយប្រើតារាងខាងក្រោម
          </span>
          <div className="flex justify-between mb-3">
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
                  <option value={5}>5</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>Entities</span>
              </div>
            </div>
            <div className="flex">
              <div className="mr-5 flex mt-2">
                <Radio.Group onChange={handleChange} value={value}>
                  <Radio value={0}>ផលិតផលអស់ពីស្តុក</Radio>
                  <Radio value={1}>ផលិតផលជិតអស់ពីស្តុក</Radio>
                </Radio.Group>
              </div>
              <span>
                <input
                  className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2 hover:shadow mr-2"
                  placeholder="លេខកូដផលិតផល"
                  type="search"
                  style={{ width: '18rem' }}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
              </span>
              <button
                onClick={()=>{
                  if(data && data.result.length>0){
                    handlePrint()
                  }
                }}
                className="bg-blue-600 text-white text-md leading-tight rounded-sm shadow-md hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1 px-5">
                <BsFillPrinterFill />
              </button>
            </div>
          </div>
          <div className="rounded-sm shadow-sm overflow-auto hidden md:block h-[560px]">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b-2 border-gray-100 bg-blue-100">
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    №
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    កូដផលិតផល
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឈ្មោះផលិតផល
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ចំនួនក្នុងស្តុក
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ប្រភេទ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ម៉ាកផលិផល
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    តម្លៃនាំចូល
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.result.map((item, index) => {
                    return (
                      <tr
                        className="text-center bg-white border-b-2 border-gray-100"
                        key={item.product_id}>
                        <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                          {index + 1}
                        </td>

                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.product_code}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.product_name}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.qty}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.categoryName}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.brandName ? (
                            item.brandName
                          ) : (
                            <span className="text-gray-500">គ្មាន</span>
                          )}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {'$ ' + item.unit_price.toFixed(2)}
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
            <PrintStockReport componentRef={componentRef} data={data.result} />
          )}
        </div>
      </div>
    </>
  );
};

export default StockReports;
