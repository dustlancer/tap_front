import { useRuntimeConfig } from '#app'; 

export default ({ app }, inject) => {
    const config = useRuntimeConfig(); // Доступ к переменным среды
    const apiUrl = config.public.apiBase; // Доступ к API URL
    const baseUrl = 'https://example.com/media/' // Ваш базовый URL для медиа
  
    const mediaUrl = (filename) => {
      return `${baseUrl}/media/${filename}`
    }
  
    // Inject 'mediaUrl' into the context, making it accessible globally
    inject('mediaUrl', mediaUrl)
  }
  