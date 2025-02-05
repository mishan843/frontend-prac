import { toast } from 'react-toastify';

const toastSuccess = (message: string): void => {
    toast.success(message);
};

const toastError = (message: string): void => {
    toast.error(message);
};

export { toastSuccess, toastError };