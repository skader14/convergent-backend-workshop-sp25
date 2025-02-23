import axios from 'axios'

const API = axios.create({
    baseURL: 'https://5728a6a7-2f8c-4db7-96a9-9afb6be2c4ba-00-204dyivv3kv17.riker.replit.dev/', // ADD YOUR API URL HERE!
    headers: { 'Content-Type': 'application/json'}
});

export default API;