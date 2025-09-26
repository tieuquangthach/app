export interface QuizQuestion {
  cauHoi: string;
  dapAn: string;
}

export const COGNITIVE_LEVELS_DOC = ['Biết', 'Hiểu', 'Vận dụng'] as const;
export type CognitiveLevelDoc = typeof COGNITIVE_LEVELS_DOC[number];
export type LevelCountsDoc = Record<CognitiveLevelDoc, number>;

export const QUESTION_TYPES = ['Nhiều lựa chọn', 'Đúng - Sai', 'Trả lời ngắn', 'Tự luận'] as const;
export type QuestionType = typeof QUESTION_TYPES[number];


export interface MatrixRow {
  id: string; 
  topic: string;
  knowledgeUnit: string;
  percentage: number;
  counts: Record<QuestionType, LevelCountsDoc>;
}

export type QuizMatrix = MatrixRow[];

export interface SpecificationItem {
  chuDe: string;
  noiDung: string;
  yeuCauCanDat: string;
  loaiCauHoi: QuestionType;
  mucDo: CognitiveLevelDoc;
  soLuong: number;
}

export type QuizSpecification = SpecificationItem[];

export interface Theme {
  name: string;
  colors: {
    'primary': string;
    'secondary': string;
    'gradient-from': string;
    'gradient-to': string;
    'text-main': string;
    'text-muted': string;
    'text-accent': string;
  };
}

export const themes: Theme[] = [
  {
    name: 'Mặc định',
    colors: {
      'primary': '#4338ca', // indigo-700
      'secondary': '#16a34a', // green-600
      'gradient-from': '#e0f2fe', // sky-100
      'gradient-to': '#c7d2fe', // indigo-200
      'text-main': '#1f2937', // gray-800
      'text-muted': '#4b5563', // gray-600
      'text-accent': '#4f46e5', // indigo-600
    },
  },
  {
    name: 'Hoàng hôn',
    colors: {
      'primary': '#ea580c', // orange-600
      'secondary': '#dc2626', // red-600
      'gradient-from': '#fff7ed', // orange-50
      'gradient-to': '#fee2e2', // red-100
      'text-main': '#1f2937',
      'text-muted': '#4b5563',
      'text-accent': '#f97316', // orange-500
    },
  },
  {
    name: 'Đại dương',
    colors: {
      'primary': '#2563eb', // blue-600
      'secondary': '#0d9488', // teal-600
      'gradient-from': '#ecfeff', // cyan-50
      'gradient-to': '#dbeafe', // blue-100
      'text-main': '#1f2937',
      'text-muted': '#4b5563',
      'text-accent': '#3b82f6', // blue-500
    },
  },
  {
    name: 'Rừng xanh',
    colors: {
      'primary': '#166534', // green-800
      'secondary': '#65a30d', // lime-600
      'gradient-from': '#f0fdf4', // green-50
      'gradient-to': '#ecfccb', // lime-100
      'text-main': '#1f2937',
      'text-muted': '#4b5563',
      'text-accent': '#22c55e', // green-500
    },
  },
];

export const QUESTION_TYPE_POINTS: Record<QuestionType, number> = {
  'Nhiều lựa chọn': 0.25,
  'Đúng - Sai': 1.0,
  'Trả lời ngắn': 0.5,
  'Tự luận': 1.0,
};

export const QUESTION_TYPE_TARGETS: Record<QuestionType, number> = {
  'Nhiều lựa chọn': 12,
  'Đúng - Sai': 2,
  'Trả lời ngắn': 4,
  'Tự luận': 3,
};

export const COGNITIVE_LEVEL_TARGET_POINTS: Record<CognitiveLevelDoc, number> = {
  'Biết': 4,
  'Hiểu': 3,
  'Vận dụng': 3,
};
