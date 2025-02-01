import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function scrapeIcons() {
  try {
    // Fetch the webpage content
    const response = await fetch("https://game8.co/games/Pokemon-TCG-Pocket/archives/482824");
    const html = await response.text();

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    // Find the table and extract data
    const icons = [];

    // Select the table rows directly
    $("table tr").each((i, row) => {
      // Skip header row
      if (i === 0) return;

      const columns = $(row).find("td");
      if (columns.length >= 2) {
        // Get the image URL from the img element in the first column
        const imageUrl = $(columns[0]).find("img").attr("data-src");
        // Get the name from the second column
        const name = $(columns[0]).text().trim();

        if (name && imageUrl) {
          icons.push({
            name,
            imageUrl,
          });
        }
      }
    });

    // Create the output object
    const output = { icons };

    // Create icons directory if it doesn't exist
    const iconsDir = path.join(process.cwd(), "public", "icons");
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Download images and update URLs
    for (const icon of icons) {
      // Create slug from name
      const slug = icon.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      const filename = `${slug}.png`;
      const filepath = path.join(iconsDir, filename);

      // Skip if file exists
      if (!fs.existsSync(filepath)) {
        try {
          const response = await fetch(icon.imageUrl);
          if (!response.ok) throw new Error(`Failed to fetch ${icon.imageUrl}`);

          const buffer = await response.arrayBuffer();
          fs.writeFileSync(filepath, Buffer.from(buffer));
          console.log(`Downloaded ${filename}`);
        } catch (err) {
          console.error(`Error downloading ${filename}:`, err);
          continue;
        }
      }

      // Update imageUrl to local path
      icon.imageUrl = `/icons/${filename}`;
    }

    // Add this before writing the file
    if (!fs.existsSync(path.join(__dirname, "data"))) {
      fs.mkdirSync(path.join(__dirname, "data"));
    }

    // Write to JSON file
    const outputPath = path.join(__dirname, "data", "icons-data.json");
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log(`Successfully scraped ${icons.length} icons`);
    console.log(`Data saved to ${outputPath}`);
  } catch (error) {
    console.error("Error scraping icons:", error);
  }
}

// Run the scraper
scrapeIcons();
