import React from 'react';
import Navbar from '../../components/Navbar';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { BsFillPrinterFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import PrintProductReport from './PrintProductReport';

const ProductReport = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `pss-product-reports`,
    // onAfterPrint: () => alert("Your Payment Printed Successfully!"),
  });
  // ============ report =============
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [categoryId, setCategoryId] = useState(0);

  const changePage = ({ selected }) => {
    setPage(selected + 1);
  };

  const fetchProductReports = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/api/product-reports?categoryId=${categoryId}&limits=${limit}&page=${page}&search=${keyword}`
    );
    return data;
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(`http://localhost:3001/categories`);
    return data;
  };

  const res = useQuery('category', fetchCategories);
  //console.log(res)

  const { data } = useQuery(
    ['product-reports', limit, keyword, categoryId],
    fetchProductReports
  );

  useEffect(() => {
    if (data) {
      setProducts(data.result);
      setPage(data.page);
      setPages(data.totalPage);
      setRows(data.totalRows.TotalRows);
    }
  }, [data]);

  console.log(data);

  return (
    <>
      <div className="h-screen bg-gray-100 overflow-auto flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-2 text-left mt-3">របាយការណ៏ផលិតផល</h1>
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
            </div>
            <div className="flex">
              <div className="mr-5">
                <span className="">ប្រភេទផលិតផល</span>
                <select
                  className=" border bg-transparent rounded-sm ml-2 mr-2 outline-none px-3 shadow p-1 text-sm"
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                  }}>
                  <option value={0}>ALL</option>
                  {res.data &&
                    res.data.result.map((item, index) => (
                      <option value={item.id} key={index + 1}>
                        {item.categoryName}
                      </option>
                    ))}
                </select>
              </div>
              <span>
                <input
                  className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-sm outline-none shadow-sm text-center p-2 hover:shadow mr-2"
                  placeholder="កូដផលិតផល/ឈ្មោះផលិតផល"
                  type="search"
                  style={{ width: '18rem' }}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                  }}
                />
              </span>
              <button
                className="bg-blue-600 text-white text-md leading-tight rounded-sm shadow-sm hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1 px-5"
                onClick={handlePrint}>
                <BsFillPrinterFill />
              </button>
            </div>
          </div>
          <div className="rounded-sm shadow overflow-auto hidden md:block h-[550px]">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b-2 border-gray-100 bg-blue-100">
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    №
                  </th>

                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    លេខកូដ
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឈ្មោះ
                  </th>
                  <th>ចំនួនលក់ចេញ</th>
                  <th>ថ្លៃដើម</th>
                  <th>ចំណូល</th>
                  <th>ចំណេញ</th>
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
                        {item.product_code}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.product_name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.qty_sales + ' ( ' + item.unit + ' )'}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.cost.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.revenue.toFixed(2)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        ${item.profit.toFixed(2)}
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
          <PrintProductReport componentRef={componentRef} data={products} />
        </div>
      </div>
    </>
  );
};

export default ProductReport;
