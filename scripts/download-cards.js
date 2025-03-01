import fs from "fs";
import path from "path";
import https from "https";

// Read and parse the JSON file
const cardsData = JSON.parse(fs.readFileSync("scripts/data/cards.json", "utf8"));

// Create the cards directory if it doesn't exist
const downloadDir = path.join("public", "cards");
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(downloadDir, filename);

    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`Skipping ${filename} - already exists`);
      resolve();
      return;
    }

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`Downloaded ${filename}`);
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(filepath, () => {}); // Delete the file if there was an error
          reject(err);
        });
      })
      .on("error", reject);
  });
}

// Download all images
async function downloadAllImages() {
  const cards = cardsData.cards;

  for (const card of cards) {
    const imageUrl = card.imageUrl;
    const filename = `${card.cardNumber.replace(/\s/g, "_")}.png`;

    try {
      await downloadImage(imageUrl, filename);
      // Add a small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error.message);
      console.error("--- ", imageUrl);
    }
  }
}

// Run the download
downloadAllImages()
  .then(() => {
    console.log("All downloads completed!");
  })
  .catch((error) => {
    console.error("Download process failed:", error);
  });
