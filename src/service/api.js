import axios from 'axios';

export const usersUrl = 'http://localhost:8080';

export const getAPI= async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}


export const addAPI= async (url,user) => {
    return await axios.post(`${usersUrl}/${url}/`, user);
}

export const deleteAPI= async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editAPI= async (id, user) => {
    return await axios.put(`${usersUrl}/${id}`, user)
}
export const getTokenAPI = async (id, token) => {
    id = id || '';
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return await axios.get(`${usersUrl}/${id}`, config);
};

export const uploadPDF = async (formData, token) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(`${usersUrl}/api/pdf/upload`, formData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to upload PDF');
    }
};
