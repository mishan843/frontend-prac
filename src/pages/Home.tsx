import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  TextField, 
  Pagination, 
  Box,
  Container
} from "@mui/material";
import { Product, ProductData } from '../types/types';
import { getProducts } from "../services/ProductService";
import { toastError } from "../utils/toast";
import debounce from 'lodash/debounce';

const Home = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
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

  // Debounce search to avoid too many API calls
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search Products"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
        />
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
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
