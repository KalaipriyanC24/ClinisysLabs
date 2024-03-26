import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Product({ adminLoggedIn }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductCost, setNewProductCost] = useState('');

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    
    const cartItemCount = cart.reduce((total, product) => total + product.quantity, 0);
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
      cartCountElement.innerText = cartItemCount;
    }
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:44321/api/Product');
      setProducts(response.data);
    } 
    catch (error) {
      console.error('Error in fetching products', error);
    }
  };

  const handleAddToCart = (product) => {
    
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; 
      setCart([...cart]); 
    } 
    else {
      product.quantity = 1;
      setCart([...cart, product]); 
    }
  };

  const handleShowCart = () => {
    const cartItems = cart.map(product => `${product.name} - ₹${product.cost} x ${product.quantity}`).join("\n");
    const totalPrice = calculateTotalPrice();
    alert(`Cart Contents:\n${cartItems}\n\nTotal Price: ₹${totalPrice}`);
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('https://localhost:44321/api/Product', {
        name: newProductName,
        cost: parseFloat(newProductCost)
      });
      
      fetchProducts();
      setNewProductName('');
      setNewProductCost('');
      console.log('Product added successfully:', response.data);
    } 
    catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (productId) => {
    const newName = prompt("Enter the new name:");
    const newCost = prompt("Enter the new cost:");
    
    if (newName !== null && newCost !== null) { 
      try {
        const updatedProduct = {
          id: productId, 
          name: newName,
          cost: parseFloat(newCost)
        };
  
        const response = await axios.put(`https://localhost:44321/api/Product/${productId}`, updatedProduct);
        console.log('Product updated successfully', response.data);
        fetchProducts(); 
      } 
      catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`https://localhost:44321/api/Product/${productId}`);
      console.log('Product deleted successfully:', response.data);
      fetchProducts(); 
    }
     catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.cost * product.quantity), 0);
  };

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-page">
      {adminLoggedIn && (
        <div className="add-product">
          <h2>Add Product</h2>
          <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} placeholder="Product Name" required />
          <input type="number" value={newProductCost} onChange={(e) => setNewProductCost(e.target.value)} placeholder="Product Cost" required />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
      )}
      <nav className="navbar">
        {!adminLoggedIn && (
          <>
            <button className="cart-button" onClick={handleShowCart}>
              Cart (<span id="cartCount">{cart.reduce((total, product) => total + product.quantity, 0)}</span>)
            </button>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fa fa-search"></i>
            </div>
          </>
        )}
      </nav>

      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <p>Cost: ₹{product.cost}</p>
              {!adminLoggedIn && <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>Add to Cart</button>}
              {adminLoggedIn && (
                <>
                  <button className="add-to-cart-button" onClick={() => handleUpdateProduct(product.id)}>Update</button>
                  <button className="add-to-cart-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Product;