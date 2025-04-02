import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load production environment variables
dotenv.config({ path: join(__dirname, "../.env.production") });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SERVICE_ROLE);

const baseUrl = "https://pokeswap.io";

// Function to slugify card name and number for URL
function slugifyCard(card) {
  const name = card.cardName.toLowerCase().replace(/[ .:]/g, "-").replace(/'/g, "");
  const cardNumber = card.cardNumber.replace(/\s/g, "-");
  return `${name}-${cardNumber}`;
}

async function generateSitemap() {
  try {
    // Fetch all trades
    const { data: trades, error: tradesError } = await supabase.from("trades").select("id");

    if (tradesError) throw tradesError;

    // Start XML content
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    const staticPages = ["", "/trades", "/trades/create", "/library", "/auth"];

    // Add static URLs
    staticPages.forEach((page) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page === "" ? "1.0" : "0.8"}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add dynamic trade pages
    trades.forEach((trade) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/trades/${trade.id}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    // Add library card pages
    // Read the cards.json file
    const cardsJson = JSON.parse(fs.readFileSync(join(__dirname, "../cards.json"), "utf8"));
    const cards = cardsJson.cards || [];

    cards.forEach((card) => {
      const cardSlug = slugifyCard(card);
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/library/${cardSlug}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.5</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += "</urlset>";

    // Write the sitemap file
    fs.writeFileSync(join(__dirname, "../public/sitemap.xml"), xml);
    console.log("Sitemap generated successfully!");

    // Generate robots.txt if it doesn't exist
    const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`;
    fs.writeFileSync(join(__dirname, "../public/robots.txt"), robotsTxt);
    console.log("robots.txt generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
}

generateSitemap();
