import { useState, useContext, useEffect } from "react";
import FeedbackContext from "./context/FeedbackContext";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

function FeedbackForm() {
  const { addFeedback, feedbackEdit, updateFeedback, feedback } =
    useContext(FeedbackContext);

  const [text, setText] = useState("");
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setbtnDisabled(false);
      setText(feedbackEdit.text);
      setRating(feedbackEdit.rating);
    }
  }, [feedbackEdit]);

  const textInputHandler = (e) => {
    if (text === "") {
      setbtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setbtnDisabled(true);
      setMessage("Text must be 10 characters long");
    } else {
      setbtnDisabled(false);
      setMessage(null);
    }

    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked!!");
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      console.log(feedbackEdit);
      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.id, text, rating);
      } else {
        console.log("Feedback Added!");
        addFeedback(newFeedback);
        
      }
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you like to rate us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            onChange={textInputHandler}
            value={text}
          />
          <Button type="submit" version="secondary" isDisabled={btnDisabled}>
            send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
