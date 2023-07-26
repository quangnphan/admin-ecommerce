import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice";
import { DataGrid } from "@mui/x-data-grid";

const Products = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.products.status);
  const { products } = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getLowestPrice = (product) => {
    // Check if the product and its sizes array exist
    if (!product || !product.sizes || product.sizes.length === 0) {
      return 0; // Return 0 if no sizes or product provided
    }

    // Find the minimum price among all storages in the sizes array
    const minPrice = product.sizes.reduce((min, size) => {
      const sizeMinPrice = size.storages.reduce((minPrice, storage) => {
        return storage.price < minPrice ? storage.price : minPrice;
      }, Infinity);

      return sizeMinPrice < min ? sizeMinPrice : min;
    }, Infinity);

    return minPrice;
  };

  // Add unique id to each product (if not already present)
  const productsWithId = products
    ? products.map((product, index) => ({
        ...product,
        id: index + 1, // generate an index-based id
        category: product.category.name,
        created_by: product.created_by.name,
        created_at: new Date(product.created_at).toLocaleDateString("en-US"),
        price: getLowestPrice(product),
      }))
    : [];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "price", headerName: "Base Price", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "created_at", headerName: "Created At", width: 120 },
    { field: "created_by", headerName: "Created By", width: 120 },
    // Add other columns based on your product data structure
  ];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {status.error}</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={productsWithId}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export default Products;
