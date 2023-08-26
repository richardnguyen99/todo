import express from "express";

const app = express();

app.get("/", (_req, res) => {

  res.status(200);
  res.contentType("application/json");
  res.json({ message: "Hello, World!", status: 200 });
});


export default app;
