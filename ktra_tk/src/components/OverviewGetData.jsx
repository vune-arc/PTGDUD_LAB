import React from "react";
import { useCustomer } from "../context/CustomerContext";

function OverviewGetData() {
    const { turnover, profit, newCustomerCount } = useCustomer();



    const cards = [
        {
            title: "Turnover",
            value: turnover,
            change: 5.2, // Bạn có thể thêm `turnoverChange` nếu cần
            bg: "bg-pink-50",
            icon: "/img/Button 1509.png",
        },
        {
            title: "Profit",
            value: profit,
            change: 3.1,
            bg: "bg-blue-50",
            icon: "/img/Button 1529.png",
        },
        {
            title: "New customer",
            value: newCustomerCount,
            change: 2.4,
            bg: "bg-indigo-50",
            icon: "/img/Button 1530.png",
        },
    ];

    return (
        <div className="p-1">
            <div className="flex items-center gap-2 mb-2 ">
                <img src="/img/Squares four 1.png" alt="Overview Icon" className="w-5 h-5" />
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

export default OverviewGetData;
