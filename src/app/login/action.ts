"use server";

import { auth } from "@/lib/auth";
import { LoginState } from "./types";

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "メールアドレスとパスワードを入力してください。" };
  }

  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true,
  });

  if (!response.ok) {
    return { error: "ログインに失敗しました。" };
  }
  return { error: "ログイン成功" }; // todo
}
