import axios from 'axios';

const URL = process.env.REACT_APP_URL;

export const adminLogin = async (data) => {
    try {
        return await axios.post(`${URL}/admin/login`, data)
    } catch (error) {
        return ("Error while logging in", error);
    }
}

export const addMenuItem = async (data) => {
    try {
        await axios.post(`${URL}/addMenuItem`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (error) {
        return ("Error while adding menu item", error);
    }
}

export const getMenuItems = async () => {
    try {
        return await axios.get(`${URL}/getMenuItems`)
    } catch (error) {
        return ("Error while fetching menu items", error);
    }
}

export const deleteMenuItem = async (id) => {
    try {
        return await axios.delete(`${URL}/deletemenuitem/${id}`)
    } catch (error) {
        return ("Error while deleting a menu item", error);
    }
}

export const createOrder = async (data) => {
    try {
        return await axios.post(`${URL}/createOrder`, data)
    } catch (error) {
        return ("Error while creating order", error);
    }
}
