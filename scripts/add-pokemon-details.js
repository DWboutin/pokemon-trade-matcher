import fs from "fs";
import { NON_POKEMON_TYPES } from "@/utils/contants";
// Read and parse the JSON file
const pokemonApiUrl = "https://pokeapi.co/api/v2/";
const cardsData = JSON.parse(fs.readFileSync("scripts/data/cards.json", "utf8"));

// Process all cards
async function updateCardsWithPokemonDetails() {
  for (const [index, card] of cardsData.cards.entries()) {
    if (NON_POKEMON_TYPES.includes(card.type)) {
      console.log(
        `${index + 1}/${cardsData.cards.length} - Skipped details for ${card.cardName}...`
      );
      continue;
    }
    try {
      let pokemonName = card.cardName
        .toLowerCase()
        .replace(" ex", "")
        .replace("'", "")
        .replace(" ", "-")
        .replace(".", "");

      if (pokemonName.includes("rotom")) {
        pokemonName = "rotom";
      }

      console.log(
        `${index + 1}/${cardsData.cards.length} - Fetching details for ${pokemonName}...`
      );

      const pokemonApiResponse = await fetch(`${pokemonApiUrl}pokemon-species/${pokemonName}`);
      const pokemonData = await pokemonApiResponse.json();
      const evolveFrom = pokemonData.evolves_from_species?.name;

      const pokemonEvolutionChain = await fetch(pokemonData.evolution_chain.url);
      const pokemonEvolutionChainData = await pokemonEvolutionChain.json();

      const evolvesTo = (function findPokemon(chain) {
        if (chain.species.name === pokemonName) {
          return chain.evolves_to.map((evolution) => evolution.species.name);
        }
        for (const evolution of chain.evolves_to) {
          const found = findPokemon(evolution);
          if (found) return found;
        }
        return null;
      })(pokemonEvolutionChainData.chain);

      // console.log("pokemonEvolutionChainData --->", pokemonEvolutionChainData.evolves_to);

      // Update card with pokemon ID
      card.pokemonId = pokemonData.id || null;
      card.evolvedFrom = evolveFrom || null;
      card.evolvesTo = evolvesTo.length > 0 ? evolvesTo : null;

      // Add a small delay to avoid rate limiting
      // await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      card.pokemonId = null;
      card.evolvedFrom = null;
      card.evolvesTo = null;
      console.error(`Error fetching details for ${card.cardName}:`, error.message);
    }
  }

  // Save the updated data back to the file
  fs.writeFileSync("scripts/data/cards.json", JSON.stringify(cardsData, null, 2), "utf8");

  console.log("Updated cards.json with Pokemon IDs");
}

// Run the update
updateCardsWithPokemonDetails();
