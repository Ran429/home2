import { z } from "zod";

export const CreateEmployeeSchema = z.object({
  name: z.string({ required_error: "이름을 입력해주세요" }),
  responsibility: z.string({ required_error: "직책을 입력해주세요" }),
  works: z.string({ required_error: "업무를 입력해주세요" }),
  phone_number: z.string({ required_error: "전화번호를 입력해주세요" }),
  department: z.string({ required_error: "부서를 입력해주세요" }),
  sort_order: z.coerce.number({ required_error: "정렬순서를 입력해주세요" }),
});
