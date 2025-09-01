/**
 * FormData 에 파일을 추가한다.
 * next.js 에서 현재 일반 multipart formdata로 보내면 파일 이름이 꺠지므로
 * formData에 추가적으로 filesNames를 넣어준다.
 * @param files
 * @param formData
 */
export function addFilesToFormData(
  files: File[],
  formData: FormData,
  propertyName: string = "files"
) {
  for (const file of files) {
    formData.append(
      propertyName,
      new File([file], file.name, { type: file.type })
    );
    formData.append(propertyName + "Names", file.name);
  }
}

export const IMAGE_EXTENSION = ["jpg", "jpeg", "png"];

/**
 * 파일 확장자가 유효한 확장자인지 검사한다
 * @param files
 * @param allowedExtension
 * @returns
 */
export function validateFileExtension(
  files: File[],
  allowedExtension: string[]
) {
  const extensions = files.map((file) =>
    file.name.substring(file.name.lastIndexOf(".") + 1)
  );

  for (const extension of extensions) {
    if (!allowedExtension.includes(extension)) {
      return false;
    }
  }

  return true;
}
