"use client";

import { useActionState, useState } from "react";
import { loginAction } from "./action";
import type { LoginState } from "./types";

export default function LoginScreenDaisyUI() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, loading] = useActionState<LoginState, FormData>(
    loginAction,
    { error: null },
  );

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="my-2 text-center">
            <h1 className="text-3xl font-bold">ログイン</h1>
          </div>

          <form action={formAction} className="space-y-4">
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
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/70 mt-2">
            アカウントをお持ちでないですか？{" "}
            <a href="#" className="link link-primary">
              新規登録
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
