import { createContext, useState, useEffect } from "react";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  //L O A D I N G
  const [isLoading, setIsLoading] = useState(true);

  // F E E D B A C K
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  // F E T C H   F E E D B A C K  F R O M   B A C K E N D
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&_order=desc`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // D E L E T E   F E E D B A C K.
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete!")) {
      console.log(`Feedback ${id} deleted!!`);
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      const newFeedbackList = feedback.filter((item) => item.id !== id);
      setFeedback(newFeedbackList);
    }
  };

  // A D D   F E E D B A C K
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
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
  const updateFeedback = async (id, text, rating) => {
    const updatedItem = {
      id,
      text,
      rating,
    };

    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    setFeedback(
      feedback.map((i) => {
        return i.id === id ? { ...i, ...updatedItem } : i;
      })
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
