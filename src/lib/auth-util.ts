import { auth } from "@/auth";

/**
 * 로그인 된 유저가 있다면
 * ID를 반환하고,
 * 없다면 에러를 던진다
 * */
async function getUserIdThrows() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw Error("로그인 후 이용하세요");
  }

  return Number(userId);
}

const AuthUtil = {
  getUserIdThrows,
};

export default AuthUtil;
