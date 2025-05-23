import React, { useEffect, useState } from "react";

function Overview() {
  const [turnover, setTurnover] = useState([]);
  const [profit, setProfit] = useState([]);
  const [newCustomer, setNewCustomer] = useState([]);
  const [turnoverChange, setTurnoverChange] = useState([]);
  const [profitChange, setProfitChange] = useState([]);
  const [newCustomerChange, setNewCustomerChange] = useState([]);

  useEffect(() => {
    fetch("https://67c83e5f0acf98d070859495.mockapi.io/api/v1/turnover") 
      .then((res) => res.json())
      .then((data) => {
        setTurnover(data.map((item) => item.value));
        setTurnoverChange(data.map((item) => item.periodChange));
      })
      .catch((error) => console.error("Error fetching turnover:", error));
  }, []);


  useEffect(() => {
    fetch("https://67c83e5f0acf98d070859495.mockapi.io/api/v1/profit")
      .then((res) => res.json())
      .then((data) => {
        setProfit(data.map((item) => item.value));
        setProfitChange(data.map((item) => item.periodChange));
      })
      .catch((error) => console.error("Error fetching profit:", error));
  }, []);


  useEffect(() => {
    fetch("https://67f3c671cbef97f40d2c08a5.mockapi.io/api/v1/new-customers")
      .then((res) => res.json())
      .then((data) => {
        setNewCustomer(data.map((item) => item.value));
        setNewCustomerChange(data.map((item) => item.periodChange));
      })
      .catch((error) => console.error("Error fetching new customers:", error));
  }, []);

  const cards = [
    {
      title: "Turnover",
      value: turnover.join(", "),
      change: turnoverChange.join(", "),
      bg: "bg-pink-50",
      icon: "/img/Button 1509.png",
    },
    {
      title: "Profit",
      value: profit.join(", "),
      change: profitChange.join(", "),
      bg: "bg-blue-50",
      icon: "/img/Button 1529.png",
    },
    {
      title: "New customer",
      value: newCustomer.join(", "),
      change: newCustomerChange.join(", "),
      bg: "bg-indigo-50",
      icon: "/img/Button 1530.png",
    },
  ];

  return (
    <div className="p-1">
      <div className="flex items-center gap-2 mb-2 ">
        <img
          src="/img/Squares four 1.png"
          alt="Overview Icon"
          className="w-5 h-5"
        />
        <h2 className="text-xl font-semibold">Overview</h2>
      </div>
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl shadow ${card.bg} relative flex flex-col items-start w-fit min-w-[300px] max-w-full`}
          >
            <div>
              <div className="text-2xl font-semibold text-gray-600 text-left">
                {card.title}
              </div>

              <div className="text-xl font-bold text-gray-800 text-left">
                {card.title === "New customer" ? card.value : `$${card.value}`}
              </div>
              <div
                className={`text-sm mt-1 ${card.change >= 0 ? "text-green-500" : "text-red-500"
                  } text-left`}
              >
                {card.change >= 0 ? "▲" : "▼"} {Math.abs(card.change)}% period
                of change
              </div>
            </div>
            <img
              src={card.icon}
              alt={card.title}
              className="absolute top-4 right-4 w-8 h-8 opacity-70"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Overview;
