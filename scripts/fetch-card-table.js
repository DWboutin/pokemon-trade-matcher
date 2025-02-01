import * as cheerio from "cheerio";
import fs from "fs/promises";

async function fetchCardTable() {
  try {
    // Fetch the webpage content
    const response = await fetch("https://game8.co/games/Pokemon-TCG-Pocket/archives/482685");
    const html = await response.text();

    // Load HTML content into cheerio
    const $ = cheerio.load(html);

    // Get the table using the selector
    const table = $(
      "body > div.l-content > div.l-3col > div.l-3colMain > div.l-3colMain__center.l-3colMain__center--shadow > div.archive-style-wrapper > div.scroll--table.table-header--fixed > table"
    );

    // Save the table HTML to a file
    await fs.writeFile("card-table.html", table.toString());

    console.log("Successfully saved card table to card-table.html");
  } catch (error) {
    console.error("Error fetching card table:", error);
  }
}

// Run the function
fetchCardTable();
