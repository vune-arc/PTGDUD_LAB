import React, { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EditCustomerModal from "./EditCustomerModal";
import { useCustomer } from "../context/CustomerContext";
import * as XLSX from "xlsx";

function Table() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [filterStatus, setFilterStatus] = useState("all");

  const { customers, addCustomer, updateCustomer, deleteCustomer,importCustomers } = useCustomer();

  const handleChangePage = (event, value) => setPage(value);

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
    const nextId = customers.length > 0 ? Math.max(...customers.map((c) => parseInt(c.id))) + 1 : 1;
    setSelectedCustomer({
      customerName: "",
      companyName: "",
      orderValue: "",
      orderDate: new Date().toISOString(),
      status: "New",
      avatar: "" + Math.floor(Math.random() * 70),
    });
    setIsAddMode(true);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (isAddMode) {
      addCustomer(selectedCustomer);
    } else {
      updateCustomer(selectedCustomer);
    }
    setOpenModal(false);
    setIsAddMode(false);
  };

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
        status: row["Status"] || "New",
        avatar: row["Avatar"] || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      }));

      importCustomers(importedCustomers);
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

  // ⬇️ Filter + Sort
  const filteredAndSorted =
  (filterStatus === "all" && sortOrder === "default")
    ? [...customers] // Hiển thị danh sách gốc khi không lọc, không sắp xếp
    : [...customers]
        .filter(
          (c) =>
            filterStatus === "all" ||
            c.status?.toLowerCase() === filterStatus.toLowerCase()
        )
        .sort((a, b) => {
          if (sortOrder === "default") return 0;
          return sortOrder === "asc"
            ? parseFloat(a.orderValue) - parseFloat(b.orderValue)
            : parseFloat(b.orderValue) - parseFloat(a.orderValue);
        });

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredAndSorted.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <div className="flex justify-between p-2">
        <div className="flex items-center gap-2 mb-4">
          <img src="./img/File text 1.png" className="w-6 h-6" alt="Report Icon" />
          <h2 className="text-xl font-semibold">Detailed report</h2>
        </div>
        <div className="flex gap-x-4 items-center">
          
          <button
            className="pl-4 pr-4 py-2 border rounded border-pink-400 text-pink-400 hover:bg-pink-50"
            onClick={handleAddNew}
          >
            + Add New
          </button>

          <label className="cursor-pointer border rounded border-pink-400 text-pink-400 px-4 py-2 hover:bg-pink-50">
            Import
            <input type="file" accept=".xlsx, .xls" onChange={handleImportExcel} className="hidden" />
          </label>
          <label className="cursor-pointer border rounded border-pink-400 text-pink-400 px-4 py-2 hover:bg-pink-50">
            Export
            <input type="file" accept=".xlsx, .xls" onChange={handleExportExcel} className="hidden" />
          </label>
          <select
            className="border rounded px-2 py-1 text-sm border-pink-400 text-pink-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="asc">Sort Order ↑</option>
            <option value="desc">Sort Order ↓</option>
          </select>

          <select
            className="border rounded px-2 py-1 text-sm border-pink-400 text-pink-400"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1); // reset về trang đầu khi lọc
            }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto px-6">
        <table className="min-w-full bg-white rounded-lg overflow-hidden border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">CUSTOMER NAME</th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">COMPANY</th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">ORDER VALUE</th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">ORDER DATE</th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">STATUS</th>
              <th className="py-3 px-6 text-left text-xs font-bold text-gray-700 uppercase">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((customer, index) => (
              <tr key={customer.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                <td className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <img src={customer.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium text-gray-800">{customer.customerName}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-left">{customer.companyName}</td>
                <td className="py-4 px-6 text-left">${parseFloat(customer.orderValue).toFixed(2)}</td>
                <td className="py-4 px-6 text-left">{new Date(customer.orderDate).toLocaleDateString()}</td>
                <td className="py-4 px-6 text-left">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-left">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEditClick(customer)}>
                      <img src="/img/create.png" alt="Edit" />
                    </button>
                    <button onClick={() => handleDeleteClick(customer)}>
                      <img src="/img/delete.jpg" alt="Delete" className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4 px-2">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to{" "}
            {Math.min(page * rowsPerPage, filteredAndSorted.length)} of{" "}
            {filteredAndSorted.length} results
          </div>

          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredAndSorted.length / rowsPerPage)}
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
