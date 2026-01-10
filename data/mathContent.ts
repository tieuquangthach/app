export interface KnowledgeUnit {
  unit: string;
  learningOutcome: string[]; // Chuyển thành mảng để không gộp các mức độ nhận thức
}

export interface Topic {
  name: string;
  knowledgeUnits: (string | KnowledgeUnit)[];
}

export interface GradeData {
  [grade: string]: Topic[];
}

export const subjectContentData: Record<string, GradeData> = {
  'Toán': {
    '6': [
      {
        name: 'Số tự nhiên',
        knowledgeUnits: [
          {
            unit: 'Số tự nhiên và tập hợp các số tự nhiên. Thứ tự trong tập hợp các số tự nhiên',
            learningOutcome: [
              'Nhận biết: Nhận biết được tập hợp các số tự nhiên.',
              'Thông hiểu: Biểu diễn được số tự nhiên trong hệ thập phân; biểu diễn được các số tự nhiên từ 1 đến 30 bằng cách sử dụng các chữ số La Mã.',
              'Vận dụng: Sử dụng được thuật ngữ tập hợp, phần tử thuộc (không thuộc) một tập hợp; sử dụng được cách cho tập hợp.'
            ]
          },
          {
            unit: 'Các phép tính với số tự nhiên. Phép tính luỹ thừa với số mũ tự nhiên',
            learningOutcome: [
              'Nhận biết: Nhận biết được thứ tự thực hiện các phép tính.',
              'Vận dụng: Thực hiện được các phép tính: cộng, trừ, nhân, chia trong tập hợp số tự nhiên; vận dụng được các tính chất giao hoán, kết hợp, phân phối của phép nhân đối với phép cộng trong tính toán; thực hiện được phép tính luỹ thừa với số mũ tự nhiên; thực hiện được các phép nhân và phép chia hai luỹ thừa cùng cơ số với số mũ tự nhiên; vận dụng được các tính chất của phép tính để tính nhẩm, tính nhanh một cách hợp lí; giải quyết được những vấn đề thực tiễn (đơn giản, quen thuộc) gắn với thực hiện các phép tính.',
              'Vận dụng cao: Giải quyết được những vấn đề thực tiễn (phức hợp, không quen thuộc) gắn với thực hiện các phép tính.'
            ]
          }
        ]
      }
    ],
    '9': [
      {
        name: 'Căn thức',
        knowledgeUnits: [
          {
            unit: 'Căn bậc hai và căn bậc ba của số thực',
            learningOutcome: [
              'Nhận biết: Nhận biết được khái niệm về căn bậc hai của số thực không âm, căn bậc ba của một số thực.',
              'Thông hiểu: Tính được giá trị (đúng hoặc gần đúng) căn bậc hai, căn bậc ba của một số hữu tỉ bằng máy tính cầm tay.',
              'Vận dụng: Thực hiện được một số phép tính đơn giản về căn bậc hai của số thực không âm (căn bậc hai của một bình phương, căn bậc hai của một tích, căn bậc hai của một thương, đưa thừa số ra ngoài dấu căn bậc hai, đưa thừa số vào trong dấu căn bậc hai).'
            ]
          },
          {
            unit: 'Căn thức bậc hai và căn thức bậc ba của biểu thức đại số',
            learningOutcome: [
              'Nhận biết: Nhận biết được khái niệm về căn thức bậc hai và căn thức bậc ba của một biểu thức đại số.',
              'Vận dụng: Thực hiện được một số phép biến đổi đơn giản về căn thức bậc hai của biểu thức đại số (căn thức bậc hai của một bình phương, căn thức bậc hai của một tích, căn thức bậc hai của một thương, trục căn thức ở mẫu).'
            ]
          }
        ]
      },
      {
        name: 'Hàm số và đồ thị',
        knowledgeUnits: [
          {
            unit: 'Hàm số y = ax^2 (a ≠ 0) và đồ thị',
            learningOutcome: [
              'Nhận biết: Nhận biết được tính đối xứng (trục) và trục đối xứng của đồ thị hàm số y = ax^2 (a ≠ 0).',
              'Thông hiểu: Thiết lập được bảng giá trị của hàm số y = ax^2 (a ≠ 0).',
              'Vận dụng: Vẽ được đồ thị của hàm số y = ax^2 (a ≠ 0).',
              'Vận dụng cao: Giải quyết được một số vấn đề thực tiễn gắn với hàm số y = ax^2 (a ≠ 0) và đồ thị (ví dụ: các bài toán liên quan đến chuyển động trong Vật lí,...).'
            ]
          }
        ]
      },
      {
        name: 'Phương trình và hệ phương trình',
        knowledgeUnits: [
          {
            unit: 'Phương trình quy về phương trình bậc nhất một ẩn',
            learningOutcome: [
              'Vận dụng: Giải được phương trình tích có dạng (a1x + b1).(a2x + b2) = 0.',
              'Vận dụng: Giải được phương trình chứa ẩn ở mẫu quy về phương trình bậc nhất.'
            ]
          },
          {
            unit: 'Phương trình và hệ phương trình bậc nhất hai ẩn',
            learningOutcome: [
              'Nhận biết: Nhận biết được khái niệm phương trình bậc nhất hai ẩn, hệ hai phương trình bậc nhất hai ẩn.',
              'Nhận biết: Nhận biết được khái niệm nghiệm của hệ hai phương trình bậc nhất hai ẩn.',
              'Thông hiểu: Tính được nghiệm của hệ hai phương trình bậc nhất hai ẩn bằng máy tính cầm tay.',
              'Vận dụng: Giải được hệ hai phương trình bậc nhất hai ẩn.',
              'Vận dụng: Giải quyết được một số vấn đề thực tiễn (đơn giản, quen thuộc) gắn với hệ hai phương trình bậc nhất hai ẩn (ví dụ: các bài toán liên quan đến cân bằng phản ứng trong Hoá học,...).',
              'Vận dụng cao: Giải quyết được một số vấn đề thực tiễn (phức hợp, không quen thuộc) gắn với hệ hai phương trình bậc nhất hai ẩn.'
            ]
          },
          {
            unit: 'Phương trình bậc hai một ẩn. Định lí Viète',
            learningOutcome: [
              'Nhận biết: Nhận biết được khái niệm phương trình bậc hai một ẩn.',
              'Thông hiểu: Tính được nghiệm phương trình bậc hai một ẩn bằng máy tính cầm tay.',
              'Thông hiểu: Giải thích được định lí Viète.',
              'Vận dụng: Giải được phương trình bậc hai một ẩn.',
              'Vận dụng: Ứng dụng được định lí Viète vào tính nhẩm nghiệm của phương trình bậc hai, tìm hai số biết tổng và tích của chúng, ...',
              'Vận dụng: Vận dụng được phương trình bậc hai vào giải quyết bài toán thực tiễn (đơn giản, quen thuộc).',
              'Vận dụng cao: Vận dụng được phương trình bậc hai vào giải quyết bài toán thực tiễn (phức hợp, không quen thuộc).'
            ]
          }
        ]
      },
      {
        name: 'Bất phương trình bậc nhất một ẩn',
        knowledgeUnits: [
          {
            unit: 'Bất đẳng thức. Bất phương trình bậc nhất một ẩn',
            learningOutcome: [
              'Nhận biết: Nhận biết được thứ tự trên tập hợp các số thực.',
              'Nhận biết: Nhận biết được bất đẳng thức.',
              'Nhận biết: Nhận biết được khái niệm bất phương trình bậc nhất một ẩn, nghiệm của bất phương trình bậc nhất một ẩn.',
              'Thông hiểu: Mô tả được một số tính chất cơ bản của bất đẳng thức (tính chất bắc cầu; liên hệ giữa thứ tự và phép cộng, phép nhân).',
              'Vận dụng: Giải được bất phương trình bậc nhất một ẩn.'
            ]
          }
        ]
      },
      {
        name: 'Các hình khối trong thực tiễn',
        knowledgeUnits: [
          {
            unit: 'Hình trụ. Hình nón. Hình cầu',
            learningOutcome: [
              'Nhận biết: Nhận biết được phần chung của mặt phẳng và hình cầu.',
              'Nhận biết: Mô tả (đường sinh, chiều cao, bán kính đáy) hình trụ.',
              'Nhận biết: Mô tả (đỉnh, đường sinh, chiều cao, bán kính đáy) hình nón.',
              'Nhận biết: Mô tả được (tâm, bán kính) hình cầu, mặt cầu.',
              'Thông hiểu: Tạo lập được hình trụ, hình nón, hình cầu, mặt cầu.',
              'Thông hiểu: Tính được diện tích xung quanh của hình trụ, hình nón, diện tích mặt cầu.',
              'Thông hiểu: Tính được thể tích của hình trụ, hình nón, hình cầu.',
              'Vận dụng: Giải quyết được một số vấn đề thực tiễn gắn với việc tính diện tích xung quanh, thể tích của hình trụ, hình nón, hình cầu (ví dụ: tính thể tích hoặc diện tích xung quanh của một số đồ vật quen thuộc có dạng hình trụ, hình nón, hình cầu,...).'
            ]
          }
        ]
      },
      {
        name: 'Hệ thức lượng trong tam giác vuông',
        knowledgeUnits: [
          {
            unit: 'Tỉ số lượng giác của góc nhọn. Một số hệ thức về cạnh và góc trong tam giác vuông',
            learningOutcome: [
              'Nhận biết: Nhận biết được các giá trị sin (sine), côsin (cosine), tang (tangent), côtang (cotangent) của góc nhọn.',
              'Thông hiểu: Giải thích được tỉ số lượng giác của các góc nhọn đặc biệt (góc 30o, 45o, 60o) và của hai góc phụ nhau.',
              'Thông hiểu: Giải thích được một số hệ thức về cạnh và góc trong tam giác vuông (cạnh góc vuông bằng cạnh huyền nhân với sin góc đối hoặc nhân với côsin góc kề; cạnh góc vuông bằng cạnh góc vuông kia nhân với tang góc đối hoặc nhân với côtang góc kề).',
              'Thông hiểu: Tính được giá trị (đúng hoặc gần đúng) tỉ số lượng giác của góc nhọn bằng máy tính cầm tay.',
              'Vận dụng: Giải quyết được một số vấn đề thực tiễn gắn với tỉ số lượng giác của góc nhọn (ví dụ: Tính độ dài đoạn thẳng, độ lớn góc và áp dụng giải tam giác vuông,...).'
            ]
          }
        ]
      },
      {
        name: 'Đường tròn',
        knowledgeUnits: [
          {
            unit: 'Đường tròn. Vị trí tương đối của hai đường tròn',
            learningOutcome: [
              'Nhận biết: Nhận biết được tâm đối xứng, trục đối xứng của đường tròn.',
              'Thông hiểu: Mô tả được ba vị trí tương đối của hai đường tròn (hai đường tròn cắt nhau, hai đường tròn tiếp xúc nhau, hai đường tròn không giao nhau).',
              'Vận dụng: So sánh được độ dài của đường kính và dây.'
            ]
          },
          {
            unit: 'Vị trí tương đối của đường thẳng và đường tròn. Tiếp tuyến của đường tròn',
            learningOutcome: [
              'Thông hiểu: Mô tả được ba vị trí tương đối của đường thẳng và đường tròn (đường thẳng và đường tròn cắt nhau, đường thẳng và đường tròn tiếp xúc nhau, đường thẳng và đường tròn không giao nhau).',
              'Thông hiểu: Giải thích được dấu hiệu nhận biết tiếp tuyến của đường tròn và tính chất của hai tiếp tuyến cắt nhau.'
            ]
          },
          {
            unit: 'Góc ở tâm, góc nội tiếp',
            learningOutcome: [
              'Nhận biết: Nhận biết được góc ở tâm, góc nội tiếp.',
              'Thông hiểu: Giải thích được mối liên hệ giữa số đo của cung với số đo góc ở tâm, số đo góc nội tiếp.',
              'Thông hiểu: Giải thích được mối liên hệ giữa số đo góc nội tiếp và số đo góc ở tâm cùng chắn một cung.'
            ]
          },
          {
            unit: 'Đường tròn ngoại tiếp tam giác. Đường tròn nội tiếp tam giác',
            learningOutcome: [
              'Nhận biết: Nhận biết được định nghĩa đường tròn ngoại tiếp tam giác.',
              'Nhận biết: Nhận biết được định nghĩa đường tròn nội tiếp tam giác.',
              'Vận dụng: Xác định được tâm và bán kính đường tròn ngoại tiếp tam giác, trong đó có tâm và bán kính đường tròn ngoại tiếp tam giác vuông, tam giác đều.',
              'Vận dụng: Xác định được tâm và bán kính đường tròn nội tiếp tam giác, trong đó có tâm và bán kính đường tròn nội tiếp tam giác đều.'
            ]
          },
          {
            unit: 'Tứ giác nội tiếp',
            learningOutcome: [
              'Nhận biết: Nhận biết được tứ giác nội tiếp đường tròn.',
              'Thông hiểu: Giải thích được định lí về tổng hai góc đối của tứ giác nội tiếp bằng 180o.',
              'Thông hiểu: Xác định được tâm và bán kính đường tròn ngoại tiếp hình chữ nhật, hình vuông.'
            ]
          },
          {
            unit: 'Độ dài cung tròn và diện tích hình phẳng liên quan đến đường tròn',
            learningOutcome: [
              'Vận dụng: Tính được độ dài cung tròn, diện tích hình quạt tròn, diện tích hình vành khuyên (hình giới hạn bởi hai đường tròn đồng tâm).',
              'Vận dụng: Giải quyết được một số vấn đề thực tiễn (đơn giản, quen thuộc) gắn với đường tròn (ví dụ: một số bài toán liên quan đến chuyển động tròn trong Vật lí; tính được diện tích một số hình phẳng có thể đưa về những hình phẳng gắn với hình tròn, chẳng hạn hình viên phân,...).',
              'Vận dụng cao: Giải quyết được một số vấn đề thực tiễn (phức hợp, không quen thuộc) gắn với đường tròn.'
            ]
          }
        ]
      },
      {
        name: 'Đa giác đều',
        knowledgeUnits: [
          {
            unit: 'Đa giác đều',
            learningOutcome: [
              'Nhận dạng được đa giác đều.',
              'Nhận biết được phép quay.',
              'Nhận biết được những hình phẳng đều trong tự nhiên, nghệ thuật, kiến trúc, công nghệ chế tạo,...',
              'Nhận biết được vẻ đẹp của thế giới tự nhiên biểu hiện qua tính đều.',
              'Thông hiểu: Mô tả được các phép quay giữ nguyên hình đa giác đều.'
            ]
          }
        ]
      },
      {
        name: 'Thu thập và tổ chức dữ liệu',
        knowledgeUnits: [
          {
            unit: 'Mô tả và biểu diễn dữ liệu trên các bảng, biểu đồ',
            learningOutcome: [
              'Thông hiểu: Lí giải và thiết lập được dữ liệu vào bảng, biểu đồ thích hợp ở dạng: bảng thống kê; biểu đồ tranh; biểu đồ dạng cột/cột kép (column chart), biểu đồ hình quạt tròn (pie chart); biểu đồ đoạn thẳng (linegraph).',
              'Vận dụng: Phát hiện và lí giải được số liệu không chính xác dựa trên mối liên hệ toán học đơn giản giữa các số liệu đã được biểu diễn trong những ví dụ đơn giản.',
              'Vận dụng: Lí giải và thực hiện được cách chuyển dữ liệu từ dạng biểu diễn này sang dạng biểu diễn khác.'
            ]
          }
        ]
      },
      {
        name: 'Phân tích và xử lý dữ liệu',
        knowledgeUnits: [
          {
            unit: 'Bảng tần số, biểu đồ tần số. Bảng tần số tương đối, biểu đồ tần số tương đối',
            learningOutcome: [
              'Nhận biết: Nhận biết được mối liên hệ giữa thống kê với những kiến thức của các môn học khác trong Chương trình lớp 9 và trong thực tiễn.',
              'Thông hiểu: Giải thích được ý nghĩa và vai trò của tần số trong thực tiễn.',
              'Thông hiểu: Giải thích được ý nghĩa và vai trò của tần số tương đối trong thực tiễn.',
              'Vận dụng: Xác định được tần số (frequency) của một giá trị.',
              'Vận dụng: Xác định được tần số tương đối (relative frequency) của một giá trị.',
              'Vận dụng: Thiết lập được bảng tần số, biểu đồ tần số (biểu diễn các giá trị và tần số của chúng ở dạng biểu đồ cột hoặc biểu đồ đoạn thẳng).',
              'Vận dụng: Thiết lập được bảng tần số tương đối, biểu đồ tần số tương đối (biểu diễn các giá trị và tần số tương đối của chúng ở dạng biểu đồ cột hoặc biểu đồ hình quạt tròn).',
              'Vận dụng: Thiết lập được bảng tần số ghép nhóm, bảng tần số tương đối ghép nhóm.',
              'Vận dụng: Thiết lập được biểu đồ tần số tương đối ghép nhóm (histogram) (ở dạng biểu đồ cột hoặc biểu đồ đoạn thẳng).'
            ]
          }
        ]
      },
      {
        name: 'Một số yếu tố xác suất',
        knowledgeUnits: [
          {
            unit: 'Phép thử ngẫu nhiên và không gian mẫu. Xác suất của biến cố trong một số mô hình xác suất đơn giản',
            learningOutcome: [
              'Nhận biết: Nhận biết được phép thử ngẫu nhiên và không gian mẫu.',
              'Vận dụng: Tính được xác suất của biến cố bằng cách kiểm đếm số trường hợp có thể và số trường hợp thuận lợi trong một số mô hình xác suất đơn giản.'
            ]
          }
        ]
      }
    ]
  },
  'Tin': {
    '6': [
      {
        name: 'Chủ đề A. Máy tính và cộng đồng',
        knowledgeUnits: [
          {
            unit: '1. Thông tin và dữ liệu',
            learningOutcome: [
              'Nhận biết: Phân biệt được thông tin với vật mang tin trong các tình huống cụ thể.',
              'Nhận biết: Nhận biết được sự khác nhau giữa thông tin và dữ liệu.',
              'Nhận biết: Nêu được các bước cơ bản trong xử lí thông tin.',
              'Thông hiểu: Nêu được ví dụ minh hoạ về mối quan hệ giữa thông tin và dữ liệu.',
              'Thông hiểu: Nêu được ví dụ minh hoạ tầm quan trọng của thông tin.',
              'Vận dụng: Giải thích được máy tính và các thiết bị số là công cụ hiệu quả để thu thập, lưu trữ, xử lí và truyền thông tin. Nêu được ví dụ minh hoạ cụ thể.'
            ]
          },
          {
            unit: '2. Biểu diễn thông tin và lưu trữ dữ liệu trong máy tính',
            learningOutcome: [
              'Nhận biết: Biết được bit là đơn vị nhỏ nhất trong lưu trữ thông tin.',
              'Nhận biết: Nêu được tên và độ lớn (xấp xỉ theo hệ thập phân) của các đơn vị cơ bản đo dung lượng thông tin: Byte, KB, MB, GB, quy đổi được một cách gần đúng giữa các đơn vị đo lường này.',
              'Thông hiểu: Giải thích được có thể biểu diễn thông tin chỉ với hai kí hiệu 0 và 1.',
              'Vận dụng cao: Xác định được khả năng lưu trữ của các thiết bị nhớ thông dụng như đĩa quang, đĩa từ, đĩa cứng, USB, CD, thẻ nhớ,…'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề B. Mạng máy tính và Internet',
        knowledgeUnits: [
          {
            unit: 'Giới thiệu về mạng máy tính và Internet',
            learningOutcome: [
              'Nhận biết: Nêu được khái niệm và lợi ích của mạng máy tính.',
              'Nhận biết: Nêu được các thành phần chủ yếu của một mạng máy tính (máy tính và các thiết bị kết nối) và tên của một vài thiết bị mạng cơ bản.',
              'Nhận biết: Nêu được các đặc điểm và ích lợi chính của Internet.',
              'Thông hiểu: Nêu được ví dụ cụ thể về trường hợp mạng không dây tiện dụng hơn mạng có dây.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề C. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        knowledgeUnits: [
          {
            unit: 'World Wide Web, thư điện tử và công cụ tìm kiếm thông tin',
            learningOutcome: [
              'Nhận biết: Trình bày được sơ lược về các khái niệm WWW, website, địa chỉ của website, trình duyệt.',
              'Nhận biết: Xem và nêu được những thông tin chính trên trang web cho trước.',
              'Nhận biết: Nêu được công dụng của máy tìm kiếm.',
              'Nhận biết: Biết cách đăng kí tài khoản thư điện tử.',
              'Thông hiểu: Nêu được những ưu, nhược điểm cơ bản của dịch vụ thư điện tử so với các phương thức liên lạc khác.',
              'Thông hiểu: Xác định được từ khoá ứng với một mục đích tìm kiếm cho trước.',
              'Vận dụng: Thực hiện được một số thao tác cơ bản: tạo tài khoản email, đăng nhập tài khoản email, soạn thư, gửi thư, nhận thư, trả lời thư, chuyển tiếp thư và đăng xuất hộp thư.',
              'Vận dụng cao: Tìm kiếm được thông tin trên một số trang web thông dụng để phục vụ cho nhu cầu học tập và cuộc sống.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề D. Đạo đức, pháp luật và văn hoá trong môi trường số',
        knowledgeUnits: [
          {
            unit: 'Đề phòng một số tác hại khi tham gia Internet',
            learningOutcome: [
              'Nhận biết: Nêu được một số tác hại và nguy cơ bị hại khi tham gia Internet.',
              'Nhận biết: Nêu được một vài cách thông dụng để bảo vệ, chia sẻ thông tin của bản thân và tập thể sao cho an toàn và hợp pháp.',
              'Nhận biết: Nêu được một số biện pháp cơ bản để phòng ngừa tác hại khi tham gia Internet.',
              'Thông hiểu: Trình bày được tầm quan trọng của sự an toàn và hợp pháp của thông tin cá nhân và tập thể, nêu được ví dụ minh hoạ.',
              'Thông hiểu: Nhận diện được một số thông điệp lừa đảo hoặc mang nội dung xấu.',
              'Vận dụng: Thực hiện được một số biện pháp cơ bản để phòng ngừa tác hại khi tham gia Internet với sự hướng dẫn của giáo viên.',
              'Vận dụng: Thực hiện được các thao tác để bảo vệ thông tin và tài khoản cá nhân.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề E. Ứng dụng tin học',
        knowledgeUnits: [
          {
            unit: '1. Soạn thảo văn bản cơ bản',
            learningOutcome: [
              'Nhận biết: Nhận biết được tác dụng của công cụ căn lề, định dạng, tìm kiếm, thay thế trong phần mềm soạn thảo văn bản.',
              'Nhận biết: Nêu được các chức năng đặc trưng của những phần mềm soạn thảo văn bản.',
              'Vận dụng: Thực hiện được việc định dạng văn bản, trình bày trang văn bản và in.',
              'Vận dụng: Sử dụng được công cụ tìm kiếm và thay thế của phần mềm soạn thảo.',
              'Vận dụng: Trình bày được thông tin ở dạng bảng.',
              'Vận dụng cao: Soạn thảo được văn bản phục vụ học tập và sinh hoạt hàng ngày.'
            ]
          },
          {
            unit: '2. Sơ đồ tư duy và phần mềm sơ đồ tư duy',
            learningOutcome: [
              'Thông hiểu: Giải thích được lợi ích của sơ đồ tư duy, nêu được nhu cầu sử dụng phần mềm sơ đồ tư duy trong học tập và trao đổi thông tin.',
              'Vận dụng: Sắp xếp được một cách logic và trình bày được dưới dạng sơ đồ tư duy các ý tưởng, khái niệm.',
              'Vận dụng cao: Sử dụng được phần mềm để tạo sơ đồ tư duy đơn giản phục vụ học tập và trao đổi thông tin.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề F. Giải quyết vấn đề với sự trợ giúp của máy tính',
        knowledgeUnits: [
          {
            unit: 'Khái niệm thuật toán và biểu diễn thuật toán',
            learningOutcome: [
              'Nhận biết: Nêu được khái niệm thuật toán.',
              'Nhận biết: Biết được chương trình là mô tả một thuật toán để máy tính "hiểu" và thực hiện được.',
              'Thông hiểu: Nêu được một vài ví dụ minh hoạ về thuật toán.',
              'Vận dụng: Mô tả được thuật toán đơn giản có các cấu trúc tuần tự, rẽ nhánh và lặp dưới dạng liệt kê hoặc sơ đồ khối.'
            ]
          }
        ]
      }
    ],
    '7': [
      {
        name: 'Chủ đề A. Máy tính và cộng đồng',
        knowledgeUnits: [
          {
            unit: '1. Sơ lược về các thành phần của máy tính',
            learningOutcome: [
              'Nhận biết: Biết và nhận ra được các thiết bị vào ra trong mô hình thiết bị máy tính, tính đa dạng và hình dạng của các thiết bị (Chuột, bàn phím, màn hình, loa, màn hình cảm ứng, máy quét, camera,...).',
              'Nhận biết: Biết được chức năng của một số thiết bị vào ra trong thu thập, lưu trữ, xử lí và truyền thông tin.',
              'Thông hiểu: Nêu được ví dụ cụ thể về những thao tác không đúng cách sẽ gây ra lỗi cho các thiết bị và hệ thống xử lí thông tin.',
              'Vận dụng: Thực hiện đúng các thao tác với các thiết bị thông dụng của máy tính.'
            ]
          },
          {
            unit: '2. Khái niệm hệ điều hành và phần mềm ứng dụng',
            learningOutcome: [
              'Nhận biết: Biết được tệp chương trình cũng là dữ liệu, có thể được lưu trữ trong máy tính.',
              'Nhận biết: Nêu được tên một số phần mềm ứng dụng đã sử dụng (Phần mềm luyện gõ phím, Word, Paint, .....).',
              'Nhận biết: Nêu được một số biện pháp để bảo vệ máy tính cá nhân, tài khoản và dữ liệu cá nhân (Cài mật khẩu máy tính, đăng xuất tài khoản khi hết phiên làm việc, sao lưu dữ liệu, quét virus…).',
              'Thông hiểu: Giải thích được chức năng điều khiển của hệ điều hành, qua đó phân biệt được hệ điều hành với phần mềm ứng dụng.',
              'Thông hiểu: Phân biệt được loại tệp thông qua phần mở rộng.',
              'Vận dụng: Thao tác thành thạo với tệp và thư mục khi làm việc với máy tính để giải quyết các nhiệm vụ khác nhau trong học tập và trong cuộc sống.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề C. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        knowledgeUnits: [
          {
            unit: 'Mạng xã hội và một số kênh trao đổi thông tin thông dụng trên Internet',
            learningOutcome: [
              'Nhận biết: Nhận biết một số website là mạng xã hội (Facebook, YouTube, Zalo, Instagram ...).',
              'Nhận biết: Nêu được tên kênh và thông tin trao đổi chính trên kênh đó.',
              'Nhận biết: Nêu được một số chức năng cơ bản của mạng xã hội: kết nối, giao lưu, chia sẻ, thảo luận và trao đổi thông tin…',
              'Thông hiểu: Nêu được ví dụ cụ thể về hậu quả của việc sử dụng thông tin vào mục đích sai trái.',
              'Vận dụng: Sử dụng được một số chức năng cơ bản của một mạng xã hội để giao lưu và chia sẻ thông tin.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề D. Đạo đức, pháp luật và văn hoá trong môi trường số',
        knowledgeUnits: [
          {
            unit: 'Văn hoá ứng xử qua phương tiện truyền thông số',
            learningOutcome: [
              'Nhận biết: Biết được tác hại của bệnh nghiện Internet.',
              'Nhận biết: Nêu được cách ứng xử hợp lí khi gặp trên mạng hoặc các kênh truyền thông tin số những thông tin có nội dung xấu, thông tin không phù hợp lứa tuổi.',
              'Thông hiểu: Nêu được một số ví dụ truy cập không hợp lệ vào các nguồn thông tin và kênh truyền thông tin.',
              'Vận dụng: Biết nhờ người lớn giúp đỡ, tư vấn khi cần thiết, chẳng hạn khi bị bắt nạt trên mạng.',
              'Vận dụng: Lựa chọn được các biện pháp phòng tránh bệnh nghiện Internet.',
              'Vận dụng cao: Thực hiện được giao tiếp qua mạng (trực tuyến hay không trực tuyến) theo đúng quy tắc và bằng ngôn ngữ lịch sự, thể hiện ứng xử có văn hoá.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề E. Ứng dụng tin học',
        knowledgeUnits: [
          {
            unit: '1. Bảng tính điện tử cơ bản',
            learningOutcome: [
              'Nhận biết: Nêu được một số chức năng cơ bản của phần mềm bảng tính.',
              'Thông hiểu: Giải thích được việc đưa các công thức vào bảng tính là một cách điều khiển tính toán tự động trên dữ liệu.',
              'Vận dụng: Thực hiện được một số thao tác đơn giản với trang tính.',
              'Vận dụng: Thực hiện được một số phép toán thông dụng, sử dụng được một số hàm đơn giản như: MAX, MIN, SUM, AVERAGE, COUNT, …',
              'Vận dụng: Sử dụng được công thức và dùng được địa chỉ trong công thức, tạo được bảng tính đơn giản có số liệu tính toán bằng công thức.',
              'Vận dụng cao: Sử dụng được bảng tính điện tử để giải quyết một vài công việc cụ thể đơn giản.'
            ]
          },
          {
            unit: '2. Phần mềm trình chiếu cơ bản',
            learningOutcome: [
              'Nhận biết: Nêu được một số chức năng cơ bản của phần mềm trình chiếu.',
              'Vận dụng: Sử dụng được các định dạng cho văn bản, ảnh minh hoạ và hiệu ứng một cách hợp lí.',
              'Vận dụng: Sao chép được dữ liệu phù hợp từ tệp văn bản sang trang trình chiếu.',
              'Vận dụng: Tạo được một báo cáo có tiêu đề, cấu trúc phân cấp, ảnh minh hoạ, hiệu ứng động.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề F. Giải quyết vấn đề với sự trợ giúp của máy tính',
        knowledgeUnits: [
          {
            unit: 'Một số thuật toán sắp xếp và tìm kiếm cơ bản',
            learningOutcome: [
              'Nhận biết: Nêu được ý nghĩa của việc chia một bài toán thành những bài toán nhỏ hơn.',
              'Thông hiểu: Giải thích được một vài thuật toán sắp xếp và tìm kiếm cơ bản, bằng các bước thủ công.',
              'Thông hiểu: Giải thích được mối liên quan giữa sắp xếp và tìm kiếm, nêu được ví dụ minh hoạ.',
              'Vận dụng: Biểu diễn và mô phỏng được hoạt động của các thuật toán cơ bản (sắp xếp, tìm kiếm, ...) trên một bộ dữ liệu vào có kích thước nhỏ.'
            ]
          }
        ]
      }
    ],
    '8': [
      {
        name: 'Chủ đề A. Máy tính và cộng đồng',
        knowledgeUnits: [
          {
            unit: 'Sơ lược về lịch sử phát triển máy tính',
            learningOutcome: [
              'Nhận biết: Trình bày được sơ lược lịch sử phát triển máy tính.',
              'Thông hiểu: Nêu được ví dụ cho thấy sự phát triển máy tính đã đem đến những thay đổi lớn lao cho xã hội loài người.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề C. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        knowledgeUnits: [
          {
            unit: '1. Đặc điểm của thông tin trong môi trường số',
            learningOutcome: [
              'Nhận biết: Nêu được các đặc điểm của thông tin số: đa dạng, được thu thập ngày càng nhanh và nhiều, được lưu trữ với dung lượng khổng lồ bởi nhiều tổ chức và cá nhân, có tính bản quyền, có độ tin cậy rất khác nhau, có các công cụ tìm kiếm, chuyển đổi, truyền và xử lí hiệu quả.',
              'Thông hiểu: Trình bày được tầm quan trọng của việc biết khai thác các nguồn thông tin đáng tin cậy, nêu được ví dụ minh hoạ.',
              'Thông hiểu: Nêu được ví dụ minh hoạ sử dụng công cụ tìm kiếm, xử lí và trao đổi thông tin trong môi trường số.',
              'Vận dụng: Sử dụng được công cụ tìm kiếm, xử lí và trao đổi thông tin trong môi trường số.'
            ]
          },
          {
            unit: '2. Thông tin với giải quyết vấn đề',
            learningOutcome: [
              'Thông hiểu: Xác định được lợi ích của thông tin tìm được trong giải quyết vấn đề, nêu được ví dụ minh hoạ.',
              'Vận dụng: Chủ động tìm kiếm được thông tin để thực hiện nhiệm vụ (thông qua bài tập cụ thể).'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề D. Đạo đức, pháp luật và văn hoá trong môi trường số',
        knowledgeUnits: [
          {
            unit: 'Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số',
            learningOutcome: [
              'Thông hiểu: Nhận biết và giải thích được một số biểu hiện vi phạm đạo đức và pháp luật, biểu hiện thiếu văn hoá khi sử dụng công nghệ kĩ thuật số (thu âm, quay phim, chụp ảnh khi không được phép, dùng các sản phẩm văn hoá vi phạm bản quyền,...).',
              'Vận dụng: Khi tạo ra các sản phẩm số luôn thể hiện được tính đạo đức, văn hoá và không vi phạm pháp luật.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề E. Ứng dụng tin học',
        knowledgeUnits: [
          {
            unit: '1. Xử lí và trực quan hoá dữ liệu bằng bảng tính điện tử',
            learningOutcome: [
              'Thông hiểu: Giải thích được sự khác nhau giữa địa chỉ tương đối và địa chỉ tuyệt đối của một ô tính.',
              'Thông hiểu: Giải thích được sự thay đổi địa chỉ tương đối trong công thức khi sao chép công thức.',
              'Vận dụng: Thực hiện được các thao tác tạo biểu đồ, lọc và sắp xếp dữ liệu. Nêu được một số tình huống thực tế cần sử dụng các chức năng đó của phần mềm bảng tính.',
              'Vận dụng: Sao chép được dữ liệu từ các tệp văn bản, trang trình chiếu sang trang tính.',
              'Vận dụng cao: Sử dụng được phần mềm bảng tính trợ giúp giải quyết bài toán thực tế.'
            ]
          },
          {
            unit: '2. Soạn thảo văn bản và phần mềm trình chiếu nâng cao (lựa chọn)',
            learningOutcome: [
              'Vận dụng: Sử dụng được phần mềm soạn thảo để thực hiện các thao tác: chèn thêm, xoá bỏ, co dãn hình ảnh, vẽ hình đồ hoạ trong văn bản, tạo danh sách dạng liệt kê, đánh số trang, thêm đầu trang và chân trang.',
              'Vận dụng: Sử dụng được phần mềm trình chiếu: Chọn đặt được màu sắc, cỡ chữ hài hoà và hợp lí; Đưa được vào trang chiếu đường dẫn đến video hay tài liệu khác; Thực hiện thao tác đánh số thứ tự và chèn tiêu đề; Sử dụng được các bản mẫu (template).',
              'Vận dụng cao: Tạo được một số sản phẩm là văn bản có tính thẩm mĩ phục vụ nhu cầu thực tế.',
              'Vận dụng cao: Tạo được các sản phẩm số phục vụ học tập, giao lưu và trao đổi thông tin trong phần mềm trình chiếu.'
            ]
          },
          {
            unit: '3. Làm quen với phần mềm chỉnh sửa ảnh (lựa chọn)',
            learningOutcome: [
              'Thông hiểu: Nêu được một vài chức năng chính và thực hiện được một số thao tác cơ bản với phần mềm chỉnh sửa ảnh.',
              'Vận dụng cao: Tạo được một vài sản phẩm số đơn giản đáp ứng nhu cầu cá nhân, gia đình, trường học và địa phương.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề F. Giải quyết vấn đề với sự trợ giúp của máy tính',
        knowledgeUnits: [
          {
            unit: 'Lập trình trực quan',
            learningOutcome: [
              'Nhận biết: Nêu được khái niệm hằng, biến, kiểu dữ liệu, biểu thức.',
              'Thông hiểu: Hiểu được chương trình là dãy các lệnh điều khiển máy tính thực hiện một thuật toán.',
              'Vận dụng: Sử dụng được các khái niệm hằng, biến, kiểu dữ liệu, biểu thức ở các chương trình đơn giản trong môi trường lập trình trực quan.',
              'Vận dụng: Mô tả được kịch bản đơn giản dưới dạng thuật toán và tạo được một chương trình đơn giản.',
              'Vận dụng: Thể hiện được cấu trúc tuần tự, rẽ nhánh và lặp ở chương trình trong môi trường lập trình trực quan.',
              'Vận dụng cao: Chạy thử, tìm lỗi và sửa được lỗi cho chương trình.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề G. Hướng nghiệp với tin học',
        knowledgeUnits: [
          {
            unit: 'Tin học và ngành nghề',
            learningOutcome: [
              'Nhận biết: Nêu được một số nghề nghiệp mà ứng dụng tin học sẽ làm tăng hiệu quả công việc.',
              'Nhận biết: Nêu được tên một số nghề thuộc lĩnh vực tin học và một số nghề liên quan đến ứng dụng tin học.',
              'Thông hiểu: Nhận thức và trình bày được vấn đề bình đẳng giới trong việc sử dụng máy tính và trong ứng dụng tin học, nêu được ví dụ minh hoạ.',
              'Vận dụng: Vận dụng những hiểu biết để bước đầu định hướng nghề cho bản thân.'
            ]
          }
        ]
      }
    ],
    '9': [
      {
        name: 'Chủ đề A. Máy tính và cộng đồng',
        knowledgeUnits: [
          {
            unit: 'Vai trò của máy tính trong đời sống',
            learningOutcome: [
              'Nhận biết: Nêu được khả năng của máy tính và chỉ ra được một số ứng dụng thực tế của nó trong khoa học kĩ thuật và đời sống.',
              'Thông hiểu: Nhận biết được sự có mặt của các thiết bị có gắn bộ xử lí thông tin ở khắp nơi (trong gia đình, ở trường học, cửa hàng, bệnh viện, công sở, nhà máy,...), trong mọi lĩnh vực (y tế, ngân hàng, hàng không, toán học, sinh học,...), nêu được ví dụ minh hoạ.',
              'Thông hiểu: Giải thích được tác động của công nghệ thông tin lên giáo dục và xã hội thông qua các ví dụ cụ thể.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề C. Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
        knowledgeUnits: [
          {
            unit: 'Đánh giá chất lượng thông tin trong giải quyết vấn đề',
            learningOutcome: [
              'Thông hiểu: Giải thích được sự cần thiết phải quan tâm đến chất lượng thông tin khi tìm kiếm, tiếp nhận và trao đổi thông tin. Nêu được ví dụ minh hoạ.',
              'Thông hiểu: Giải thích được tính mới, tính chính xác, tính đầy đủ, tính sử dụng được của thông tin. Nêu được ví dụ minh hoạ.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề D. Đạo đức, pháp luật và văn hoá trong môi trường số',
        knowledgeUnits: [
          {
            unit: 'Một số vấn đề pháp lí về sử dụng dịch vụ Internet',
            learningOutcome: [
              'Nhận biết: Nêu được một số nội dung liên quan đến luật Công nghệ thông tin, nghị định về sử dụng dịch vụ Internet, các khía cạnh pháp lí của việc sở hữu, sử dụng và trao đổi thông tin.',
              'Thông hiểu: Trình bày được một số tác động tiêu cực của công nghệ kĩ thuật số đối với đời sống con người và xã hội, nêu được ví dụ minh hoạ.',
              'Thông hiểu: Nêu được một số hành vi vi phạm pháp luật, trái đạo đức, thiếu văn hoá khi hoạt động trong môi trường số thông qua một vài ví dụ.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề E. Ứng dụng tin học',
        knowledgeUnits: [
          {
            unit: '1. Phần mềm mô phỏng và khám phá tri thức',
            learningOutcome: [
              'Nhận biết: Nêu được những kiến thức đã thu nhận từ việc khai thác một vài phần mềm mô phỏng.',
              'Nhận biết: Nhận biết được sự mô phỏng thế giới thực nhờ máy tính có thể giúp con người khám phá tri thức và giải quyết vấn đề.',
              'Thông hiểu: Nêu được ví dụ phần mềm mô phỏng.'
            ]
          },
          {
            unit: '2. Trình bày thông tin trong trao đổi và hợp tác',
            learningOutcome: [
              'Nhận biết: Biết được khả năng đính kèm văn bản, ảnh, video, trang tính vào sơ đồ tư duy.',
              'Vận dụng: Sử dụng được hình ảnh, biểu đồ, video trong trao đổi thông tin và hợp tác.',
              'Vận dụng cao: Sử dụng được bài trình chiếu và sơ đồ tư duy trong trao đổi thông tin và hợp tác.'
            ]
          },
          {
            unit: '3. Sử dụng bảng tính điện tử nâng cao (lựa chọn)',
            learningOutcome: [
              'Vận dụng cao: Thực hiện được dự án sử dụng bảng tính điện tử góp phần giải quyết một bài toán liên quan đến quản lí tài chính, dân số,... (Ví dụ: quản lí chi tiêu của gia đình, quản lí thu chi quỹ lớp).'
            ]
          },
          {
            unit: '4. Làm quen với phần mềm làm video (lựa chọn)',
            learningOutcome: [
              'Nhận biết: Nêu được một số chức năng của phần mềm làm video.',
              'Vận dụng: Thực hiện được một số thao tác cơ bản trong sử dụng một phần mềm làm video.',
              'Vận dụng cao: Tạo được một vài đoạn video đáp ứng nhu cầu cuộc sống của cá nhân, gia đình, trường học, địa phương.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề F. Giải quyết vấn đề với sự trợ giúp của máy tính',
        knowledgeUnits: [
          {
            unit: 'Giải bài toán bằng máy tính',
            learningOutcome: [
              'Nhận biết: Thông qua các ví dụ về lập trình trực quan, nêu được quy trình con người giao bài toán cho máy tính giải quyết.',
              'Thông hiểu: Trình bày được quá trình giải quyết vấn đề và mô tả được giải pháp dưới dạng thuật toán (hoặc bằng phương pháp liệt kê các bước hoặc bằng sơ đồ khối).',
              'Thông hiểu: Giải thích được trong quy trình giải quyết vấn đề có những bước (những vấn đề nhỏ hơn) có thể chuyển giao cho máy tính thực hiện, nêu được ví dụ minh hoạ.',
              'Thông hiểu: Giải thích được khái niệm bài toán trong tin học là một nhiệm vụ có thể giao cho máy tính thực hiện, nêu được ví dụ minh hoạ.',
              'Thông hiểu: Giải thích được chương trình là bản mô tả thuật toán bằng ngôn ngữ mà máy tính có thể "hiểu" và thực hiện.',
              'Vận dụng: Sử dụng được cấu trúc tuần tự, rẽ nhánh, lặp trong mô tả thuật toán.'
            ]
          }
        ]
      },
      {
        name: 'Chủ đề G. Hướng nghiệp với tin học',
        knowledgeUnits: [
          {
            unit: 'Tin học và định hướng nghề nghiệp',
            learningOutcome: [
              'Nhận biết: Trình bày được công việc đặc thù và sản phẩm chính của người làm tin học trong ít nhất ba nhóm nghề.',
              'Nhận biết: Nhận biết được đặc trưng cơ bản của nhóm nghề thuộc hướng Tin học ứng dụng và nhóm nghề thuộc hướng Khoa học máy tính.',
              'Thông hiểu: Nêu và giải thích được ý kiến cá nhân (thích hay không thích,...) về một nhóm nghề nào đó.',
              'Thông hiểu: Giải thích được cả nam và nữ đều có thể thích hợp với các ngành nghề trong lĩnh vực tin học, nêu được ví dụ minh hoạ.',
              'Vận dụng: Tìm hiểu được (thông qua Internet và những kênh thông tin khác) công việc ở một số doanh nghiệp, công ti có sử dụng nhân lực thuộc các nhóm ngành đã được giới thiệu.',
              'Vận dụng: Vận dụng những hiểu biết về nghệ nghiệp liên quan đến tin học để bước đầu định hướng nghề cho bản thân.'
            ]
          }
        ]
      }
    ]
  }
};