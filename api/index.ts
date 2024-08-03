const dotenv = require("dotenv");
const express = require("express");
const OpenAI = require("openai");

// expressアプリケーションを作成
const app = express();
// JSONボディパーサーを使用
app.use(express.json());
// 環境変数を読み込む
dotenv.config();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/hello", (req, res) => res.send("Hello, World!"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server ready on port 3000."));

// curl -X POST -H "Content-Type: application/json" -d '{"image_url":"https://sample/image.jpg"}' http://localhost:3000/post
app.post("/post", async (req, res) => {
	console.log({ body: req.body });
	const content = await main(req.body.image_url);

	res.send(content);
});

async function main(image_url) {
	try {
		// 初期化
		const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

		const response = await openai.chat.completions.create({
			model: "gpt-4o-2024-05-13",
			max_tokens: 4096,
			// prompt: "あなたは画像を見ています。画像について説明してください。",
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

module.exports = app;
