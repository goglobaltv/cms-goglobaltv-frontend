import axios from 'axios';
import { getToken } from "../Function/fn"

export default axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_DATABASE,
    // baseURL: 'http://192.168.2.183:6600',
    // https://cms_endpoint.go-globaltv.com
    headers: {
        'Access-Control-Allow-Origin': '*',
        "authorization" :`Bearer ${getToken()}`,
    },
});