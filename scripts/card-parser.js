import fs from "fs";
import * as cheerio from "cheerio";

// Read the HTML file
const html = fs.readFileSync("card-table.html", "utf8");
const $ = cheerio.load(html);

const cards = [];

// Parse each row in the table body
$("tbody tr").each((i, row) => {
  const $row = $(row);
  const cells = $row.find("td");

  // Extract data from cells
  const cardNumber = $row.find("td:nth-child(2)").text().trim();
  const cardName = $row.find("td:nth-child(3) a").text().trim();
  const rarity = $row.find("td:nth-child(4)").text(); // Get text after line break
  const exclusivePack = $row
    .find("td:nth-child(5)")
    .text()
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((s) => s.trim()); // Split by newline and remove empty strings
  const type = $row.find("td:nth-child(6) img").attr("alt");
  const hp = $row.find("td:nth-child(7)").text().trim();
  const stage = $row.find("td:nth-child(8)").text().trim();

  // Extract image ID from the image URL
  const imageUrl = $row.find("td:nth-child(3) .imageLink").attr("data-image-url")?.trim() || "";

  const exclusivePackNameRaw = $row.find("td:nth-child(5)").html()?.split("<br>")[1]?.trim() || "";
  const exclusivePackName = exclusivePackNameRaw.replace(/<[^>]*>/g, "");
  const exclusivePackSeries = $row.find("td:nth-child(5)").html()?.split("<br>")[2]?.trim() || "";

  // Create card object
  const card = {
    cardNumber,
    cardName,
    rarity,
    exclusivePack: {
      name: exclusivePackName,
      series: exclusivePackSeries,
    },
    type: type?.replace("Pokemon TCG Pocket - ", "").trim(),
    hp: parseInt(hp) || 0,
    stage,
    imageUrl,
  };

  cards.push(card);
});

// Write to JSON file
const jsonOutput = JSON.stringify({ cards }, null, 2);
fs.writeFileSync("cards.json", jsonOutput);

console.log(`Successfully parsed ${cards.length} cards`);

// Delete the card-table.html file
try {
  fs.unlinkSync("card-table.html");
  console.log("Successfully deleted card-table.html");
} catch (error) {
  console.error("Error deleting card-table.html:", error);
}
