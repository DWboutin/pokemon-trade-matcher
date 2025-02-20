import fs from "fs";
import * as cheerio from "cheerio";

// Read the HTML file
const html = fs.readFileSync("scripts/data/card-table.html", "utf8");
const $ = cheerio.load(html);

const cards = [];

// Parse each row in the table body
$("tbody tr").each((i, row) => {
  const $row = $(row);

  // Extract data from cells
  const cardNumber = $row.find("td:nth-child(2)").text().trim();
  const cardName = $row.find("td:nth-child(3) a").text().trim();
  const rarity = $row.find("td:nth-child(4)").text(); // Get text after line break
  const type = $row.find("td:nth-child(6) img").attr("alt");
  const hp = $row.find("td:nth-child(7)").text().trim();
  const stage = $row.find("td:nth-child(8)").text().trim();
  const effects = $row.find("td:nth-child(10)").html()?.trim() || "";

  // Clean up effects by keeping only content after horizontal line
  const effectsMatch = effects.match(/<hr class="a-table__line">([\s\S]*)/);
  const cleanedEffects = effectsMatch ? effectsMatch[1].trim() : "";

  // Split effects into parts based on div.align sections
  const effectParts = cleanedEffects
    .split('<div class="align">')
    .slice(1) // Skip the first empty item from the split
    .map((part) => part.replace(/<\/div>/g, "").trim())
    .filter(Boolean);

  // console.log(effectParts);

  // Parse effects into structured format
  const parsedEffects = effectParts.map((part) => {
    const $effect = cheerio.load(part);

    // Get effect name from bold tag
    const name = $effect("b.a-bold").text().trim();

    // Parse cost elements
    const costElements = [];
    let damage = 0;
    let description = "";

    $effect("img").each((_, img) => {
      const element = $effect(img).attr("alt")?.replace("Pokemon TCG Pocket - ", "").toLowerCase();
      const elementMatch = element?.match(/(\d+)/);
      const count = elementMatch ? parseInt(elementMatch[1]) : 1;
      const cleanElement = element?.replace(/\d+/g, "").trim();

      if (cleanElement) {
        costElements.push({
          element: cleanElement,
          count: count,
        });
      }
    });

    // Get text content after images
    const textContent = $effect.text().trim();

    // Match damage number and description
    const damageMatch = textContent.match(/(\d+)(.*)/);

    if (damageMatch) {
      const [, damageValue] = damageMatch;
      damage = parseInt(damageValue);
    }

    const parsedDescription = textContent.split("\n").pop();

    description = parsedDescription === damage.toString() ? "" : parsedDescription;

    return {
      name,
      cost: costElements,
      damage,
      description,
    };
  });

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
    effects: parsedEffects,
  };

  cards.push(card);
});

// Write to JSON file
const jsonOutput = JSON.stringify({ cards }, null, 2);
fs.writeFileSync("scripts/data/cards.json", jsonOutput);

console.log(`Successfully parsed ${cards.length} cards`);

// Delete the card-table.html file
try {
  fs.unlinkSync("scripts/data/card-table.html");
  console.log("Successfully deleted card-table.html");
} catch (error) {
  console.error("Error deleting card-table.html:", error);
}
