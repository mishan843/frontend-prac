import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  TextField, 
  Pagination, 
  Box,
  Container,
  Checkbox,
  IconButton
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Product, ProductData } from '../types/types';
import { deleteProducts, getProducts, } from "../services/ProductService";
import { toastError, toastSuccess } from "../utils/toast";
import debounce from 'lodash/debounce';

const Home = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNum: number, searchQuery: string) => {
    try {
      setLoading(true);
      const response = await getProducts({
        page: pageNum,
        limit: 8,
        search: searchQuery
      });
      setProducts(response?.products);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      toastError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((searchQuery: string) => {
    setPage(1);
    fetchProducts(1, searchQuery);
  }, 500);

  useEffect(() => {
    fetchProducts(page, search);
  }, [page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setSearch(searchQuery);
    debouncedSearch(searchQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId) 
        : [...prevSelected, productId] 
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedProducts.length === 0) {
      toastError("Please select at least one product to delete");
      return;
    }

    try {
      await deleteProducts(selectedProducts);
      toastSuccess("Selected products deleted successfully");
      setProducts((prev) => prev.filter((product) => !selectedProducts.includes(product._id)));
      setSelectedProducts([]); 
    } catch (error: any) {
      toastError(error.message || "Failed to delete products");
    }
  };
  console.log(selectedProducts, 'selected products');
  

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <TextField
          fullWidth
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
        />

        {selectedProducts.length > 0 && (
          <IconButton color="error" onClick={handleDeleteSelected} sx={{ height: "56px", ml: 2 }}>
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  <CardContent>
                    <Checkbox
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleSelectProduct(product._id)}
                      sx={{ position: "absolute", top: 5, right: 5 }}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
