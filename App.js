import { useState } from "react";
import "./App.css";

// just some products i made up
const products = [
  { id: 1, name: "Apple", price: 0.99 },
  { id: 2, name: "Banana", price: 0.49 },
  { id: 3, name: "Orange", price: 1.29 },
  { id: 4, name: "Mango", price: 2.49 },
  { id: 5, name: "Grapes", price: 3.99 },
  { id: 6, name: "Watermelon", price: 5.99 },
];

function App() {
  // cart is an array of objects like { id, name, price, qty }
  const [cart, setCart] = useState([]);

  // add item to cart or increase qty if already there
  function addToCart(product) {
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      // just increase qty by 1
      const updatedCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });
      setCart(updatedCart);
    } else {
      // add new item with qty 1
      setCart([...cart, { ...product, qty: 1 }]);
    }
  }

  // remove item from cart completely
  function removeFromCart(id) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  // change qty directly from the input box
  function changeQty(id, newQty) {
    if (newQty < 1) return; // dont allow 0 or negative
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    setCart(updatedCart);
  }

  // calculate total number of items in cart
  function getTotalItems() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].qty;
    }
    return total;
  }

  // calculate total price
  function getTotalPrice() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = total + cart[i].price * cart[i].qty;
    }
    return total.toFixed(2);
  }

  return (
    <div className="app">
      <h1>🛒 My Shopping Cart</h1>

      {/* cart badge at top */}
      <div className="badge">
        Items in cart: <span>{getTotalItems()}</span>
      </div>

      {/* product list */}
      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <p className="product-name">{product.name}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* cart section */}
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-msg">Your cart is empty. Add some items!</p>
      ) : (
        <div>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.qty}
                      min="1"
                      onChange={(e) =>
                        changeQty(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${(item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* total */}
          <div className="total">
            <strong>Total: ${getTotalPrice()}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
