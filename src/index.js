const express = require("express");
const cors = require("cors");
const consola = require("consola");
const { port } = require("./config");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2000kb" }));
app.get("/healthz", (_, res) => {
  res.send({ message: "OK" }).status(200);
});

app.post("/", async (req, res) => {});

app.listen(port, () =>
  consola.success(`Tezos token metadata server is listening on port ${port}`)
);
