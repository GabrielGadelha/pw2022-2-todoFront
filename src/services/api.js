import axios from 'axios'

const api = axios.create({
    baseURL: 'https://todolist-production-5371.up.railway.app/api/'
})



export default api;