import api from "../utils/api";
import { AxiosError, AxiosResponse } from 'axios';
import { ProductData } from "../types/types";

interface ProductResponse {
    products: ProductData[];
    totalPages: number;
    currentPage: number;
    totalProducts: number;
}

interface SearchParams {
    page?: number;
    limit?: number;
    search?: string;
}

interface ApiError {
    message?: string;
    response?: {
        data?: {
            message?: string;
        };
    };
}

export const getProducts = async (params: SearchParams): Promise<ProductResponse> => {
    try {
        const response: AxiosResponse<ProductResponse> = await api.get('/product/getall', {
            params: params
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        throw new Error(err.response?.data?.message || 'Failed to fetch products');
    }
};
