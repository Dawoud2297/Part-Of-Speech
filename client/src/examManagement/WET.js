// WET(Word each time) is the component where every action and interaction happens

import React, { useEffect, useRef, useState } from 'react'
import AnswerFeedback from './AnswerFeedback'
import Header from './Header'
import { Typography } from '@material-ui/core'
import Points from '../api/Points';


const WET = ({ wordObj }) => {

    // wordRef returns the element it supposed to be the refference to
    const wordRef = useRef();

    // current question is a state determine the number of the question by now 
    const [currentQuestion, setCurrentQuestion] = useState(0)

    // the initialValue specifies either the ANSWER is correct or not
    const initialVal = () => {
        const corr = wordObj[currentQuestion]?.pos
        if (wordRef.current === corr) {
            return true;
        } else {
            return false;
        }
    }

    const [progressBar, setProgressBar] = useState(0)
    const [isAnswered, setIsAnswered] = useState(false)
    const [isCorrect, setIsCorrect] = useState(initialVal)
    const [score, setScore] = useState([])
    const [isScored, setisScored] = useState(false)
    const [rank, setRank] = useState(0)

    /* 
    Is the function in charge of specify the answer by taking a parameter.
    Then applies this param to the wordRef.
    And then set the isAnswered state to true so that the feedback page will be displayed
    And after all that it'll implement the `correctAnswer` function
    finally we add the question to the score list
    */
    const handleClick = (wt) => {
        wordRef.current = wt
        setCurrentQuestion(currentQuestion + 1);
        setIsAnswered(true);
        // console.log(wordObj[currentQuestion], wordObj[currentQuestion]?.pos, wordRef.current);
        // console.log(wordRef.current)
        correctAnswer();
        setisScored(true);
    }

    /**
    And after the previous function has done it's job.
    correctAnswer compares the wordRef with the pos of the asked word.
    and the apply the status to isCorrect state
     */

    const correctAnswer = () => {
        const corr = wordObj[currentQuestion].pos
        if (wordRef.current === corr) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
        console.log(wordRef.current)
    }

    // this side effect is in charge of stting the progress bar Simultaneously with the answered questions
    useEffect(() => {
        setProgressBar((currentQuestion / 10) * 100);
    }, [currentQuestion])

    // And this one i in charge of pushing the answers status to a list so that we can calculate the score
    useEffect(() => {
        if (isScored) {
            setScore([...score, isCorrect])
            setisScored(false)
        }
        // console.log('from useEffect 2', isCorrect)
        // console.log(score)
        // console.log(isScored)
    }, [isCorrect, isScored, score])



    /*
    calRank(Calculate rank)function it's responsiblity is to calculate the rank after the last question is answer.
    And it fulfills it by calculates the score using percentage operation
    And it sends the score to the server so that calculate the rank based on scoresList and returns the result.
    And finally it takes the responsed result and set it to the rank state. 
     */
    const calRank = async () => {
        score.sort();
        console.log(score);
        setIsAnswered(false);
        const rightAnswers = score.filter(t => t === true);
        const countScore = (rightAnswers.length / score.length) * 100;
        await Points.calRanks(countScore).then(res => {
            // console.log(res.data)
            setRank(res.data.rank);
        }).catch(e => {
            console.log(e)
        })
    }

    // console.log(rank)

    const tryAgain = () => {
        window.location.reload();
    }

    return (
        <div>
            <Typography>

                <div className='header'>
                    <Header progressBar={progressBar} />
                </div>
                <div
                    style={{ visibility: `${isAnswered ? 'hidden' : 'visible'}` }}
                    key={currentQuestion}>
                    {
                        currentQuestion === 10
                            ?
                            <div className='submit'>
                                <h1>
                                    Your Rank = <span>
                                        {
                                            rank
                                        }
                                    </span>
                                </h1>
                                <button onClick={tryAgain}>Try Again</button>
                            </div>
                            :
                            <>
                                <div className='pos'>
                                    <p>{wordObj[currentQuestion]?.word}</p>
                                </div>
                                <div className='options'>
                                    <button type="button" ref={wordRef} onClick={() => handleClick('adjective')}>adjective</button>
                                    <button type="button" ref={wordRef} onClick={() => handleClick('adverb')}>adverb</button>
                                    <button type="button" ref={wordRef} onClick={() => handleClick('verb')}>verb</button>
                                    <button type="button" ref={wordRef} onClick={() => handleClick('noun')}>noun</button>
                                </div>
                            </>
                    }
                </div>
                <div className='answerFeedback'>
                    {
                        isAnswered ?
                            <div className=''>
                                <AnswerFeedback
                                    setIsAnswered={setIsAnswered}
                                    isCorrect={isCorrect}
                                    currentQuestion={currentQuestion}
                                    calRank={calRank}
                                />
                            </div>
                            : null
                    }
                </div>
            </Typography>
        </div>
    )
}

export default WET