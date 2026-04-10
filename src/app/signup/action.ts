"use server";

import { auth } from "@/lib/auth";
import { SignupState } from "./page";

export async function signupAction(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return {
      error: "ユーザー名、メールアドレスとパスワードを入力してください。",
    };
  }

  const response = await auth.api.signUpEmail({
    body: {
      name: username,
      email,
      password,
    },
    asResponse: true,
  });

  if (!response.ok) {
    return { error: "登録に失敗しました。" };
  }
  return { error: "新規登録成功" }; // todo
}
