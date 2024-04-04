import React from 'react'
// types
import { AnswerObject } from '../App'




type Props = {
    question: string;
    answers: string[];
    callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;

}

const QuestionCard: React.FC<Props> = ({ question, answers, callBack, userAnswer, questionNum, totalQuestions }) => {
    return (<div>
        <div> Question: {questionNum} / {totalQuestions} </div>
        <p dangerouslySetInnerHTML={{ __html: question }} ></p>
        <div>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ))}
        </div>

    </div>
    )
}

export default QuestionCard