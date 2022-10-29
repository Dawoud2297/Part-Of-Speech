// Words list file

import fs from "fs";

export default class WordsList {
    static getWordsObj(req, res) {
        try {
            // read the data file
            const data = fs.readFileSync('TestData.json')
            
            // turning the json data into js object 
            const dataParse = JSON.parse(data)
            
            // Getting 10 random objects
            let randomWords = dataParse.wordList.sort(() => Math.random() - Math.random()).slice(0, 10);

            // response with the data
            res.send(randomWords);
        } catch (error) {
            // catch error if any
            res.status(400).json({ Error: `${error}` });
        }
    }

}