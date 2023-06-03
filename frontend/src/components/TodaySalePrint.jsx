import React from 'react';
import moment from 'moment';

const TodaySalePrint = ({ componentRef, data, payment }) => {
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

  const totalRevenue = data && data.reduce((a, c) => a + c.revenue, 0);
  const totalCost = data && data.reduce((a, c) => a + c.cost, 0);
  const totalProfit = data && data.reduce((a, c) => a + c.profit, 0);

  return (
    <div>
      <div ref={componentRef} className="w-full h-[window.innerHeight]">
        <div className="flex justify-between my-3 py-9 px-6 flex-col mx-9 border-b-gray-800">
          <h3 className="text-center text-xl font-semibold mt-3">
            របាយការណ៏ផលិតផល
          </h3>
        </div>
        <div className="mb-4">
          <div className="text-white w-full">
            <div class="relative shadow-sm">
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
                  {data &&
                    data.map((item, index) => {
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
          <div className='flex justify-end mr-6' >
            <div className="flex flex-col p-2">
              <div className="text-xs mt-2">ចំណាយសរុប: ${totalCost}</div>
              <div className="text-xs mt-2">ប្រាក់ចំណូលសរុប: ${totalRevenue}</div>
              <div className="text-xs mt-2">ប្រាក់ចំណេញសរុប: ${totalProfit}</div>
              {payment && payment.map((item, index) => (
                <div className="text-xs mt-2" key={index + 1}>{item.payment_type}: ${item.totalAmount}</div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaySalePrint;

