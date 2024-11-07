# open-ai-sample

このリポジトリは、vercelでopen ai の API を実行することができる
簡易的なモジュールを作成するための最低限のコードを記載しています

手順に従って、vercel に deploy するだけで利用できます

# 準備
1. OpenAI API Key を取得する
  API KEY を取得しておく

2. git clone 
  ```
  $ git clone https://github.com/X-HACK/open-ai-sample.git
  ```

3. change directory
  ```
  $ cd open-ai-sample
  ```

4. npm install
  ```
  $ npm install
  ```

5. vercel login
  ```
  $ vercel login
  ```

6. `.env` ファイルを作成して、keyを登録する
  ```
  $ cp .env.sample .env
  ```
  .envファイルに、step.1 で取得したkeyをセットする
  