import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EditCustomerModal from "./EditCustomerModal";
import { useCustomer } from "../context/CustomerContext";
import * as XLSX from "xlsx";
function Table() {
  // const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false); // 👈 Add mode flag
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomer();
  // useEffect(() => {
  //   fetch("https://67f3c671cbef97f40d2c08a5.mockapi.io/api/v1/customers")
  //     .then((res) => res.json())
  //     .then((data) => setCustomers(data))
  //     .catch((error) => console.error("Error fetching customers:", error));
  // }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = customers.slice(startIndex, startIndex + rowsPerPage);

  const getStatusStyle = (status) => {
    switch ((status || "").toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsAddMode(false);
    setTimeout(() => setOpenModal(true), 0);
  };
  const handleDeleteClick = (customer) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(customer);
    }
  };

  const handleAddNew = () => {
    const nextId = customers.length > 0
      ? Math.max(...customers.map((c) => parseInt(c.id))) + 1
      : 1;
    setSelectedCustomer({

      customerName: "",
      companyName: "",
      orderValue: "",
      orderDate: new Date().toISOString(),
      status: "new",
      avatar: "" + Math.floor(Math.random() * 70),
    });
    setIsAddMode(true);
    setOpenModal(true);
  };
  useEffect(() => {
    console.log(customers);
  }, [customers]);
  // const handleSave = () => {
  //   if (isAddMode) {
  //     const nextId = customers.length > 0
  //       ? Math.max(...customers.map((c) => parseInt(c.id))) + 1
  //       : 1;

  //     const newCustomer = {
  //       ...selectedCustomer,
  //       id: ${nextId}, 
  //     };
  //     setCustomers([newCustomer, ...customers]); // 👈 thêm vào đầu danh sách
  //   } else {
  //     const updatedCustomers = customers.map((cust) =>
  //       cust.id === selectedCustomer.id ? selectedCustomer : cust
  //     );
  //     setCustomers(updatedCustomers);

  //   }
  //   console.log(customers);
  //   setOpenModal(false);
  //   setIsAddMode(false);
  // };
  const handleSave = () => {
    if (isAddMode) {
      addCustomer(selectedCustomer);
    } else {
      updateCustomer(selectedCustomer);
    }
    setOpenModal(false);
    setIsAddMode(false);
  };
  ///////
  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const importedCustomers = jsonData.map((row, index) => ({
        customerName: row["Customer Name"] || "Chưa rõ",
        companyName: row["Company"] || "Không xác định",
        orderValue: parseFloat(row["Order Value"] || 0),
        orderDate: new Date().toISOString().split("T")[0],
        status: (row["Status"] || "New"),
        avatar: row["Avatar"] || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      }));

      importedCustomers.forEach(addCustomer);
    };

    reader.readAsArrayBuffer(file);
  };
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      customers.map((c) => ({
        "Customer Name": c.customerName,
        "Company": c.companyName,
        "Order Value": c.orderValue,
        "Order Date": c.orderDate,
        "Status": c.status,
        "Avatar": c.avatar,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    XLSX.writeFile(workbook, "customer_list.xlsx");
  };
  return (
    <div>
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="./img/File text 1.png"
            className="w-6 h-6"
            alt="Report Icon"
          />
          <h2 className="text-xl font-semibold">Detailed report</h2>
        </div>
        <div className="flex gap-x-6">
          <button
            className="flex items-center pl-8 pr-8 py-2 border rounded-lg border-pink-400 text-pink-400 hover:bg-pink-50"
            onClick={handleAddNew}
          >
            <img src="./img/create.png" alt="" className="h-[25px] mr-2" />
            Add new
          </button>

          <label className="flex items-center pl-8 pr-8 py-2 border rounded-lg border-pink-400 text-pink-400 hover:bg-pink-50 cursor-pointer">
            <img src="./img/Move up.png" alt="" className="h-[25px] mr-2" />
            Import
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImportExcel}
              className="hidden"
            />
          </label>

          <label className="flex items-center pl-8 pr-8 py-2 border rounded-lg border-pink-400 text-pink-400 hover:bg-pink-50 cursor-pointer">
            <img src="./img/Move up.png" alt="" className="h-[25px] mr-2" />
            Export
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleExportExcel}
              className="hidden"
            />
          </label>
         
        </div>
      </div>

      <div className="overflow-x-auto px-6">
        <table className="min-w-full bg-white rounded-lg overflow-hidden border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">
                CUSTOMER NAME
              </th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">
                COMPANY
              </th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">
                ORDER VALUE
              </th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">
                ORDER DATE
              </th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">
                STATUS
              </th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((customer, index) => (
              <tr
                key={customer.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors duration-200`}
              >
                <td className="py-4 px-6 text-left align-middle">
                  <div className="flex items-center gap-2">
                    <img src={customer.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-gray-800">{customer.customerName}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-left">{customer.companyName}</td>
                <td className="py-4 px-6 text-left">
                  ${parseFloat(customer.orderValue).toFixed(2)}
                </td>
                <td className="py-4 px-6 text-left">
                  {new Date(customer.orderDate).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      customer.status || ""
                    )}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEditClick(customer)}
                    >
                      <img src="/img/create.png" alt="Edit" />
                    </button>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleDeleteClick(customer)}
                    >
                      <img src="/img/delete.jpg" alt="Edit" className="w-6 h-6" />
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4 px-2">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * rowsPerPage, customers.length)}
            </span>{" "}
            of <span className="font-medium">{customers.length}</span> results
          </div>

          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(customers.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>

      <EditCustomerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        customer={selectedCustomer}
        setCustomer={setSelectedCustomer}
        onSave={handleSave}
      />
    </div>
  );
}

export default Table;
