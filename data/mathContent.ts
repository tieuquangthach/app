export interface Topic {
  name: string;
  knowledgeUnits: string[];
}

export interface GradeData {
  [grade: string]: Topic[];
}

export const mathContentData: GradeData = {
  '6': [
    { 
      name: 'Số tự nhiên', 
      knowledgeUnits: [
        'Số tự nhiên và tập hợp các số tự nhiên. Thứ tự trong tập hợp các số tự nhiên', 
        'Các phép tính với số tự nhiên. Phép tính luỹ thừa với số mũ tự nhiên', 
        'Tính chia hết trong tập hợp các số tự nhiên. Số nguyên tố. Ước chung và bội chung'
      ] 
    },
    { 
      name: 'Số nguyên', 
      knowledgeUnits: [
        'Số nguyên âm và tập hợp các số nguyên. Thứ tự trong tập hợp các số nguyên', 
        'Các phép tính với số nguyên. Tính chia hết trong tập hợp các số nguyên'
      ] 
    },
    { 
      name: 'Phân số', 
      knowledgeUnits: [
        'Phân số. Tính chất cơ bản của phân số. So sánh phân số', 
        'Các phép tính với phân số'
      ] 
    },
    { 
      name: 'Số thập phân', 
      knowledgeUnits: [
        'Số thập phân và các phép tính với số thập phân. Tỉ số và tỉ số phần trăm'
      ] 
    },
    { 
      name: 'Các hình phẳng trong thực tiễn', 
      knowledgeUnits: [
        'Tam giác đều, hình vuông, lục giác đều', 
        'Hình chữ nhật, hình thoi, hình bình hành, hình thang cân'
      ] 
    },
    { 
      name: 'Tính đối xứng của hình phẳng trong thế giới tự nhiên', 
      knowledgeUnits: [
        'Hình có trục đối xứng', 
        'Hình có tâm đối xứng', 
        'Vai trò của đối xứng trong thế giới tự nhiên'
      ] 
    },
    { 
      name: 'Các hình hình học cơ bản', 
      knowledgeUnits: [
        'Điểm, đường thẳng, tia', 
        'Đoạn thẳng. Độ dài đoạn thẳng', 
        'Góc. Các góc đặc biệt. Số đo góc'
      ] 
    },
    { 
      name: 'Thu thập và tổ chức dữ liệu', 
      knowledgeUnits: [
        'Thu thập, phân loại, biểu diễn dữ liệu theo các tiêu chí cho trước', 
        'Mô tả và biểu diễn dữ liệu trên các bảng, biểu đồ'
      ] 
    },
    { 
      name: 'Phân tích và xử lí dữ liệu', 
      knowledgeUnits: [
        'Hình thành và giải quyết vấn đề đơn giản xuất hiện từ các số liệu và biểu đồ thống kê đã có'
      ] 
    },
    { 
      name: 'Một số yếu tố xác suất', 
      knowledgeUnits: [
        'Làm quen với một số mô hình xác suất đơn giản. Làm quen với việc mô tả xác suất (thực nghiệm) của khả năng xảy ra nhiều lần của một sự kiện trong một số mô hình xác suất đơn giản', 
        'Mô tả xác suất (thực nghiệm) của khả năng xảy ra nhiều lần của một sự kiện trong một số mô hình xác suất đơn giản'
      ] 
    }
  ],
  '7': [],
  '8': [],
  '9': [],
};
