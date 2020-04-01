import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import path from "path";
import fs from "fs";

//asset-menifest.json 파일 경로를 조회한다.
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf8")
);

console.log("manifest");

const chunks = Object.keys(manifest.files)
  .filter(key => /chunk\.js$/.exec(key)) //chunk.js로 끝나는 키를 찾아서
  .map(key => `<script src="${manifest.files[key]}"></script>`) //script 태그로 변환하고
  .join(""); // 합친다.

console.log("chunk");
function createPage(root) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8"/>
      <link rel="shortcut icon" href = "/favicon.ico"/>
      <meta
        name = "viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      <meta name="theme-color" content="#000000"/>
      <title>React App</title>
      <link href="${manifest.files["main.css"]}" rel="stylesheet"/>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      <script src="${manifest.files["runtime~main.js"]}"></script>
      ${chunks}
      <script src="${manifest.files["main.js"]}"></script>
    </body>
  </html>
  `;
}

const app = express();
//서버사이드 렌더링을 처리할 핸들러함수
const serverRender = (req, res, next) => {
  //404가 떠야하는 상황에서 서버사이드 렌더링을 진행한다.

  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const root = ReactDOMServer.renderToString(jsx);
  res.send(createPage(root)); //결과물 응답
};

const serve = express.static(path.resolve("./build"), {
  index: false // "/" 경로에서 index.html을 보여주지 않는다.
});

app.use(serve);
app.use(serverRender);
app.listen(5000, () => {
  console.log("Running on http://localhost:5000");
});
