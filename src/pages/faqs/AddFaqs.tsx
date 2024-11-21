import { FC, memo } from "react";
import SecTitle from "../../components/global/SecTitle";

/**
 * ==> props interface
 */
interface IProps {

}

/**
 * ==> Component
 */
const AddFaqs: FC<IProps> = ({  }) => {
  return (
    <>
    <section>
      <div className="container">
        <SecTitle title="add FAQ page" />
        <div className="wrapper">
          <form action="">
            <div className="grid grid-cols-2 gap-2 ">
              <div>
                <label htmlFor="question">Question</label>
                <input className="input" type="text" id="question" placeholder="Question" />
              </div>
              <div>
                <label htmlFor="answer">Answer</label>
                <input className="input" type="text" id="answer" placeholder="Answer" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  );
}

export default memo(AddFaqs);