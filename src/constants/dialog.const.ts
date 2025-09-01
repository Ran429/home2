export const DIALOG_TYPE = {
  PRIVACY_POLICY: { code: "PRIVACY_POLICY", text: "개인정보처리방침" },
  COPYRIGHT_POLICY: { code: "COPYRIGHT_POLICY", text: "저작권 보호정책" },
  EMAIL_POLICY: { code: "EMAIL_POLICY", text: "이메일 무단수집 거부" },
};

export const DIALOG_TYPES = [
  DIALOG_TYPE.PRIVACY_POLICY,
  DIALOG_TYPE.COPYRIGHT_POLICY,
  DIALOG_TYPE.EMAIL_POLICY,
];

export function getDialogType(dialogType: string) {
  return DIALOG_TYPES.find((type) => type.code === dialogType);
}
