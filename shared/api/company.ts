import { axiosClient } from "./auth";
import type { AxiosError, AxiosRequestConfig, AxiosInstance, Axios } from 'axios';


// Получение компании по id
export const getCompany = async (companyId: number) => {
    try {
        const response = await axiosClient.get(`/companies/${companyId}`);
        console.log('Get company successful:', response.data);
        return response.data;
    } catch (error: AxiosError | any) {
        console.error('Get company failed:', error.response?.data || error.message);
        throw error;
    }
}