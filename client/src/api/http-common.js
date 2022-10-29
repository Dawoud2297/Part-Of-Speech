// file in charge of connection the client with the server and allowing the traffics between them

import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080/api/activity/practice',
    headers: {
        "Content-Type": "application/json"
    }
})