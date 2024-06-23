import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  //! to make this backend driven and fetch only required number of products, we can have
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const data = await res.json();
      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(Math.floor(data.total / 10));
      }
    };
    fetchData();
  }, [page]);

  console.log(totalPages);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            disabled={page === 1}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          <span
            disabled={page === totalPages}
            onClick={() => selectPageHandler(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
