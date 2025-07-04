import React ,{useState,useEffect} from "react";

import axios from 'axios';

const api=axios.create({
    baseURL:'http://localhost:8080/api',
    headers:{
        'Content-Type':'appliacation/json',
    },
});
export default api;