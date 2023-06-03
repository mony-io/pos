import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { FaUsers, FaProductHunt } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { BsBarChartFill } from 'react-icons/bs';
import { HiShoppingCart } from 'react-icons/hi';
import { TbReportSearch } from 'react-icons/tb';
import { RiShareCircleFill } from 'react-icons/ri';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { useAuth } from '../utls/auth';
import { useReactToPrint } from 'react-to-print';
import TodaySalePrint from './TodaySalePrint';
import { Modal } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//play sound
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

const fetchChartData = async () => {
  const { data } = await axios.get('http://localhost:3001/api/days_chart');
  return data;
};

const dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const auth = useAuth();

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

  // format date
  function DateFormmat(props) {
    moment.locale('en');
    let dt = props.date;
    let formatDate = moment(dt).format('YYYY-MM-DD');
    return formatDate;
  }

  // print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${datetime}pss-product-reports`,
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchOverall = async () => {
    const { data } = await axios.get`http://localhost:3001/countItems`;
    return data;
  };

  const fetchTodaySale = async () => {
    const { data } = await axios.get`http://localhost:3001/today-sale`;
    return data;
  };

  const res = useQuery('fetchTodaySale', fetchTodaySale);
  //console.log(res.data);

  const { data } = useQuery('fetchOverall', fetchOverall);

  // chart data
  const res1 = useQuery('ChartData', fetchChartData);
  console.log(res1);

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (res1.data) {
      setChartData({
        labels: [
          'ច័ន្ទ',
          'អង្គារ',
          'ពុធ',
          'ព្រហស្បតិ៍',
          'សុក្រ',
          'សៅរ៍',
          'អាទិត្យ',
        ],
        datasets: [
          {
            label: 'ការលក់ $',
            data: [
              res1.data[0].totalAmount,
              res1.data[1].totalAmount,
              res1.data[2].totalAmount,
              res1.data[3].totalAmount,
              res1.data[4].totalAmount,
              res1.data[5].totalAmount,
              res1.data[6].totalAmount,
            ],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235, 0.4',
          },
        ],
      });
      setChartOptions({
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'ចំណូលប្រចាំថ្ងៃ',
          },
        },
        maintainAspectRatio: false,
        responsive: true,
      });
    }
  }, [res1.data]);

  const totalRevenue =
    res.data && res.data.result.reduce((a, c) => a + c.revenue, 0);
  const totalCost = res.data && res.data.result.reduce((a, c) => a + c.cost, 0);
  const totalProfit =
    res.data && res.data.result.reduce((a, c) => a + c.profit, 0);
  // console.log(totalRevenue, totalCost, totalProfit);

  return (
    <div className="flex-1 h-screen overflow-auto">
      <Navbar />
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-blue-400 mt-3 whitespace-nowrap">
                {data &&
                  (data.total_sales >= 10
                    ? data.total_sales
                    : '0' + data.total_sales)}
              </h2>
              <span className="text-slate-500 mb-1">ចំនួនការលក់</span>
            </div>
            <div className="bg-blue-400 h-24 flex items-center w-32 justify-center">
              <FiShoppingCart size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-green-400 mt-3 whitespace-nowrap">
                {data &&
                  (data.total_customers >= 10
                    ? data.total_customers
                    : '0' + data.total_customers)}
              </h2>
              <span className="text-slate-500 mb-1">អតិថិជន</span>
            </div>
            <div className="bg-green-400 h-24 flex items-center w-32 justify-center">
              <FaUsers size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-red-400 mt-3 whitespace-nowrap">
                {data &&
                  (data.total_products >= 10
                    ? data.total_products
                    : '0' + data.total_products)}
              </h2>
              <span className="text-slate-500 mb-1">ផលិតផល</span>
            </div>
            <div className="bg-red-400 h-24 flex items-center w-32 justify-center">
              <FaProductHunt size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-32 m-2">
          <div className="flex justify-between items-center h-24 bg-[#fff] mt-4 rounded-sm overflow-hidden shadow-sm">
            <div className="flex flex-col h-24 justify-between ml-3">
              <h2 className="text-3xl font-semibold text-orange-400 mt-3 whitespace-nowrap">
                {data &&
                  (data.total_categories >= 10
                    ? data.total_categories
                    : '0' + data.total_categories)}
              </h2>
              <span className="text-slate-500 mb-1">ប្រភេទ</span>
            </div>
            <div className="bg-orange-400 h-24 flex items-center w-32 justify-center">
              <MdCategory size={63} color="white" />
            </div>
          </div>
        </div>
        <div className="col-span-2 cursor-pointer">
          <Link to="/sale">
            <div className="bg-[#fff] h-12 flex justify-start text-slate-500 items-center m-2 rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
              <div className="border-gray-400 border-r-2 pr-3">
                <HiShoppingCart size={24} className="ml-4 " />
              </div>
              <span className="text-sm ml-8">បញ្ជាការលក់</span>
            </div>
          </Link>
        </div>
        <div className="col-span-2">
          {auth.isAdmin ? (
            <Link to="/sale-reports">
              <div className="bg-[#fff] h-12 flex justify-start items-center text-slate-500 m-2 cursor-pointer rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
                <div className="border-gray-400 border-r-2 pr-3">
                  <RiShareCircleFill size={24} className="ml-4" />
                </div>
                <span className="text-sm ml-8">របាយការណ៍នៃការលក់</span>
              </div>
            </Link>
          ) : (
            <div className="bg-[#ddd] disabled h-12 flex justify-start items-center text-slate-500 m-2 rounded-sm">
              <div className="border-gray-400 border-r-2 pr-3">
                <RiShareCircleFill size={24} className="ml-4" />
              </div>
              <span className="text-sm ml-8">របាយការណ៍នៃការលក់</span>
            </div>
          )}
        </div>
        <div className="col-span-2">
          {auth.isAdmin ? (
            <Link to="/productReport">
              <div className="bg-[#fff] h-12 flex cursor-pointer justify-start items-center text-slate-500 m-2 rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
                <div className="border-gray-400 border-r-2 pr-3">
                  <TbReportSearch size={24} className="ml-4" />
                </div>
                <span className="text-sm ml-8">របាយការណ៍ផលិតផល</span>
              </div>
            </Link>
          ) : (
            <div className="bg-[#ddd] disabled h-12 flex justify-start items-center text-slate-500 m-2 rounded-sm">
              <div className="border-gray-400 border-r-2 pr-3">
                <TbReportSearch size={24} className="ml-4" />
              </div>
              <span className="text-sm ml-8">របាយការណ៍ផលិតផល</span>
            </div>
          )}
        </div>
        <div
          className="col-span-2"
          onClick={() => {
            if (auth.isAdmin) {
              if (!res.isLoading && res.data.result.length === 0) {
                setIsModalOpen(false);
                playAudio(
                  'http://localhost:3001/audio/audio-notification-sound.mp3'
                );
                toast.error('សូមអរភ័យទោស...! គ្នានការលក់នៅក្នុងថ្ងៃនេះទេ', {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light',
                });
              } else {
                setIsModalOpen(true);
              }
            }
          }}>
          {auth.isAdmin ? (
            <div className="bg-[#fff] h-12 flex justify-start items-center text-slate-500 m-2 cursor-pointer rounded-sm hover:bg-blue-400 duration-200 hover:text-[#fff]">
              <div className="border-gray-400 border-r-2 pr-3">
                <BsBarChartFill size={24} className="ml-4" />
              </div>
              <span className="text-sm ml-8">របាយការណ៍លក់លម្អិតថ្ងៃនេះ</span>
            </div>
          ) : (
            <div className="bg-[#ddd] disabled h-12 flex justify-start items-center text-slate-500 m-2 rounded-sm">
              <div className="border-gray-400 border-r-2 pr-3">
                <BsBarChartFill size={24} className="ml-4" />
              </div>
              <span className="text-sm ml-8">របាយការណ៍លក់លម្អិតថ្ងៃនេះ</span>
            </div>
          )}
        </div>
        <div className="col-span-4 m-2 mb-4 bg-white rounded-sm overflow-hidden">
          <h2 className="text-center text-xl mt-3 py-9 text-slate-600">
            របាយការណ៍នៃការលក់
          </h2>
          <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[60vh] m-auto p-4 border bg-white">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* change password modal */}
      <Modal
        title={
          <span className="text-gray-800 text-lg">ការលក់លម្អិតថ្ងៃនេះ</span>
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
            onClick={() => {
              handlePrint();
              setIsModalOpen(false);
            }}
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white text-md leading-tight rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
            បោះពុម្ភ
          </button>,
        ]}
        className={'modal-font'}>
        <div className="mb-4 overflow-auto h-[650px]">
          <div className="text-white w-full mt-12">
            <div class="shadow-sm">
              <table class="w-full text-sm text-left text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-blue-100">
                  <tr className="text-center">
                    <th scope="col" class="px-3 py-3">
                      លេខរៀង
                    </th>
                    <th scope="col" class="px-3 py-3">
                      កាលបរិច្ជេទ
                    </th>
                    <th scope="col" class="px-3 py-3">
                      កូដផលិតផល
                    </th>
                    <th scope="col" class="px-3 py-3">
                      ឈ្មោះផលិតផល
                    </th>
                    <th scope="col" class="px-3 py-3">
                      ចំនួន
                    </th>
                    <th scope="col" class="px-3 py-3">
                      តម្លៃ
                    </th>
                    <th scope="col" class="px-3 py-3">
                      ប្រាក់ចំណូល
                    </th>
                    <th scope="col" class="px-3 py-3">
                      ប្រាក់ចំណេញ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {res.data &&
                    res.data.result.map((item, index) => {
                      return (
                        <tr
                          key={index + 1}
                          class="bg-white border-b text-center">
                          <th class="px-3 py-4 text-gray-800">{index + 1}</th>
                          <td class="px-3 py-4">
                            {<DateFormmat date={item.sale_date} />}
                          </td>
                          <td class="px-3 py-4">{item.product_code}</td>
                          <td class="px-3 py-4 font-medium whitespace-nowrap">
                            {item.product_name}
                          </td>
                          <td class="px-3 py-4">{item.qty}</td>
                          <td class="px-3 py-4">${item.cost.toFixed(2)}</td>
                          <td class="px-3 py-4">${item.revenue.toFixed(2)}</td>
                          <td class="px-3 py-4">${item.profit.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col p-2">
              <div className="text-sm mt-3">ចំណាយសរុប: ${totalCost}</div>
              <div className="text-sm mt-3">
                ប្រាក់ចំណូលសរុប: ${totalRevenue}
              </div>
              <div className="text-sm mt-3">
                ប្រាក់ចំណេញសរុប: ${totalProfit}
              </div>
              {res.data &&
                res.data.payment.map((item, index) => (
                  <div className="text-sm mt-3" key={index + 1}>
                    {item.payment_type} : ${item.totalAmount}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* end of change password modal */}
      </Modal>
      {/* PrintTodaySale */}
      <div className="hidden">
        {res.data && (
          <TodaySalePrint
            componentRef={componentRef}
            data={res.data.result}
            payment={res.data.payment}
          />
        )}
      </div>
    </div>
  );
};

export default dashboard;
