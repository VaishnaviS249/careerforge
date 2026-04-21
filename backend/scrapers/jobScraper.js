const puppeteer = require('puppeteer');
const Job = require('../models/Job');

const runScraper = async () => {
  console.log("🚀 Scraper started: Opening browser...");
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });

  const page = await browser.newPage();

  // Set a User-Agent so the website doesn't block you
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    console.log("🌐 Navigating to RemoteOK...");
    await page.goto('https://remoteok.com/remote-javascript-jobs', { 
      waitUntil: 'networkidle2', 
      timeout: 60000 
    });

    console.log("📄 Page loaded. Extracting job data...");

    const jobs = await page.evaluate(() => {
      // We look for rows with the class 'job'
      const rows = Array.from(document.querySelectorAll('tr.job'));
      
      return rows.map(el => {
        const title = el.querySelector('h2')?.innerText.trim();
        const company = el.querySelector('h3')?.innerText.trim();
        const urlPath = el.getAttribute('data-url');
        
        return {
          title: title,
          company: company,
          applyLink: urlPath ? "https://remoteok.com" + urlPath : null,
          source: "RemoteOK",
          location: "Remote",
        };
      });
    });

    // Filter out any null titles or empty links
    const validJobs = jobs.filter(j => j.title && j.applyLink);
    console.log(`✅ Found ${validJobs.length} valid jobs.`);

    // Save to Database
    let newCount = 0;
    for (let job of validJobs) {
      await Job.findOneAndUpdate(
       { applyLink: job.applyLink }, 
       { 
      $set: { 
        ...job, 
        postedAt: new Date() // Add it here instead!
      } 
       },
        { upsert: true }
       );
  newCount++;
    }

    console.log(`💾 Successfully synchronized ${newCount} jobs to MongoDB.`);

  } catch (error) {
    console.error("❌ Scraper Error:", error.message);
  } finally {
    await browser.close();
    console.log("🔒 Browser closed.");
  }
};

module.exports = runScraper;