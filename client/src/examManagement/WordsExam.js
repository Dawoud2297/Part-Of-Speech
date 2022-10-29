// this is the main component of the part of speech test

import React, { useEffect, useState } from 'react';
import Points from '../api/Points';
import WET from './WET';

const WordsExam = () => {
    // here i use wordsObj(Words Object) to mange and store my data back from the server 
    const [wordsObj, setWordsObj] = useState([]);

    /*
    this function is in charge of extracting and fetching the data i need from the server using word endpoint.
    And set this data to the wordsObj state
     */
    const fetchData = () => {
        Points.getWordsObj().then(res => {
            // console.log(res.data)
            setWordsObj(res.data)
        })
    }
    /*
    this side effect is the trigger of the previous function.
    so it allows to the function to be fulfilled only for first render
     */
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='container'>
            <div className='wordsObj'>
            <WET wordObj={wordsObj} />
            </div>
        </div>
    )
}

export default WordsExam