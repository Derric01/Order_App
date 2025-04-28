import React, { useState } from 'react';
import './App.css'; // Importing the App CSS file

function MyComponent() {
  // Product catalog with prices
  const products = [
    { id: 1, name: "Product A", price: 19.99 },
    { id: 2, name: "Product B", price: 29.99 },
    { id: 3, name: "Product C", price: 39.99 },
    { id: 4, name: "Product D", price: 49.99 }
  ];

  const [name, setName] = useState("Guest");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [payment, setPayment] = useState("");
  const [shipping, setShipping] = useState("standard");
  const [selectedProduct, setSelectedProduct] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [orderDate, setOrderDate] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value);
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  function handlePaymentChange(event) {
    setPayment(event.target.value);
  }

  function handleShippingChange(event) {
    setShipping(event.target.value);
  }

  function handleProductChange(event) {
    setSelectedProduct(parseInt(event.target.value));
  }

  const validateForm = () => {
    if (name.trim() === "" || email.trim() === "" || address.trim() === "" || payment === "") {
      setFormError("Please fill in all required fields.");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return false;
    }
    
    setFormError("");
    return true;
  };

  const generateTrackingId = () => {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    const product = products.find(p => p.id === selectedProduct);
    const productPrice = product ? product.price : 0;
    const shippingCost = shipping === "express" ? 10 : 5;
    return (productPrice * quantity + shippingCost).toFixed(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Generate tracking ID and set order date
    setTrackingId(generateTrackingId());
    setOrderDate(getCurrentDate());
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName("Guest");
    setEmail("");
    setAddress("");
    setQuantity(1);
    setComment("");
    setPayment("");
    setShipping("standard");
    setSelectedProduct(1);
    setIsSubmitted(false);
    setTrackingId("");
    setOrderDate("");
  };

  // Get the selected product details
  const selectedProductDetails = products.find(p => p.id === selectedProduct) || products[0];

  return (
    <div className="page-background">
      <div className="form-container">
        <h2 className="form-title">Order Form</h2>

        {isSubmitted ? (
          <div className="success-message">
            <h3>Thank you, {name}!</h3>
            <p>Your order has been placed successfully.</p>
            <p><strong>Tracking ID:</strong> {trackingId}</p>
            <p><strong>Order Date:</strong> {orderDate}</p>
            <p>A confirmation email has been sent to {email}</p>
            <button className="reset-button" onClick={handleReset}>
              New Order
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            {formError && <div className="error-message">{formError}</div>}

            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                id="name"
                className="form-input"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                id="email"
                className="form-input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Delivery Address*</label>
              <textarea
                id="address"
                className="form-textarea"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter your delivery address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="product">Select Product*</label>
              <select
                id="product"
                className="form-input"
                value={selectedProduct}
                onChange={handleProductChange}
                required
              >
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity*</label>
              <input
                id="quantity"
                className="form-input"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Delivery Instructions</label>
              <textarea
                id="comment"
                className="form-textarea"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Enter delivery instructions"
              />
            </div>

            <div className="form-group">
              <label htmlFor="payment">Payment Method*</label>
              <select
                id="payment"
                className="form-input"
                value={payment}
                onChange={handlePaymentChange}
                required
              >
                <option value="">Select Payment</option>
                <option value="credit">Credit Card</option>
                <option value="visa">Visa</option>
                <option value="master">MasterCard</option>
                <option value="giftcard">Gift Card</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="shipping">Shipping Method*</label>
              <select
                id="shipping"
                className="form-input"
                value={shipping}
                onChange={handleShippingChange}
              >
                <option value="standard">Standard ($5.00)</option>
                <option value="express">Express ($10.00)</option>
              </select>
            </div>

            <div className="button-group">
              <button type="submit" className="submit-button">Place Order</button>
              <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
            </div>
          </form>
        )}

        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-group">
            <p><strong>Customer:</strong> <span>{name}</span></p>
            {email && <p><strong>Email:</strong> <span>{email}</span></p>}
            {address && <p><strong>Delivery Address:</strong> <span>{address}</span></p>}
          </div>
          
          <div className="summary-group">
            <p><strong>Product:</strong> <span>{selectedProductDetails.name}</span></p>
            <p><strong>Price:</strong> <span>${selectedProductDetails.price.toFixed(2)}</span></p>
            <p><strong>Quantity:</strong> <span>{quantity}</span></p>
          </div>
          
          <div className="summary-group">
            <p><strong>Subtotal:</strong> <span>${(selectedProductDetails.price * quantity).toFixed(2)}</span></p>
            <p><strong>Shipping:</strong> <span>{shipping === "express" ? "Express" : "Standard"} (${shipping === "express" ? "10.00" : "5.00"})</span></p>
            <p><strong>Payment Method:</strong> <span>{payment || "Not selected"}</span></p>
          </div>
          
          {comment && (
            <div className="summary-group">
              <p><strong>Special Instructions:</strong> <span>{comment}</span></p>
            </div>
          )}
          
          {isSubmitted && (
            <div className="summary-group">
              <p><strong>Tracking ID:</strong> <span>{trackingId}</span></p>
              <p><strong>Order Date:</strong> <span>{orderDate}</span></p>
            </div>
          )}
          
          <div className="summary-group">
            <p><strong>Total:</strong> <span>${calculateTotal()}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;