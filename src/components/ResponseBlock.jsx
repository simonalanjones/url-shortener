import PropTypes from "prop-types";
import { useState } from "react";

const ResponseBlock = ({ url, resetPage }) => {
  const [copied, setCopied] = useState(false);

  const messageClass = copied
    ? "visible font-semibold text-xs text-sky-600 uppercase tracking-wider text-center mt-2 "
    : "invisible font-semibold text-xs text-sky-600 uppercase tracking-wider text-center mt-2";

  const copyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <div className="pb-4 rounded-lg mx-auto px-6">
      <p className="pb-1 text-xs text-center uppercase tracking-wider font-semibold text-sky-600">
        Short URL
      </p>
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-sky-600 size-6 mb-2"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-center text-slate-600 text-base display-block truncate">
        <a
          className="font-mono text-slate-600 hover:text-sky-600"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {url}
        </a>
      </p>
      <div className="mx-auto w-fit mt-6">
        <button
          onClick={() => copyUrl(url)} // Copy URL on button click
          type="button"
          aria-label="Copy the short URL to clipboard"
          className="text-white bg-sky-500 focus:outline-none hover:bg-sky-600 border-sky-300 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Copy URL
        </button>

        <button
          type="button"
          onClick={resetPage}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Reset
        </button>

        <div id="copiedMessageContainer" className={messageClass}>
          URL copied to clipboard
        </div>
      </div>
    </div>
  );
};

ResponseBlock.propTypes = {
  url: PropTypes.string.isRequired, // Validate `url` as a required string
  resetPage: PropTypes.func.isRequired, // Validate `resetPage` as a required function
};

export default ResponseBlock;
