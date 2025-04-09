import React, { createContext, useContext, useState, useEffect } from "react";
import { useNotification } from "../context/NotificationContext";

const CustomerContext = createContext();

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [newCustomerCount, setNewCustomerCount] = useState(0); // ✅ theo dõi số lượng
  const { addNotification } = useNotification();

  const getFormattedTime = () => {
    return new Date().toLocaleString(); // VD: 8/4/2025, 15:30:45
  };

  useEffect(() => {
    fetch("https://67f3c671cbef97f40d2c08a5.mockapi.io/api/v1/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((error) =>
        console.error("Error fetching customers:", error)
      );
  }, []);

  const addCustomer = (customer) => {
    const nextId =
      customers.length > 0
        ? Math.max(...customers.map((c) => parseInt(c.id))) + 1
        : 1;

    const newCustomer = { ...customer, id: `${nextId}` };

    setCustomers((prev) => [newCustomer, ...prev]);
    setNewCustomerCount((prev) => prev + 1); 

    addNotification(
      `Đã thêm khách hàng: ${customer.customerName} vào lúc (${getFormattedTime()})`
    );
  };

  const importCustomers = (importedList) => {
    let nextId =
      customers.length > 0
        ? Math.max(...customers.map((c) => parseInt(c.id))) + 1
        : 1;

    const newList = importedList.map((customer) => ({
      ...customer,
      id: `${nextId++}`,
    }));

    setCustomers((prev) => [...newList, ...prev]);
    setNewCustomerCount((prev) => prev + newList.length); 

    addNotification(
      `Đã nhập ${newList.length} khách hàng từ Excel vào lúc (${getFormattedTime()})`
    );
  };

  const updateCustomer = (updatedCustomer) => {
    const updatedList = customers.map((cust) =>
      cust.id === updatedCustomer.id ? updatedCustomer : cust
    );
    setCustomers(updatedList);

    addNotification(
      `Đã cập nhật khách hàng: ${updatedCustomer.customerName} vào lúc (${getFormattedTime()})`
    );
  };

  const deleteCustomer = (customer) => {
    const updatedList = customers.filter((cust) => cust.id !== customer.id);
    setCustomers(updatedList);
    setNewCustomerCount((prev) => prev - 1); 

    addNotification(
      `Đã xóa khách hàng: ${customer.customerName} vào lúc (${getFormattedTime()})`
    );
  };

  const turnover = customers.reduce(
    (total, c) => total + (parseFloat(c.orderValue) || 0),
    0
  );
  const profit = turnover * 0.2;
  const turnoverFormatted = parseFloat(turnover.toFixed(3));
  const profitFormatted = parseFloat(profit.toFixed(3));
  return (
    <CustomerContext.Provider
      value={{
        customers,
        setCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        importCustomers,
        turnover:turnoverFormatted,
        profit:profitFormatted,
        newCustomerCount, 
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
