import puppeteer from "puppeteer";

const GFG_BASE_URL = "https://auth.geeksforgeeks.org/user/";

// Function to fetch GFG heatmap contributions as JSON
const fetchGFGHeatmapData = async (username) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const profileURL = `${GFG_BASE_URL}${username}/profile`;

  try {
    console.log(`🔹 Scraping GeeksforGeeks heatmap for ${username}...`);
    await page.goto(profileURL, { waitUntil: "networkidle2" });

    // Extracting contribution data from heatmap
    const heatmapData = await page.evaluate(() => {
      const heatmap = document.getElementById("cal-heatmap");
      if (!heatmap) return [];

      const rects = heatmap.querySelectorAll("rect.ch-subdomain-bg");
      return Array.from(rects).map((rect) => ({
        date: rect.getAttribute("data-date") || null,
        count: parseInt(rect.getAttribute("data-count") || "0", 10),
        color: rect.getAttribute("fill") || "rgb(0,0,0)", // Get the fill color
      }));
    });

    console.log(`✅ Successfully scraped heatmap data for ${username}`);
    return { username, heatmapData };
  } catch (error) {
    console.error("❌ Error scraping GFG heatmap:", error.message);
    throw new Error("Failed to scrape GFG heatmap data");
  } finally {
    await browser.close();
  }
};

// Express Controller to Return Heatmap Data as JSON
const getGFGHeatmap = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return res.status(400).json({ error: "Username is required" });

    const heatmapData = await fetchGFGHeatmapData(username);
    return res.status(200).json(heatmapData);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export { getGFGHeatmap };
