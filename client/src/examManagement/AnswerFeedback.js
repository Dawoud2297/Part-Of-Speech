// Answer Feedback component which takes the answer and return the feedback(correct/incorrect)

import { CardActions, CardContent, Button, Typography } from '@material-ui/core';

export default function AnswerFeedback({ setIsAnswered, isCorrect, currentQuestion, calRank }) {


  // a function in oreder to clicking on "next question" set the state to allow next answer   
  const handleButton = () => {
    setIsAnswered(false);
  }
  return (
    <div className='card'>
      <CardContent className='cardContent'>
        <Typography>
          {
            isCorrect ? <h1>Correct Answer</h1> : <h1>Incorrect Answer</h1>
          }
        </Typography>
      </CardContent>
      <CardActions>
        {
          currentQuestion === 10 ? (
            <Button variant="contained" color="success" onClick={calRank}>Submit</Button>

          ) : (

            <Button variant="contained" color="success" onClick={handleButton}>Next Question</Button>
          )
        }
      </CardActions>
    </div>
  );
}
