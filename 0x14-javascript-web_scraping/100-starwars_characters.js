#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.error('Usage: ./100-starwars_characters.js <Movie-ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  if (response.statusCode === 200) {
    const movie = JSON.parse(body);
    const characterUrls = movie.characters;

    // Function to get character names from their URLs
    const getCharacterNames = (urls) => {
      return new Promise((resolve) => {
        const characters = [];

        const fetchCharacter = (url) => {
          request(url, (err, res, body) => {
            if (!err && res.statusCode === 200) {
              const character = JSON.parse(body);
              characters.push(character.name);
              if (characters.length === urls.length) {
                resolve(characters);
              }
            } else {
              console.error(`Error fetching character: ${url}`);
              resolve(characters);
            }
          });
        };

        urls.forEach((url) => {
          fetchCharacter(url);
        });
      });
    };

    // Display character names
    getCharacterNames(characterUrls)
      .then((characters) => {
        characters.forEach((character) => {
          console.log(character);
        });
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  } else {
    console.error(`Failed to retrieve information. Status code: ${response.statusCode}`);
    process.exit(1);
  }
});
