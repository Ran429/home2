export type TimeLineDatum = {
  year: number;
  items: { month: string; description: string; html?: boolean }[];
};

export const TimeLineData: TimeLineDatum[] = [
  {
    year: 2024,
    items: [
      {
        month: "07",
        description:
          "학교용지 및 학교시설 무상공급 지원기관 신규지정<br/>지방교육행정기관 타당성조사 전문기관 신규지정",
        html: true,
      },
    ],
  },
];
