import { useContext } from "react";
import FeedbackContext from "./context/FeedbackContext";

import { motion, AnimatePresence } from "framer-motion";
import FeedbackItem from "./FeedbackItem";

function FeedbackList() {
  const { feedback } = useContext(FeedbackContext);

  if (!feedback) {
    return <p>No Comments yet!!</p>;
  }

  return (
    <div className="feedback-list">
      {feedback.map((item, index) => (
        <AnimatePresence>
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem
              key={item.id}
              id={item.id}
              rating={item.rating}
              text={item.text}
            />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );

  // WITHOUT ANIMATION

  // return (
  //   <div className="feedback-list">
  //     {feedback.map((item, index) => (
  //       <FeedbackItem
  //         key={item.id}
  //         id={item.id}
  //         rating={item.rating}
  //         text={item.text}
  //         handleDelete={handleDelete}
  //       />
  //     ))}
  //   </div>
  // );
}

export default FeedbackList;
