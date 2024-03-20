import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList setProducts={setProducts} />} />
        <Route
          path="/product/:productId"
          element={<ProductDetails products={products} />}
        />
      </Routes>
    </Router>
  );
}

export default App;