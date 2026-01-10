
import { QuizMatrix, MatrixRow, QUESTION_TYPES, COGNITIVE_LEVELS_DOC, LevelCountsDoc, QuestionType } from '../types';

const createEmptyCounts = (): Record<QuestionType, LevelCountsDoc> => {
  return QUESTION_TYPES.reduce((acc, type) => {
    acc[type] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
      levelAcc[level] = 0;
      return levelAcc;
    }, {} as LevelCountsDoc);
    return acc;
  }, {} as Record<QuestionType, LevelCountsDoc>);
};

export interface SampleMatrix {
  id: string;
  name: string;
  subject: string;
  grade: string;
  rows: Omit<MatrixRow, 'id'>[];
}

export const sampleMatrices: SampleMatrix[] = [
  {
    id: 'toan-6-gk1-chuan-73',
    name: 'Toán 6 - Giữa kì 1 (Chuẩn 7/3)',
    subject: 'Toán',
    grade: '6',
    rows: [
      {
        topic: 'Số tự nhiên',
        knowledgeUnit: 'Số tự nhiên và tập hợp các số tự nhiên. Thứ tự trong tập hợp các số tự nhiên',
        learningOutcome: 'Nhận biết được tập hợp các số tự nhiên, các phần tử của tập hợp. Biết sử dụng các kí hiệu tập hợp.',
        percentage: 10,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 4, 'Hiểu': 0, 'Vận dụng': 0 }
        }
      },
      {
        topic: 'Số tự nhiên',
        knowledgeUnit: 'Các phép tính với số tự nhiên. Phép tính luỹ thừa với số mũ tự nhiên',
        learningOutcome: 'Thực hiện được các phép tính: cộng, trừ, nhân, chia trong tập hợp số tự nhiên. Tính được giá trị của một lũy thừa.',
        percentage: 25,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 2, 'Hiểu': 2, 'Vận dụng': 0 },
          'Tự luận': { 'Biết': 0, 'Hiểu': 1, 'Vận dụng': 0 }
        }
      },
      {
        topic: 'Số tự nhiên',
        knowledgeUnit: 'Tính chia hết trong tập hợp các số tự nhiên. Số nguyên tố. Ước chung và bội chung',
        learningOutcome: 'Nhận biết được số nguyên tố, hợp số. Tìm được ƯC và BC của hai hoặc ba số tự nhiên.',
        percentage: 20,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 2, 'Hiểu': 2, 'Vận dụng': 0 },
          'Trả lời ngắn': { 'Biết': 0, 'Hiểu': 2, 'Vận dụng': 0 }
        }
      },
      {
        topic: 'Các hình phẳng trong thực tiễn',
        knowledgeUnit: 'Tam giác đều, hình vuông, lục giác đều',
        learningOutcome: 'Nhận dạng được tam giác đều, hình vuông, lục giác đều. Mô tả được một số yếu tố cơ bản của các hình này.',
        percentage: 20,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 2, 'Hiểu': 2, 'Vận dụng': 0 },
          'Đúng - Sai': { 'Biết': 1, 'Hiểu': 0, 'Vận dụng': 0 }
        }
      },
      {
        topic: 'Các hình phẳng trong thực tiễn',
        knowledgeUnit: 'Hình chữ nhật, hình thoi, hình bình hành, hình thang cân',
        learningOutcome: 'Tính được chu vi và diện tích của hình chữ nhật, hình vuông, hình tam giác, hình thang.',
        percentage: 25,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 2, 'Hiểu': 2, 'Vận dụng': 0 },
          'Đúng - Sai': { 'Biết': 0, 'Hiểu': 1, 'Vận dụng': 0 },
          'Trả lời ngắn': { 'Biết': 0, 'Hiểu': 2, 'Vận dụng': 0 },
          'Tự luận': { 'Biết': 0, 'Hiểu': 1, 'Vận dụng': 1 }
        }
      }
    ]
  },
  {
    id: 'khtn-6-gk1-chuan-73',
    name: 'KHTN 6 - Giữa kì 1 (Chuẩn 7/3)',
    subject: 'KHTN',
    grade: '6',
    rows: [
      {
        topic: 'Mở đầu',
        knowledgeUnit: 'Giới thiệu về Khoa học tự nhiên',
        learningOutcome: 'Nêu được khái niệm Khoa học tự nhiên. Trình bày được vai trò của Khoa học tự nhiên trong đời sống.',
        percentage: 10,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 4, 'Hiểu': 0, 'Vận dụng': 0 }
        }
      },
      {
        topic: 'Các phép đo',
        knowledgeUnit: 'Đo chiều dài, khối lượng, thời gian',
        learningOutcome: 'Thực hiện được các phép đo chiều dài, khối lượng, thời gian bằng các dụng cụ đo thông dụng.',
        percentage: 30,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 4, 'Hiểu': 4, 'Vận dụng': 0 },
          'Tự luận': { 'Biết': 0, 'Hiểu': 1, 'Vận dụng': 0 }
        }
      },
      {
        topic: 'Các thể của chất',
        knowledgeUnit: 'Sự đa dạng của chất. Các thể cơ bản của chất',
        learningOutcome: 'Nêu được sự đa dạng của chất. Trình bày được đặc điểm cơ bản của ba thể rắn, lỏng, khí.',
        percentage: 30,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 2, 'Hiểu': 2, 'Vận dụng': 0 },
          'Đúng - Sai': { 'Biết': 1, 'Hiểu': 1, 'Vận dụng': 0 },
          'Trả lời ngắn': { 'Biết': 0, 'Hiểu': 2, 'Vận dụng': 0 }
        }
      },
      {
        topic: 'Các thể của chất',
        knowledgeUnit: 'Oxygen và không khí',
        learningOutcome: 'Nêu được tầm quan trọng của oxygen đối với sự sống và sự cháy. Trình bày được thành phần của không khí.',
        percentage: 30,
        counts: {
          ...createEmptyCounts(),
          'Nhiều lựa chọn': { 'Biết': 2, 'Hiểu': 2, 'Vận dụng': 0 },
          'Trả lời ngắn': { 'Biết': 0, 'Hiểu': 2, 'Vận dụng': 0 },
          'Tự luận': { 'Biết': 0, 'Hiểu': 1, 'Vận dụng': 1 }
        }
      }
    ]
  }
];
