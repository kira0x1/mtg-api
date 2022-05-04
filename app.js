const fs = require("fs");
const path = require("path");
const axios = require("axios").default;

const request = axios.create({
  baseURL: `https://api.scryfall.com`,
});
const cardsEndpoint = `/cards/named/`;

init();

async function init() {
  const resCard = await request.get(cardsEndpoint, {
    params: {
      fuzzy: `Spirited Comp`,
      format: "json",
    },
  });

  const imgUrl = resCard.headers["x-scryfall-card-image"];

  const cardStream = await axios.get(imgUrl, {
    responseType: "stream",
  });

  const stream = fs.createWriteStream(
    path.join(__dirname, `images/${resCard.data.name}.jpg`)
  );

  cardStream.data.pipe(stream);
}
