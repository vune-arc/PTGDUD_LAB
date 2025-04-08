import React, { createContext, useContext, useState, useEffect } from "react";

const CustomerContext = createContext();

export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("https://67f3c671cbef97f40d2c08a5.mockapi.io/api/v1/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const addCustomer = (customer) => {
    const nextId = customers.length > 0
      ? Math.max(...customers.map((c) => parseInt(c.id))) + 1
      : 1;

    const newCustomer = { ...customer, id: `${nextId}` };
    setCustomers([newCustomer, ...customers]);
  };

  const updateCustomer = (updatedCustomer) => {
    const updatedList = customers.map((cust) =>
      cust.id === updatedCustomer.id ? updatedCustomer : cust
    );
    setCustomers(updatedList);
  };
  const deleteCustomer = (id) => {
    const updatedList = customers.filter((cust) => cust.id !== id);
    setCustomers(updatedList);
  };

  return (
    <CustomerContext.Provider value={{ customers, setCustomers, addCustomer, updateCustomer, deleteCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
