const express = require("express");
const cors = require("cors");
const consola = require("consola");
const { PORT } = require("./config");
const fetch = require("node-fetch");
const { getSubscriptionRequest } = require("./utils/get-subscription-request");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2000kb" }));
app.get("/healthz", (_, res) => {
  res.send({ message: "OK" }).status(200);
});

app.post("/", async (req, res) => {
  const { email, name } = req.body;

  const { url, config } = getSubscriptionRequest(email, name);

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
});

app.listen(PORT, () =>
  consola.success(`Subscription proxy server is listening on port ${PORT}`)
);
