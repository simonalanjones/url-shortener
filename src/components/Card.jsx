import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Card = ({ id, url, onDismiss }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0, y: 100 }}
    transition={{ duration: 0.4 }}
    className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
      {url}
    </h5>
    <button
      onClick={() => onDismiss(id)}
      className="mt-4 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
    >
      Dismiss
    </button>
  </motion.div>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired, // Validate `url` as a required string
  onDismiss: PropTypes.func.isRequired, // Validate `resetPage` as a required function
};

export default Card;
