import React from 'react';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [status, setStatus] = useState([]);
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [isValid, setIsValid] = useState(false);
  // ref hook
  const inputFileRef = useRef();

  // message
  const [catMsg, setCatMsg] = useState('');
  const [proCodeMsg, setProCodeMsg] = useState('');
  const [proNameMsg, setProNameMsg] = useState('');
  const [unitMsg, setUnitMsg] = useState('');
  const [msgPriceInstock, setMsgPriceInstock] = useState('');
  const [msgPriceOut, setMsgPriceOut] = useState('');
  const [msgQty, setMsgQty] = useState('');

  const [product, setProduct] = useState({
    category_id: 0,
    brand_id: 0,
    sub_id: 0,
    unit_id: 0,
    product_code: '',
    product_name: '',
    qty: 0,
    unit_price: 0,
    price: 0,
    exp_date: '',
    product_image: '',
    desc: '',
    status: 1,
    reorder_number: 0,
  });
  //console.log(product)
  // clear function
  function clear_data() {
    inputFileRef.current.value = '';
    setProduct({
      category_id: 0,
      brand_id: 0,
      sub_id: 0,
      unit_id: 0,
      product_code: '',
      product_name: '',
      qty: 0,
      unit_price: 0,
      price: 0,
      exp_date: '',
      product_image: '',
      desc: '',
      status: 1,
      reorder_number: 0,
    });
    setProCodeMsg('');
    setProNameMsg('');
    setUnitMsg('');
    setMsgPriceInstock('');
    setMsgPriceOut('');
    setCatMsg('');
    setMsgQty('');
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/all_categories');
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get('http://localhost:3001/all_brands');
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch units of product function
  async function fetchUnits() {
    try {
      const res = await axios.get('http://localhost:3001/all_units');
      setUnits(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchSupplies = async () => {
    try {
      const res = await axios.get('http://localhost:3001/all_suppliers');
      setSupplies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await axios.get('http://localhost:3001/status');
      setStatus(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formValidation = () => {
    let bool = false;
    if (product.category_id === 0) {
      setCatMsg('សូម! ជ្រើសរើសក្រុមផលិតផល');
    } else if (product.product_name === '') {
      setProNameMsg('សូម! បញ្ចូលឈ្មោះផលិតផល');
    } else if (product.product_code === '') {
      setProCodeMsg('សូម! បញ្ចូលកូដផលិតផល');
    } else if (product.unit_id === 0) {
      setUnitMsg('សូម! ជ្រើសរើសឯកតា');
    } else if (product.unit_price === 0 || product.unit_price === '') {
      setMsgPriceInstock('សូម! បញ្ចូលតម្លៃដើម');
    } else if (product.price === 0 || product.price === '') {
      setMsgPriceOut('សូម! បញ្ចូលតម្លៃលក់ចេញ');
    } else if (product.qty === 0 || product.qty === '') {
      setMsgQty('សូម! បញ្ចូលចំនួនផលិតផល');
    } else {
      bool = true;
    }
    return bool;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let formData = new FormData();
      formData.append('category_id', product.category_id);
      formData.append('brand_id', product.brand_id);
      formData.append('sub_id', product.sub_id);
      formData.append('unit_id', product.unit_id);
      formData.append('product_code', product.product_code);
      formData.append('product_name', product.product_name);
      formData.append('qty', product.qty);
      formData.append('unit_price', product.unit_price);
      formData.append('price', product.price);
      formData.append('exp_date', product.exp_date);
      formData.append('product_image', product.product_image);
      formData.append('desc', product.desc);
      formData.append('status', product.status);
      formData.append('reorder_number', product.reorder_number);
      if (formValidation() && isAlreadyExist && isValid) {
        const result = await axios.post(
          'http://localhost:3001/products',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (result.data.success) {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.success(`${result.data.message}`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          clear_data();
        } else {
          playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
          toast.error(`${result.data.message}`, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
        //console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // find product exist by name
  const findProductName = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/product/query?q=${encodeURIComponent(
          product.product_name
        )}`
      );
      if (!res.data.success) {
        setProNameMsg(res.data.message);
        setIsAlreadyExist(false);
      } else {
        setIsAlreadyExist(true);
        setProNameMsg('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // find product exist by name
  const findProductCode = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/product_code/query?q=${encodeURIComponent(
          product.product_code
        )}`
      );
      console.log(res);
      if (!res.data.success) {
        setProCodeMsg(res.data.message);
        setIsValid(false);
      } else {
        setIsValid(true);
        setProCodeMsg('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchUnits();
    fetchSupplies();
    fetchStatus();
  }, []);

  return (
    <>
      <div className="flex-1 h-screen overflow-auto bg-gray-100">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-4 text-left">បន្ថែមផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-1 shadow-sm"></div>
          <div className="shadow bg-white rounded-sm-sm">
            <h2 className="text-left ml-1 p-1">សូម! បំពេញពត៍មានខាងក្រោម</h2>
            <div className="flex justify-around mt-5">
              {/* column 1 */}
              <div className="flex-col mt-5">
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="category"
                    className="form-label inline-block mb-2 text-gray-700">
                    ប្រភេទផលិតផល<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded-sm
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    name="category_id"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value !== 0) {
                        setCatMsg('');
                      }
                    }}
                    value={product.category_id}>
                    <option value={0}>ជ្រើសរើសក្រុមផលិតផល</option>
                    {categories.map((item, inext) => {
                      return (
                        <option value={item.id} key={inext + 1}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </select>
                  {catMsg && (
                    <span className="text-red-500 text-xs">{catMsg}</span>
                  )}
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductName"
                    className="form-label inline-block mb-2 text-gray-700">
                    ឈ្មោះផលិតផល<span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
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
                    id="ProductName"
                    placeholder="ឈ្មោះផលិតផល"
                    name="product_name"
                    onChange={handleChange}
                    value={product.product_name.trim()}
                    onKeyUp={() => {
                      if (product.product_name !== '') {
                        findProductName();
                      }
                      if (product.product_name === '') {
                        setProNameMsg('');
                      }
                    }}
                  />
                  {proNameMsg && (
                    <span className="text-red-500 text-xs">{proNameMsg}</span>
                  )}
                </div>

                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductCode"
                    className="form-label inline-block mb-2 text-gray-700">
                    កូដផលិតផល<span className="text-red-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
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
                    id="ProductCode"
                    placeholder="កូដផលិតផល"
                    name="product_code"
                    onChange={handleChange}
                    value={product.product_code}
                    onKeyDown={(e) => {
                      if (e.code === 'Space') {
                        e.preventDefault();
                      }
                    }}
                    onKeyUp={(e) => {
                      if (product.product_code.length < 4) {
                        setProCodeMsg(
                          'បញ្ជាក់ កូដផលិតផលត្រូវចាប់ពី ៤ ខ្ទង់ឡើងទៅ!'
                        );
                        setIsValid(false);
                      } else {
                        setProCodeMsg('');
                        setIsValid(true);
                        findProductCode();
                      }
                    }}
                  />
                  {proCodeMsg && (
                    <span className="text-red-500 text-xs">{proCodeMsg}</span>
                  )}
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductBrand"
                    className="form-label inline-block mb-2 text-gray-700">
                    ម៉ាកផលិតផល
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded-sm
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    name="brand_id"
                    value={product.brand_id}
                    onChange={handleChange}>
                    <option value={0}>ជ្រើសរើសម៉ាក</option>
                    {brands.map((item, index) => {
                      return (
                        <option value={item.id} key={index + 1}>
                          {item.brandName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductUnit"
                    className="form-label inline-block mb-2 text-gray-700">
                    ឯកតាផលិតផល<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded-sm
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    defaultValue={''}
                    name="unit_id"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value !== 0) {
                        setUnitMsg('');
                      }
                    }}
                    value={product.unit_id}>
                    <option value={0}>ជ្រើសរើសឯកាតា</option>
                    {units.map((item, index) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.unit}
                        </option>
                      );
                    })}
                  </select>
                  {unitMsg && (
                    <span className="text-red-500 text-xs">{unitMsg}</span>
                  )}
                </div>
              </div>
              {/* end of column 1 */}

              {/* start column 2 */}
              <div className="flex-col mt-5">
                <div className="mb-7 xl:w-96">
                  <label htmlFor="UnitPrice inline-block text-gray-700 mb-3">
                    តម្លៃដើម<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.unit_price}
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    mt-2
                    px-3
                    py-1.5
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
                    name="unit_price"
                    id="UnitPrice"
                    placeholder="$"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value !== 0 || e.target.value !== '') {
                        setMsgPriceInstock('');
                      }
                    }}
                  />
                  {msgPriceInstock && (
                    <span className="text-red-500 text-xs">
                      {msgPriceInstock}
                    </span>
                  )}
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="outPrice"
                    className="form-label inline-block mb-2 text-gray-700">
                    តម្លៃលក់ចេញ<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.price}
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
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
                    id="outPrice"
                    placeholder="$"
                    name="price"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value !== 0 || e.target.value !== '') {
                        setMsgPriceOut('');
                      }
                    }}
                  />
                  {msgPriceOut && (
                    <span className="text-xs text-red-500">{msgPriceOut}</span>
                  )}
                </div>

                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="date"
                    className="form-label inline-block mb-2 text-gray-700">
                    ថ្ងៃខែផុតកំណត់
                  </label>
                  <input
                    type="date"
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
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
                    value={product.exp_date}
                    name="exp_date"
                    id="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="status"
                    className="form-label inline-block mb-2 text-gray-700">
                    ស្ថានភាព
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded-sm
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    defaultValue={''}
                    id="status"
                    name="status"
                    onChange={handleChange}
                    value={product.status}>
                    {status.map((item, index) => {
                      return (
                        <option value={item.id} key={index + 1}>
                          {item.status}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="qty"
                    className="form-label inline-block mb-2 text-gray-700">
                    ចំនួន<span className="text-red-500">*</span>
                  </label>
                  <input
                    value={product.qty}
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
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
                    id="qty"
                    name="qty"
                    placeholder="Qty"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value !== '' || e.target.value !== 0) {
                        setMsgQty('');
                      }
                    }}
                  />
                  {msgQty && (
                    <span className="text-red-500 text-sm">{msgQty}</span>
                  )}
                </div>
              </div>
              {/* end of column 2 */}

              {/* start column 3 */}
              <div className="flex-col mt-5">
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="qtyAlert"
                    className="form-label inline-block mb-2 text-gray-700">
                    ចំនួនដាស់តឿន
                  </label>
                  <input
                    value={product.reorder_number}
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
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
                    name="reorder_number"
                    id="qtyAlert"
                    placeholder="Quanity Alert"
                    onChange={handleChange}
                    onBlur={() => {
                      if (product.reorder_number === '') {
                        setProduct((prev) => ({ ...prev, reorder_number: 0 }));
                      }
                    }}
                  />
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="sup"
                    className="form-label inline-block mb-2 text-gray-700">
                    អ្នកផ្គត់ផ្គង់
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded-sm
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                    defaultValue={''}
                    id="sup"
                    name="sub_id"
                    onChange={handleChange}
                    value={product.sub_id}>
                    <option value={0}>ជ្រើសរើសអ្នកផ្គត់ផ្គង់</option>
                    {supplies.map((item, index) => {
                      return (
                        <option value={item.id} key={index + 1}>
                          {item.supName}{' '}
                          {item.companyName && `(${item.companyName})`}({item.phone})
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="desc"
                    className="form-label inline-block mb-2 text-gray-700">
                    ការបរិយាយ
                  </label>
                  <textarea
                    value={product.desc}
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
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
                    id="desc"
                    rows="3"
                    placeholder="Your message"
                    name="desc"
                    onChange={handleChange}></textarea>
                </div>
                <div className="mb-4 xl:w-96">
                  <label
                    htmlFor="photo"
                    className="form-label inline-block mb-2 text-gray-700">
                    រូបភាព
                  </label>
                  <input
                    className="form-control
                              block
                              w-full
                              px-3
                              py-1.5
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
                    type="file"
                    id="photo"
                    name="product_image"
                    ref={inputFileRef}
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.files[0],
                      }));
                    }}
                  />
                </div>
                <div className="flex space-x-2 justify-start">
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase  rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={handleSubmit}>
                    បញ្ជូន
                  </button>
                  <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-sm shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={clear_data}>
                    សម្អាត
                  </button>
                </div>
              </div>
              {/* end of column 3 */}
            </div>
          </div>
        </div>
      </div>
      {/* toast message */}
      <ToastContainer />
    </>
  );
};

export default AddProduct;
