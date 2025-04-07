function Table() {
  return (
    <div>
      <div className="flex justify-between p-6">
        <div className=" flex items-center gap-2 mb-4  ">
          <img src="./img/File text 1.png" className="w-6 h-6" alt="Report Icon" />
          <h2 className="text-xl font-semibold">Detailed report</h2>
        </div>
        <div className='flex'>
          <img src="./image/Move up.png" alt="" className='h-[25px] absolute mt-4 ml-1' />
          <button 
            className='p-8 border rounded-lg border-pink-400 text-pink-400 px-8 hover:bg-pink-50'
          >
            Add User
          </button>
        </div>
        </div>
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CUSTOMER NAME</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COMPANY</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER VALUE</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ORDER DATE</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          </table>
          </div>
    </div>
  );
}
export default Table;