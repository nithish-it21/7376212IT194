import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuthToken, fetchProducts } from './services/apiService';
import './ProductList.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    company: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    top: 10,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      const productData = await fetchProducts(token, filters);
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div>
        <label>
          Company:
          <select name="company" value={filters.company} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="AMZ">AMZ</option>
            <option value="FLP">FLP</option>
          </select>
        </label>
        <button onClick={fetchProductData}>Apply Filters</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.productName}</h3>
              <p>Price: {product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Discount: {product.discount}</p>
              <p>Availability: {product.availability}</p>
              <Link to={`/product/${product.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;