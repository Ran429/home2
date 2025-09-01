export const EmpoloyeeSearchType = {
  ALL: {
    code: "all",
    text: "전체",
  },
  NAME: {
    code: "name",
    text: "성명",
  },
  DEPT: {
    code: "dept",
    text: "부서",
  },
  JOB_GRADE: {
    code: "job_grade",
    text: "직책",
  },
  PHONE_NUMBER: {
    code: "phone_number",
    text: "연락처",
  },
};

export const EmpoloyeeSearchTypes = [
  EmpoloyeeSearchType.ALL,
  EmpoloyeeSearchType.NAME,
  EmpoloyeeSearchType.JOB_GRADE,
  EmpoloyeeSearchType.DEPT,
  EmpoloyeeSearchType.PHONE_NUMBER,
];
