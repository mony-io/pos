import React from 'react';

const PrintProductReport = ({ componentRef, data }) => {
  const totalCost = data && data.reduce((a, c) => a + c.cost, 0);
  const totalProfit =
    data && data.reduce((a, c) => a + c.profit, 0);
  const totalRevenue =
    data && data.reduce((a, c) => a + c.revenue, 0);

  return (
    <div ref={componentRef} className="w-full h-[window.innerHeight]">
      <div className="flex justify-between my-3 py-9 px-6 flex-col mx-9 border-b-gray-800">
        <h1 className="text-center text-3xl mb-9">
          PSS <span className="text-2xl">គ្រឿងសំណង់</span>
        </h1>
        <h3 className="text-center text-lg font-semibold mt-8">
          របាយការណ៏ផលិតផល
        </h3>
      </div>
      <div className="rounded-lg hidden md:block">
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
            {data.map((item, index) => {
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
      <div className="flex justify-end mr-6">
        <div className="flex flex-col p-2">
          <div className="text-sm mt-3">តម្លៃសរុប: ${totalCost}</div>
          <div className="text-sm mt-3">ប្រាក់អាប់: ${totalProfit}</div>
          <div className="text-sm mt-3">ប្រាក់បានបង់សរុប: ${totalRevenue}</div>
        </div>
      </div>
    </div>
  );
};

export default PrintProductReport;
