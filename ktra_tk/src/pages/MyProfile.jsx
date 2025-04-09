import React from "react";

export default function MyProfile() {
    const admin = {
        name: "Admin Nguyễn",
        email: "admin@example.com",
        role: "Quản trị viên",
        createdAt: "2023-01-15",
        avatar: "./img/Avatar (1).png",
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

            <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4 justify-center">
                {/* Avatar */}
                <img
                    src={admin.avatar}
                    alt="Admin Avatar"
                    className="w-28 h-28 rounded-full object-cover border"
                />

                {/* Thông tin */}
                <div>
                    <div className="mb-2">
                        <label className="font-semibold block">Họ tên:</label>
                        <p className="text-gray-700">{admin.name}</p>
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold block">Email:</label>
                        <p className="text-gray-700">{admin.email}</p>
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold block">Vai trò:</label>
                        <p className="text-gray-700">{admin.role}</p>
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold block">Ngày tham gia:</label>
                        <p className="text-gray-700">{admin.createdAt}</p>
                    </div>
                </div>
            </div>

            {/* Nút chỉnh sửa */}
            <div className="text-center mt-6">
                <button className="bg-blue-600 text-black px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                    Chỉnh sửa thông tin
                </button>
            </div>
        </div>
    );
}
