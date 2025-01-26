export const shortenUrl = async (url) => {
  try {
    const response = await fetch("http://localhost/url-shortener/index.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { success: true, shortUrl: data.shortUrl };
    } else {
      return {
        success: false,
        error: data.error || "Failed to shorten the URL.",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again later.",
    };
  }
};
