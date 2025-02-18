import { useState, useEffect } from "react";
import LinkIcon from "./LinkIcon";
import { shortenUrl } from "../utils/api";
import ResponseBlock from "./ResponseBlock";
import Card from "./Card";
import { AnimatePresence } from "framer-motion";

const Form = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const [components, setComponents] = useState([]);

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

  const addComponent = () => {
    const newCard = {
      id: Date.now(), // Unique identifier
      url: "http://localhost/hhg3e", // Replace with dynamic short URL
    };
    setComponents((prev) => [...prev, newCard]);
  };

  const removeComponent = (id) => {
    setComponents((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <main className="flex-grow container mx-auto max-w-screen-lg p-4 border-1 border-red-950">
      <a
        onClick={addComponent}
        href="#"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        insert
      </a>

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
              className="formkit-submit w-full px-4 py-4 font-medium text-center text-white bg-indigo-600 border border-blue-700 cursor-pointer rounded-r-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-indigo-600 text-sm tracking-wide dark:bg-sky-500 dark:hover:bg-sky-400 dark:border-sky-500"
              value="Shorten!"
            />
          </div>
        </div>
        {/* AnimatePresence for smooth exit animations */}

        <div id="responseContainer" className={"mt-12"}>
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p>Error: {error}</p>
            </div>
          )}
          {shortUrl && <ResponseBlock url={shortUrl} resetPage={resetPage} />}
        </div>
      </form>
      <AnimatePresence>
        {components.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            url={card.url}
            onDismiss={removeComponent}
          />
        ))}
      </AnimatePresence>
    </main>
  );
};

export default Form;
