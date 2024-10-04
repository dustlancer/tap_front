import { useRuntimeConfig } from '#app'; 


export const mediaUrl = (filename) => {
    const config = useRuntimeConfig(); // Доступ к переменным среды
    const apiUrl = config.public.apiBase; // Доступ к API URL
    return `${apiUrl}/media/${filename}/`  
}