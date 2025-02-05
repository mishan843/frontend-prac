import { toastError, toastSuccess } from "../utils/toast";
import api from "../utils/api";
import { qs } from "../utils/utils";
import { AxiosError, AxiosResponse } from 'axios';
import { UserFormValues } from "../types/types";

interface LoginData {
    email: string;
    password: string;
}

interface ApiResponse {
    data: any;
    message: string;
    status: number;
    token: string;
}

interface ApiError {
    message?: string;
    response?: {
        data?: {
            message?: string;
        };
    };
}

export const registerUser = async (data: UserFormValues): Promise<ApiResponse | { error: string }> => {
    try {
        const response: AxiosResponse<ApiResponse> = await api.post('/user/create', data);
        if (response.status === 201) {
            toastSuccess(response.data.message);
            return response.data;
        }
        return { error: 'Unknown error occurred' };
    } catch (err) {
        const error = err as AxiosError<ApiError>;
        const errorMessage = error.response?.data?.message || 'Failed to create user';
        toastError(errorMessage);
        return { error: errorMessage };
    }
}

export const loginUser = async (data: LoginData): Promise<ApiResponse | { error: string }> => {
    try {
        const response: AxiosResponse<ApiResponse> = await api.post('/user/login', data);
        if (response.status === 200) {
            toastSuccess(response.data.message);
            return response.data;
        }
        return { error: 'Unknown error occurred' };
    } catch (err) {
        const error = err as AxiosError<ApiError>;
        const errorMessage = error.response?.data?.message || 'Failed to login user';
        toastError(errorMessage);
        return { error: errorMessage };
    }
}
