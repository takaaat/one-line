## one-line web app

### setup

supabaseのprojectを作成し、「Connect」からDrizzle ORMを選択し、そこから`.env` に必要な環境変数を追加してください。

`BETTER_AUTH_SECRET` は `openssl rand -base64 32` などでキーを生成して使用してください。

その後、`pnpm run db:generate`したのち、 `pnpm run db:migrate` してください。
