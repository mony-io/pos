import React from 'react';

function PrintStockReport({ componentRef, data }) {
  return (
    <div ref={componentRef} className="w-full h-[window.innerHeight]">
      <div className="flex justify-between my-3 py-9 px-6 flex-col mx-9 border-b-gray-800">
        <h1 className="text-center text-3xl mb-6">
          PSS <span className="text-2xl">គ្រឿងសំណង់</span>
        </h1>
        <h3 className="text-center text-lg font-semibold mt-6">
          របាយការណ៏ស្តុក
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
    </div>
  );
}

export default PrintStockReport;
