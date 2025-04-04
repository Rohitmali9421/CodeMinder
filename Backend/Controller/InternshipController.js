
import puppeteer from "puppeteer";

export const FetchInternships = async(req,res)=>{

    const { category } = req.query;
    console.log(category)
    if (!category) return res.status(400).json({ error: "Category is required" });
  
    const URL = `https://internshala.com/internships/${encodeURIComponent(category)}-internship`;
  
    try {
        console.log(`🚀 Opening category page: ${URL}`);
        const browser = await puppeteer.launch({ headless: true }); // Run in background
        const page = await browser.newPage();
        await page.goto(URL, { waitUntil: "networkidle2" });
        await page.waitForSelector(".internship_meta");
    
        const internships = await page.evaluate(() => {
          return Array.from(document.querySelectorAll(".internship_meta"))
            .slice(0, 15) // Limit to 10 results
            .map(el => ({
              title: el.querySelector("h3 a")?.innerText.trim() || "",
              company: el.querySelector(".company_name")?.innerText.trim() || "Unknown Company",
              location: el.querySelector(".locations .ic-16-map-pin")?.innerText.trim() || "No Location",
              link: el.querySelector("a")?.href || "No Link",
              logo: el.querySelector(".internship_logo img")?.src || "No Logo",
              duration: el.querySelector(".ic-16-calendar + span")?.innerText.trim() || "Duration Not Specified",
              stipend: el.querySelector(".ic-16-money + span")?.innerText.trim() || "Unpaid",
            }));
        });
    
        await browser.close();
        res.json(internships);
      } catch (error) {
        console.error("🚨 Error fetching internships:", error.message);
        res.status(500).json({ error: "Failed to fetch internships" });
      }

}