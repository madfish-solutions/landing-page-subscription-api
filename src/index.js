const express = require("express");
const cors = require("cors");
const consola = require("consola");
const { port } = require("./config");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2000kb" }));
app.get("/healthz", (_, res) => {
  res.send({ message: "OK" }).status(200);
});

app.post("/", async (req, res) => {
  const { email, name } = req.body;

  const { data, url, config } = getSubscriptionRequest(email, name);

  fetch(url, config)
    .then((response) => {
      if (response.status !== 200) {
        consola.error("Server error", response.status);
        res.send({ message: "Server error" }).status(400);
      } else {
        consola.info("Request sent");
        res.sendStatus(200);
      }
    })
    .catch((e) => {
      consola.error("Network error");
      consola.error(e);
      res.send({ message: "Network error" }).status(400);
    });

  try {
    for (const slug of req.body) {
      const { address, tokenId } = fromTokenSlug(slug);

      if (!address || !isValidContract(address) || !isNumeric(tokenId)) {
        consola.error(
          `Validation failed for contract ${address} and tokenId:${tokenId}`
        );
        return res
          .send({
            message: "Please, provide a valid token address and token id",
          })
          .status(400);
      }

      promises.push(getMetadata(address, tokenId).catch(() => null));
    }

    res.json(await Promise.all(promises));
  } catch (e) {
    res
      .send({ message: "Could not fetch metadata for provided tokens" })
      .status(400);
  }
});

app.listen(port, () =>
  consola.success(`Tezos token metadata server is listening on port ${port}`)
);
