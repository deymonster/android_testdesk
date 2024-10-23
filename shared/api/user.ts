import { axiosClient } from "./auth";
import type { AxiosError, AxiosRequestConfig, AxiosInstance, Axios } from 'axios';


// Регистрация пользователя
export const registerUser =async (email: string, fullName: string, companyId: number, roles: Array<string>) =>{
    try {
        const newUser = await axiosClient.post('/users');
    } catch (error: AxiosError | any) {
        console.error('Create user failed:', error.response?.data || error.message);
        throw error;
    }

};

// Получение текущего пользователя
export const getCurrentUser = async () => {
    try {
        const currentUser = await axiosClient.get('/users/me');
        
        console.log('Userme successful:', currentUser.data);

        return currentUser.data;
    } catch (error: AxiosError | any) {
        console.error('Userme failed:', error.response?.data || error.message);
        throw error;
    }
}

// загрузка аватара пользователя
export const uploadAvatar = async (formData: FormData, userId: number) => {
    try {
    
        const response = await axiosClient.post(`/users/upload_avatar/${userId}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        console.log('Аватар успешно обновлен:', response.data);
        return response.data;
        
    } catch (error: AxiosError | any) {
        console.error('Avatar upload failed:', error.response?.data || error.message);
        throw error;
    }

}

// Обновление пользователя
export const updateUser = async (userProfile: {
    fullName?: string;
    email?: string;
    avatar?: string;
    oldPassword?: string;
    newPassword?: string;
    hashedPassword?: string;
    roles?: string[];
    companyId?: number;
},  userId: number) => {
    try {
        const response = await axiosClient.put(`/users/${userId}`, userProfile, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log('Профиль пользователя успешно обновлен:', response.data);
        return response.data;
    } catch (error: AxiosError | any) {
        console.error('User update failed:', error.response?.data || error.message);
        throw error;
    }
}