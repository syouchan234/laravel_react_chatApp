# ベースイメージを指定
FROM node:16-alpine

# コンテナ内の作業ディレクトリを設定
WORKDIR /app

# ホストからアプリケーションコードをコピー
COPY . .

# 依存関係のインストール
RUN npm install

# ビルド
RUN npm run build

# ポートのエクスポート
EXPOSE 3000

# サーバーの起動
CMD ["npm", "start"]
