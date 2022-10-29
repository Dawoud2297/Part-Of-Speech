// Managing Rank file

import fs from "fs";

export default class Rank {
    static async calRank(req, res) {
        // read the data file
        const data = fs.readFileSync('TestData.json');
        try {
            // Turning the json data into javascript object 
            const dataParse = JSON.parse(data)
            const scoreList = dataParse.scoresList

            // Take the score value through the request body
            const stuScore = req.body.score;

            // filter the scoreList list to figure out how many elements is less than the score
            let rankLenght = scoreList.filter(s => {
                return s < stuScore
            })

            // And then calculates the rank nased on it
            let rank = ((rankLenght.length / scoreList.length) * 100)

            // rankTHDs(rounded to nearest hundreds)
            let rankTHDs = Math.round(rank * 100) / 100

            await res.status(200).send({ rank: `${rankTHDs}` })
            // console.log(rankTHDs)
            // console.log(rankLenght.length)            
        } catch (error) {
            res.status(400).json({ Error: `${error}` });
        }
    }
}