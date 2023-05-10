import React from 'react';
import logo from '../../assets/pss.png';
import moment from 'moment';

function PrintPayment(props) {
  const { componentRef, data } = props;
  // total item
  const totalItem = data.reduce((pre, cur) => pre + cur.qty_sales, 0);
  const totalPrice = data.reduce((a, c) => a + c.price * c.qty_sales, 0);

  console.log(data);

  // format date
  function DateFormmat(props) {
    moment.locale('en');
    let dt = props.date;
    let formatDate = moment(dt).format('YYYY-MM-DD');
    return formatDate;
  }

  return (
    <>
      <div ref={componentRef} className="w-full h-[window.innerHeight] mt-12">
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" className="w-20 h-20 rounded-full mr-3" />
          <h1 className="text-3xl mt-2">
            PSS<span className="text-2xl">គ្រឿងសំណង់</span>
          </h1>
        </div>
        <div className="flex justify-between my-3 py-9 px-6 flex-col mx-9">
          <h2 className="">
            អ្នកលក់:
            <span className="text-lg ml-1 -mt-[3px]">{data[0].username}</span>
          </h2>
          <h2 className="">
            កាលបរិច្ឆេទ: {<DateFormmat date={data[0].sale_date} />}
          </h2>
          <h2 className="">លេខ​​​​​វិក្កយបត្រ: {data[0].invoice_number}</h2>
          <p className="">Tel: 099 74 36 34 / 081 64 23 12</p>
          <h3 className="text-center text-lg font-semibold mt-8">វិក្កយបត្រ</h3>
        </div>
        <div className="flex flex-col">
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
                    {data.map((item, index) => {
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
                          <td className="whitespace-nowrap px-6 py-4 border-r">
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
        <div className="grid grid-cols-6 mt-9 gap-4 ml-28 text-sm">
          <div className="col-span-2">
            <h3>
              បង់ដោយ: <span>{data[0].payment_type}</span>
            </h3>
          </div>
          <div className="col-span-2">
            <h3>
              ប្រាក់បានបង់: <span>${data[0].amount.toFixed(2)}</span>
            </h3>
          </div>
          <div className="col-span-2">
            <h3>
              ប្រាក់បានអាប់: <span>${data[0].money_change.toFixed(2)}</span>
            </h3>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-center text-lg">Thank you ! Please come again</h3>
          <h3 className="text-center mt-1">ទំនិញទិញរួចមិនអាចដូរវិញបានទេ</h3>
          <h3 className="text-center text-xl mt-1">
            Goods sold are not returnable
          </h3>
        </div>
      </div>
    </>
  );
}

export default PrintPayment;
