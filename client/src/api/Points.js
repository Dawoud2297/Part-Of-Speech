// Points file contains the required endpoints to fetch and send data

import http from './http-common';

class Points {
    getWordsObj() {
        return http.get('/words');
    }
    calRanks(data) {
        console.log(data)
        return http.post('/rank', { "score": data });
    }
}

export default new Points();