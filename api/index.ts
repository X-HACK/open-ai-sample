const dotenv = require("dotenv");
const express = require("express");
const OpenAI = require("openai");

// トークンの最大長を設定
const MAX_TOKEN_SIZE = 4096;

// expressアプリケーションを作成
const app = express();
// JSONボディパーサーを使用
app.use(express.json());
// 環境変数を読み込む
dotenv.config();

// ルートエンドポイント
app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/hello", (req, res) => res.send("Hello, World!"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server ready on port 3000."));

// 使用例
// curl -X POST -H "Content-Type: application/json" -d '{"image_url":"https://sample/image.jpg"}' http://localhost:3000/post
app.post("/post", async (req, res) => {
  console.log({ body: req.body });

  // parameter に text か image_url がない場合は 200 で返す
  if (!req.body.text && !req.body.image_url) {
    res.status(200).send("text または image_url を指定してください。");
    return;
  }

  if (req.body.text) {
    res.send(await requestTextDescription(req.body.text));
  } else if (!req.body.image_url.match(/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/)) {
    res.send(await requestImageDescription(req.body.image_url));
  }
});

// 画像について質問する
async function requestImageDescription(image_url: any) {
  try {
    // 初期化
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-05-13",
      max_tokens: MAX_TOKEN_SIZE,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "この画像について説明してください。"
            },
            {
              type: "image_url",
              image_url: {
                "url": image_url,
              },
            },
          ],
        },
      ],
    });
    console.log({ content: response.choices[0]["message"]["content"] });
    return response.choices[0]["message"]["content"];
  } catch (error) {
    console.error(error);
    return error;
  }
}

// テキストで質問する
async function requestTextDescription(text: any) {
  try {
    // 初期化
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-05-13",
      max_tokens: MAX_TOKEN_SIZE,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: text
            },
          ],
        },
      ],
    });
    console.log({ content: response.choices[0]["message"]["content"] });
    return response.choices[0]["message"]["content"];
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = app;
