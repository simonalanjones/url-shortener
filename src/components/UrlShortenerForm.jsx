import { useState, useEffect } from "react";
import LinkIcon from "./LinkIcon";
import { shortenUrl } from "../utils/api";
import ResponseBlock from "./ResponseBlock";

const UrlShortenerForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.getElementById("url")?.focus();
  }, []); // Focus input on mount

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Prevent default form behaviour

    try {
      const data = await shortenUrl(longUrl); // Use centralised API call
      if (data.success) {
        setShortUrl(data.shortUrl); // On success, update short URL
        setError(""); // Clear any previous errors
      } else {
        setShortUrl("");
        setError(data.error || "Failed to shorten the URL.");
      }
    } catch (err) {
      console.error("Error:", err);
      setShortUrl("");
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event); // Call submit when "Enter" is pressed
    }
  };

  const resetPage = () => {
    setError("");
    setShortUrl("");
    setLongUrl(""); // Clear the state controlling the input field
    document.getElementById("url").focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex max-w-2xl mx-auto px-10">
        <div className="w-full">
          <label htmlFor="url" className="hidden">
            URL
          </label>
          <div className="relative h-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <LinkIcon className="size-5" />
            </div>
            <input
              autoComplete="off"
              type="input"
              id="url"
              name="url"
              className="block w-full px-3 py-4 pl-11 text-gray-900 bg-gray-100 border border-gray-200 rounded-l-xl 
                formkit-input focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              placeholder="Enter your long URL here"
              required
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)} // Update the long URL state
              onKeyDown={handleKeyDown} // Handle Enter key
            />
          </div>
        </div>
        <div>
          <input
            name="submit"
            type="submit"
            id="submit"
            className="formkit-submit w-full px-4 py-4 font-medium text-center text-white bg-indigo-600 border border-blue-700 cursor-pointer rounded-r-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-indigo-600 text-sm tracking-wide"
            value="Shorten!"
          />
        </div>
      </div>

      <div id="responseContainer" className={"mt-12"}>
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p>Error: {error}</p>
          </div>
        )}
        {shortUrl && <ResponseBlock url={shortUrl} resetPage={resetPage} />}
      </div>
    </form>
  );
};

export default UrlShortenerForm;
