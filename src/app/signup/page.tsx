"use client";

import { useActionState, useState } from "react";
import { signupAction } from "./action";

export type SignupState = {
  error: string | null;
};

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, loading] = useActionState<SignupState, FormData>(
    signupAction,
    { error: null },
  );

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="my-2 text-center">
            <h1 className="text-3xl font-bold">新規登録</h1>
          </div>

          <form action={formAction} className="space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">ユーザー名</legend>
              <input
                type="text"
                name="username"
                className="input w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">メールアドレス</legend>
              <input
                type="email"
                name="email"
                className="input w-full"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">パスワード</legend>
              <input
                type="password"
                name="password"
                className="input w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </fieldset>

            {state.error ? (
              <p className="text-sm text-error">{state.error}</p>
            ) : null}

            <button
              type="submit"
              className={`btn btn-primary w-full mt-2 ${loading ? "btn-disabled" : ""}`}
              disabled={loading}
            >
              {loading ? "登録中..." : "アカウント登録"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/70 mt-2">
            アカウントを既にお持ちの場合{" "}
            <a href="/login" className="link link-primary">
              ログイン
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
