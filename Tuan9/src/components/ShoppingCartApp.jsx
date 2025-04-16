import React, { useState } from 'react';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import '../css/ShoppingCartApp.css'; // Import CSS for styling

// 1. Tạo Slice cho Giỏ hàng (Cart)
const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] }, // Giỏ hàng ban đầu trống
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity; // Cập nhật số lượng nếu sản phẩm đã có
      } else {
        state.cartItems.push(newItem); // Thêm sản phẩm mới vào giỏ
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id); // Xóa sản phẩm khỏi giỏ hàng
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity; // Cập nhật lại số lượng sản phẩm
      }
    },
  },
});

// 2. Lấy Actions và Reducer từ Slice
const { addItem, removeItem, updateQuantity } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

// 3. Tạo Store Redux
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// 4. Component Giỏ hàng
function ShoppingCart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Tính tổng số lượng và tổng tiền
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // State để hiển thị modal sửa số lượng sản phẩm
  const [editingItem, setEditingItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  const handleEditQuantity = (item) => {
    setEditingItem(item);
    setNewQuantity(item.quantity);
  };

  const handleSaveQuantity = () => {
    dispatch(updateQuantity({ id: editingItem.id, quantity: newQuantity }));
    setEditingItem(null);
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item)); // Thêm sản phẩm vào giỏ
  };

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>

      {/* Thêm sản phẩm vào giỏ hàng */}
      <div className="product-list">
        <h2>Available Products</h2>
        <div className="product-item">
          <span>Product A - $10.00</span>
          <button onClick={() => handleAddItem({ id: 1, name: 'Product A', price: 10, quantity: 1 })}>Add to Cart</button>
        </div>
        <div className="product-item">
          <span>Product B - $20.00</span>
          <button onClick={() => handleAddItem({ id: 2, name: 'Product B', price: 20, quantity: 1 })}>Add to Cart</button>
        </div>
        <div className="product-item">
          <span>Product C - $15.00</span>
          <button onClick={() => handleAddItem({ id: 3, name: 'Product C', price: 15, quantity: 1 })}>Add to Cart</button>
        </div>
      </div>

      {/* Hiển thị giỏ hàng */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>Price: ${item.price}</span>
                <span>Quantity: {item.quantity}</span>
                <button onClick={() => handleEditQuantity(item)}>Edit Quantity</button>
                <button onClick={() => dispatch(removeItem(item))}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Quantity: {totalQuantity}</h3>
            <h3>Total Price: ${totalPrice}</h3>
          </div>
        </div>
      )}

      {/* Modal chỉnh sửa số lượng */}
      {editingItem && (
        <div className="modal">
          <h2>Edit Quantity for {editingItem.name}</h2>
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            min="1"
            max="10"
          />
          <button onClick={handleSaveQuantity}>Save</button>
          <button onClick={() => setEditingItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

// 5. Component tổng (Provider gói Redux)
export default function ShoppingCartApp() {
  return (
    <Provider store={store}>
      <ShoppingCart />
    </Provider>
  );
}
