import React from 'react';
import moment from 'moment';

const PrintSaleReport = ({ componentRef, data }) => {
  // format date
  function DateFormmat(props) {
    moment.locale('en');
    let dt = props.date;
    let formatDate = moment(dt).format('YYYY-MM-DD');
    return formatDate;
  }

  const totalCost = data && data.reduce((a, c) => a + c.totalPrice, 0);
  const totalRevenue = data && data.reduce((a, c) => a + c.amount, 0);
  const totalDue = data && data.reduce((a, c) => a + c.money_change, 0);

  return (
    <div ref={componentRef} className="w-full h-[window.innerHeight]">
      <div className="flex justify-between my-3 py-9 px-6 flex-col mx-9 border-b-gray-800">
        <h1 className="text-center text-3xl mb-6">
          PSS <span className="text-2xl">គ្រឿងសំណង់</span>
        </h1>
        <h3 className="text-center text-lg font-semibold mt-6">
          របាយការណ៏ការលក់
        </h3>
      </div>
      <div className="rounded-lg hidden md:block">
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
            {data.map((item, index) => {
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
      <div className="flex justify-end mr-6">
        <div className="flex flex-col p-2">
          <div className="text-sm mt-3">តម្លៃសរុប: ${totalCost}</div>
          <div className="text-sm mt-3">ប្រាក់បានបង់សរុប: ${totalRevenue}</div>
          <div className="text-sm mt-3">ប្រាក់អាប់: ${totalDue}</div>
        </div>
      </div>
    </div>
  );
};

export default PrintSaleReport;
