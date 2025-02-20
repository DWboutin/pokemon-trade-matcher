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
      "body > div.p-archiveBody__container > div.p-archiveBody__main > div.p-archiveContent__container > div.p-archiveContent__main > div.archive-style-wrapper > div.scroll--table.table-header--fixed > table"
    );

    if (!table.length) {
      throw new Error("Table not found");
    }

    // Save the table HTML to a file
    await fs.writeFile("scripts/data/card-table.html", table.toString());

    console.log("Successfully saved card table to card-table.html");
  } catch (error) {
    console.error("Error fetching card table:", error);
  }
}

// Run the function
fetchCardTable();
