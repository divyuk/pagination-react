import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      if (data && data.products) setProducts(data.products);
    };
    fetchData();
  }, []);

  console.log(products);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <div className="products__single" key={product.id}>
                <span>
                  <img src={product.thumbnail} alt={product.title} />
                  <span>{product.title}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span>◀</span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
          <span>▶</span>
        </div>
      )}
    </div>
  );
}

export default App;
