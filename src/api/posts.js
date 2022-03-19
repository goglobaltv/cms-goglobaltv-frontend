import axios from 'axios';
import { getToken } from "../Function/fn"

export default axios.create({
    baseURL: 'https://cms_endpoint.go-globaltv.com',
    // baseURL: 'http://192.168.2.183:6600',
    headers: {
        'Access-Control-Allow-Origin': '*',
        "authorization" :`Bearer ${getToken()}`,
    },
});