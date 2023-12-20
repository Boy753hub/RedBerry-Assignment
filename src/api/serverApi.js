import axios from 'axios';

export const BASE_PATH = "https://api.blog.redberryinternship.ge/api"

const my_token = 'f536d0424e8daa23ef0abe0827aa635d5d1547d949944f73ec790695eea88014'

export const API = axios.create({
    baseURL: "https://api.blog.redberryinternship.ge/api",
    headers: {
        'Authorization': `Bearer ${my_token}` 
    }
});

export const getCategories = async () => {
    try {
        return (await API.get("/categories")).data
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}