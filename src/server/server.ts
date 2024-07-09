import express from "express";

import apiRouter from "./api-router"
import config from "./config";
import serverRender from "./render";

const server = express()

server.use(express.static("dist"))

server.set("view engine", "ejs")

server.use("/api", apiRouter)

server.get(["/", "/contest/:contestId"], async (req, res) => {
    const { initialMarkup, initialData } = await serverRender(req);
    res.render("index", {
      initialMarkup,
      initialData,
    });
    console.log(`initial data ${JSON.stringify(initialData)}`);
  });

server.listen(config.PORT, config.HOST, () => {
    console.info((
        "Express server is listening"
    ))
})