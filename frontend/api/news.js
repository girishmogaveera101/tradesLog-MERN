export default async (req, res) => {
    try {
      const API_KEY = process.env.NEWS_API;
      const response = await fetch(`https://newsapi.org/v2/everything?q=crypto&apiKey=${API_KEY}`);
      if (!response.ok) throw new Error(`Failed to fetch news: ${response.statusText}`);
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  