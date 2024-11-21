import { FC, memo } from "react";

/**
 * ==> props interface
 */
interface IProps {
  question: string;
  answer: string;
}

/**
 * ==> Component
 */
const FaqCard: FC<IProps> = ({ question , answer }) => {
  return (
    <>
    <div className="grid md:grid-cols-2 gap-2" >
      <div>
        <label htmlFor="question">Question</label>
        <p className="input" >{question}</p>
      </div>
      <div>
        <label htmlFor="answer">Answer</label>
        <p className="input">{answer}</p>
      </div>
    </div>
    </>
  );
}

export default memo(FaqCard);