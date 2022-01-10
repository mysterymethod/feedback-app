import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // F E E D B A C K
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is dummy text 1",
      rating: 7,
    },
    {
      id: 2,
      text: "This is dummy text 2",
      rating: 3,
    },
    {
      id: 3,
      text: "This is dummy text 3",
      rating: 5,
    },
  ]);

  // D E L E T E   F E E D B A C K.
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete!")) {
      console.log(`Feedback ${id} deleted!!`);
      const newFeedbackList = feedback.filter((item) => item.id !== id);
      setFeedback(newFeedbackList);
    }
  };

  // A D D   F E E D B A C K
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // E D I T   F E E D B A C K
  const [feedbackEdit, setFeedbackEdit] = useState({
    id: null,
    rating: null,
    text: null,
    edit: false,
  });

  const editFeedback = (id, rating, text) => {
    // console.log(id, rating, text);
    setFeedbackEdit({
      id: id,
      rating: rating,
      text: text,
      edit: true,
    });
  };

  // U P D A T E   F E E D B A C K
  const updateFeedback = (id, text, rating) => {
    const updatedItem = {
      id,
      text,
      rating,
    }
    setFeedback(
      feedback.map( (i) => {
        return i.id === id ? {...i , ...updatedItem} : i
      })
    )
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
