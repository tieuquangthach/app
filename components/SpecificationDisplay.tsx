import React, { useMemo, useState } from 'react';
import { QuizSpecification, QuizMatrix, MatrixRow, QUESTION_TYPES, COGNITIVE_LEVELS_DOC, QuestionType, CognitiveLevelDoc } from '../types';

interface SpecificationDisplayProps {
  specification: QuizSpecification;
  matrix: QuizMatrix;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

interface GroupedSpec {
  [key: string]: { // chuDe
    [key: string]: { // noiDung
      [key: string]: { // yeuCauCanDat
        [key in QuestionType]?: {
          [key in CognitiveLevelDoc]?: number
        }
      }
    }
  }
}

const SpecificationDisplay: React.FC<SpecificationDisplayProps> = ({ specification, matrix, onBack, onSubmit, isLoading }) => {
  const [copyButtonText, setCopyButtonText] = useState('Sao chép Markdown');
  
  const groupedSpecification = useMemo(() => {
    const grouped: GroupedSpec = {};
    specification.forEach(item => {
      if (!grouped[item.chuDe]) {
        grouped[item.chuDe] = {};
      }
      if (!grouped[item.chuDe][item.noiDung]) {
        grouped[item.chuDe][item.noiDung] = {};
      }
      if (!grouped[item.chuDe][item.noiDung][item.yeuCauCanDat]) {
        grouped[item.chuDe][item.noiDung][item.yeuCauCanDat] = {};
      }
      if (!grouped[item.chuDe][item.noiDung][item.yeuCauCanDat][item.loaiCauHoi]) {
        grouped[item.chuDe][item.noiDung][item.yeuCauCanDat][item.loaiCauHoi] = {};
      }
      grouped[item.chuDe][item.noiDung][item.yeuCauCanDat][item.loaiCauHoi]![item.mucDo] = item.soLuong;
    });
    return grouped;
  }, [specification]);

  const columnTotals = useMemo(() => {
    const totals = QUESTION_TYPES.reduce((acc, qType) => {
        acc[qType] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
            levelAcc[level] = 0;
            return levelAcc;
        }, {} as Record<CognitiveLevelDoc, number>);
        return acc;
    }, {} as Record<QuestionType, Record<CognitiveLevelDoc, number>>);

    specification.forEach(item => {
        if (totals[item.loaiCauHoi]?.[item.mucDo] !== undefined) {
            totals[item.loaiCauHoi][item.mucDo] += (Number(item.soLuong) || 0);
        }
    });
    return totals;
  }, [specification]);

  const grandTotal = useMemo(() => {
      return specification.reduce((sum, item) => sum + (Number(item.soLuong) || 0), 0);
  }, [specification]);

  // Calculations for Matrix Download
  const totalQuestionsMatrix = useMemo(() => {
    return matrix.reduce((total, row) => {
      let rowTotal = 0;
      for (const qType of QUESTION_TYPES) {
        rowTotal += Object.values(row.counts[qType]).reduce<number>((sum, count) => sum + (Number(count) || 0), 0);
      }
      return total + rowTotal;
    }, 0);
  }, [matrix]);

  const totalPercentageMatrix = useMemo(() => {
    return matrix.reduce((total, row) => total + (Number(row.percentage) || 0), 0);
  }, [matrix]);

  const columnTotalsMatrix = useMemo(() => {
    const totals = QUESTION_TYPES.reduce((acc, qType) => {
        acc[qType] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
            levelAcc[level] = 0;
            return levelAcc;
        }, {} as Record<CognitiveLevelDoc, number>);
        return acc;
    }, {} as Record<QuestionType, Record<CognitiveLevelDoc, number>>);

    matrix.forEach(row => {
        QUESTION_TYPES.forEach(qType => {
            COGNITIVE_LEVELS_DOC.forEach(level => {
                totals[qType][level] += (Number(row.counts[qType][level]) || 0);
            });
        });
    });

    return totals;
  }, [matrix]);

  const grandTotalsByLevelMatrix = useMemo(() => {
    const totals = {} as Record<CognitiveLevelDoc, number>;
    COGNITIVE_LEVELS_DOC.forEach(level => {
      totals[level] = matrix.reduce((total, row) => {
        const rowLevelTotal = QUESTION_TYPES.reduce((sum, qType) => {
          return sum + (Number(row.counts[qType][level]) || 0);
        }, 0);
        return total + rowLevelTotal;
      }, 0);
    });
    return totals;
  }, [matrix]);

  const columnPointsMatrix = useMemo(() => {
    const points = QUESTION_TYPES.reduce((acc, qType) => {
        acc[qType] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
            levelAcc[level] = 0;
            return levelAcc;
        }, {} as Record<CognitiveLevelDoc, number>);
        return acc;
    }, {} as Record<QuestionType, Record<CognitiveLevelDoc, number>>);

    matrix.forEach(row => {
        const rowTotalQuestions = QUESTION_TYPES.reduce((sum, qType) => 
            sum + COGNITIVE_LEVELS_DOC.reduce((levelSum, level) => 
                levelSum + (Number(row.counts[qType][level]) || 0), 0), 0);

        if (rowTotalQuestions > 0) {
            const rowTotalPoints = (Number(row.percentage) || 0) / 10;
            const pointsPerQuestionInRow = rowTotalPoints / rowTotalQuestions;

            QUESTION_TYPES.forEach(qType => {
                COGNITIVE_LEVELS_DOC.forEach(level => {
                    points[qType][level] += (Number(row.counts[qType][level]) || 0) * pointsPerQuestionInRow;
                });
            });
        }
    });
    return points;
  }, [matrix]);

  const grandTotalPointsByLevelMatrix = useMemo(() => {
      const totals = {} as Record<CognitiveLevelDoc, number>;
      COGNITIVE_LEVELS_DOC.forEach(level => {
        totals[level] = QUESTION_TYPES.reduce((sum, qType) => sum + columnPointsMatrix[qType][level], 0);
      });
      return totals;
  }, [columnPointsMatrix]);

  const columnPercentagesMatrix = useMemo(() => {
    const percentages = QUESTION_TYPES.reduce((acc, qType) => {
        acc[qType] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
            levelAcc[level] = 0;
            return levelAcc;
        }, {} as Record<CognitiveLevelDoc, number>);
        return acc;
    }, {} as Record<QuestionType, Record<CognitiveLevelDoc, number>>);

    if (totalQuestionsMatrix > 0) {
        QUESTION_TYPES.forEach(qType => {
            COGNITIVE_LEVELS_DOC.forEach(level => {
                percentages[qType][level] = (columnTotalsMatrix[qType][level] / totalQuestionsMatrix) * 100;
            });
        });
    }
    return percentages;
  }, [columnTotalsMatrix, totalQuestionsMatrix]);

  const grandTotalPercentagesByLevelMatrix = useMemo(() => {
    const totals = {} as Record<CognitiveLevelDoc, number>;
    COGNITIVE_LEVELS_DOC.forEach(level => {
      totals[level] = totalQuestionsMatrix > 0 ? (grandTotalsByLevelMatrix[level] / totalQuestionsMatrix) * 100 : 0;
    });
    return totals;
  }, [grandTotalsByLevelMatrix, totalQuestionsMatrix]);

  const handleDownloadSpecWord = () => {
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Bảng Đặc Tả Chi Tiết</title>
            <style>
                body { font-family: 'Times New Roman', serif; }
                table { border-collapse: collapse; width: 100%; font-size: 12pt; }
                th, td { border: 1px solid black; padding: 8px; text-align: center; vertical-align: middle; }
                th { background-color: #f2f2f2; font-weight: bold; }
                .text-left { text-align: left; }
            </style>
        </head>
        <body>
            <h2 style="text-align: center;">BẢNG ĐẶC TẢ CHI TIẾT</h2>
            <table border="1">
              <thead class="bg-gray-50 text-center align-middle">
                  <tr>
                      <th rowspan="3">Chủ đề/Chương</th>
                      <th rowspan="3">Nội dung/đơn vị kiến thức</th>
                      <th rowspan="3">Yêu cầu cần đạt</th>
                      <th colspan="${QUESTION_TYPES.length * COGNITIVE_LEVELS_DOC.length}">Mức độ đánh giá</th>
                      <th rowspan="3">Tổng số câu</th>
                  </tr>
                  <tr>
                      ${QUESTION_TYPES.map(type => `<th colspan="${COGNITIVE_LEVELS_DOC.length}">${type}</th>`).join('')}
                  </tr>
                  <tr>
                      ${QUESTION_TYPES.map(qType => 
                          COGNITIVE_LEVELS_DOC.map(level => `<th>${level}</th>`).join('')
                      ).join('')}
                  </tr>
              </thead>
              <tbody>
    `;

    Object.entries(groupedSpecification).forEach(([chuDe, noiDungGroup]) => {
        const chuDeRowSpan = Object.values(noiDungGroup).reduce((sum, yeuCauGroup) => sum + Object.keys(yeuCauGroup).length, 0);
        let isFirstOfChuDe = true;
        Object.entries(noiDungGroup).forEach(([noiDung, yeuCauGroup]) => {
            const noiDungRowSpan = Object.keys(yeuCauGroup).length;
            let isFirstOfNoiDung = true;
            Object.entries(yeuCauGroup).forEach(([yeuCau, countGroup]) => {
                const rowTotal = Object.values(countGroup)
                    .flatMap(levelCounts => Object.values(levelCounts))
                    .reduce((sum, count) => sum + (Number(count) || 0), 0);
                
                htmlContent += `<tr>`;
                if (isFirstOfChuDe) {
                    htmlContent += `<td rowspan="${chuDeRowSpan}" class="text-left">${chuDe}</td>`;
                }
                if (isFirstOfNoiDung) {
                    htmlContent += `<td rowspan="${noiDungRowSpan}" class="text-left">${noiDung}</td>`;
                }
                htmlContent += `<td class="text-left">${yeuCau}</td>`;

                QUESTION_TYPES.forEach(qType => {
                    COGNITIVE_LEVELS_DOC.forEach(level => {
                        htmlContent += `<td>${countGroup[qType]?.[level] || ''}</td>`;
                    });
                });

                htmlContent += `<td>${rowTotal}</td>`;
                htmlContent += `</tr>`;
                isFirstOfChuDe = false;
                isFirstOfNoiDung = false;
            });
        });
    });

    htmlContent += `
              </tbody>
              <tfoot>
                  <tr>
                      <td colspan="3" style="text-align: right; font-weight: bold;">Tổng cộng</td>
                      ${QUESTION_TYPES.map(qType =>
                          COGNITIVE_LEVELS_DOC.map(level => `<td>${columnTotals[qType]?.[level] || 0}</td>`).join('')
                      ).join('')}
                      <td>${grandTotal}</td>
                  </tr>
              </tfoot>
            </table>
        </body>
        </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bang-dac-ta.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMatrixWord = () => {
    const styles = `
      body { font-family: 'Times New Roman', serif; }
      table { border-collapse: collapse; width: 100%; font-size: 10pt; }
      th, td { border: 1px solid black; padding: 5px; text-align: center; vertical-align: middle; }
      th { background-color: #f2f2f2; font-weight: bold; }
      .text-left { text-align: left; }
      .font-bold { font-weight: bold; }
    `;

    let htmlContent = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Ma Trận Đề Kiểm Tra</title>
            <style>${styles}</style>
        </head>
        <body>
            <h2 style="text-align: center;">MA TRẬN ĐỀ KIỂM TRA</h2>
            <table border="1">
    `;

    // Table Header
    htmlContent += `
        <thead class="bg-gray-50 text-center align-middle">
            <tr>
                <th rowspan="3">STT</th>
                <th rowspan="3">Chủ đề/Chương</th>
                <th rowspan="3">Nội dung/đơn vị kiến thức</th>
                <th colspan="${QUESTION_TYPES.length * COGNITIVE_LEVELS_DOC.length}">Mức độ đánh giá</th>
                <th colspan="${COGNITIVE_LEVELS_DOC.length}">Tổng</th>
                <th rowspan="3">Tỉ lệ % điểm</th>
            </tr>
            <tr>
                ${QUESTION_TYPES.map(type => `<th colspan="${COGNITIVE_LEVELS_DOC.length}">${type}</th>`).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => `<th rowspan="2">${level}</th>`).join('')}
            </tr>
            <tr>
                ${QUESTION_TYPES.map(qType => COGNITIVE_LEVELS_DOC.map(level => `<th>${level}</th>`).join('')).join('')}
            </tr>
        </thead>
    `;

    // Table Body
    htmlContent += `<tbody>`;
    matrix.forEach((row, index) => {
        const rowTotalsByLevel = COGNITIVE_LEVELS_DOC.reduce((acc, level) => {
        acc[level] = QUESTION_TYPES.reduce((sum, qType) => {
            return sum + (Number(row.counts[qType][level]) || 0);
        }, 0);
        return acc;
        }, {} as Record<CognitiveLevelDoc, number>);

        htmlContent += `
            <tr>
                <td>${index + 1}</td>
                <td class="text-left">${row.topic}</td>
                <td class="text-left">${row.knowledgeUnit}</td>
                ${QUESTION_TYPES.map(qType => 
                    COGNITIVE_LEVELS_DOC.map(level => 
                        `<td>${row.counts[qType][level] || 0}</td>`
                    ).join('')
                ).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => 
                    `<td class="font-bold">${rowTotalsByLevel[level]}</td>`
                ).join('')}
                <td>${row.percentage}</td>
            </tr>
        `;
    });
    htmlContent += `</tbody>`;

    // Table Footer
    htmlContent += `
        <tfoot class="font-bold">
            <tr>
                <td colspan="3" class="text-left">TỔNG SỐ CÂU</td>
                ${QUESTION_TYPES.map(qType =>
                    COGNITIVE_LEVELS_DOC.map(level => 
                        `<td>${columnTotalsMatrix[qType][level]}</td>`
                    ).join('')
                ).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => 
                    `<td>${grandTotalsByLevelMatrix[level]}</td>`
                ).join('')}
                <td>${totalQuestionsMatrix}</td>
            </tr>
            <tr>
                <td colspan="3" class="text-left">TỔNG SỐ ĐIỂM</td>
                ${QUESTION_TYPES.map(qType => {
                    const totalPointsForQType = COGNITIVE_LEVELS_DOC.reduce((sum, level) => sum + columnPointsMatrix[qType][level], 0);
                    return `<td colspan="${COGNITIVE_LEVELS_DOC.length}">${totalPointsForQType.toFixed(2)}</td>`;
                }).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => 
                    `<td>${grandTotalPointsByLevelMatrix[level].toFixed(2)}</td>`
                ).join('')}
                <td>${(totalPercentageMatrix / 10).toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="3" class="text-left">TỈ LỆ %</td>
                ${QUESTION_TYPES.map(qType => {
                    const totalPercentageForQType = COGNITIVE_LEVELS_DOC.reduce((sum, level) => sum + columnPercentagesMatrix[qType][level], 0);
                    return `<td colspan="${COGNITIVE_LEVELS_DOC.length}">${totalPercentageForQType.toFixed(0)}%</td>`;
                }).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => 
                    `<td>${grandTotalPercentagesByLevelMatrix[level].toFixed(0)}%</td>`
                ).join('')}
                <td>${totalQuestionsMatrix > 0 ? '100%' : '0%'}</td>
            </tr>
        </tfoot>
    `;

    htmlContent += `</table></body></html>`;

    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ma-tran-de-kiem-tra.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    let md = '# Bảng Đặc Tả Chi Tiết\n\n';
    
    Object.entries(groupedSpecification).forEach(([chuDe, noiDungGroup]) => {
        md += `## ${chuDe}\n\n`;
        Object.entries(noiDungGroup).forEach(([noiDung, yeuCauGroup]) => {
            md += `### ${noiDung}\n\n`;
            
            const headerCells = QUESTION_TYPES.flatMap(qType => COGNITIVE_LEVELS_DOC.map(level => `${qType} (${level})`));
            md += `| Yêu cầu cần đạt | ${headerCells.join(' | ')} | Tổng |\n`;
            md += `|:---|${headerCells.map(() => ':---:').join('|')}|:---:|\n`;
            
            Object.entries(yeuCauGroup).forEach(([yeuCau, countGroup]) => {
                const rowTotal = Object.values(countGroup)
                    .flatMap(levelCounts => Object.values(levelCounts))
                    .reduce((sum, count) => sum + (Number(count) || 0), 0);
                const countCells = QUESTION_TYPES.flatMap(qType =>
                    COGNITIVE_LEVELS_DOC.map(level => countGroup[qType]?.[level] || '')
                );
                md += `| ${yeuCau} | ${countCells.join(' | ')} | **${rowTotal}** |\n`;
            });
            md += '\n';
        });
    });

    md += '## Tổng cộng\n\n';
    const totalHeaderCells = QUESTION_TYPES.flatMap(qType => COGNITIVE_LEVELS_DOC.map(level => `${qType} (${level})`));
    md += `| | ${totalHeaderCells.join(' | ')} | **Tổng cộng** |\n`;
    md += `|:---|${totalHeaderCells.map(() => ':---:').join('|')}|:---:|\n`;
    const totalCountCells = QUESTION_TYPES.flatMap(qType => 
        COGNITIVE_LEVELS_DOC.map(level => columnTotals[qType]?.[level] || 0)
    );
    md += `| **Tổng số câu** | ${totalCountCells.join(' | ')} | **${grandTotal}** |\n`;

    navigator.clipboard.writeText(md).then(() => {
        setCopyButtonText('Đã sao chép!');
        setTimeout(() => setCopyButtonText('Sao chép Markdown'), 2000);
    }).catch(err => {
        console.error('Không thể sao chép Markdown Bảng Đặc Tả:', err);
        setCopyButtonText('Lỗi!');
        setTimeout(() => setCopyButtonText('Sao chép Markdown'), 2000);
    });
  };

  return (
    <div className="bg-primary p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">Bước 2: Bảng Đặc Tả Chi Tiết</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 text-sm">
           <thead className="bg-indigo-900/70 text-center align-middle">
            <tr>
              <th rowSpan={3} className="px-2 py-3 text-xs font-bold text-indigo-300 uppercase tracking-wider border border-gray-300">Chủ đề/Chương</th>
              <th rowSpan={3} className="px-2 py-3 text-xs font-bold text-indigo-300 uppercase tracking-wider border border-gray-300" style={{minWidth: '200px'}}>Nội dung/đơn vị kiến thức</th>
              <th rowSpan={3} className="px-2 py-3 text-xs font-bold text-indigo-300 uppercase tracking-wider border border-gray-300" style={{minWidth: '250px'}}>Yêu cầu cần đạt</th>
              <th colSpan={12} className="px-2 py-3 text-xs font-bold text-indigo-300 uppercase tracking-wider border border-gray-300">Mức độ đánh giá</th>
              <th rowSpan={3} className="px-2 py-3 text-xs font-bold text-indigo-300 uppercase tracking-wider border border-gray-300">Tổng số câu</th>
            </tr>
            <tr>
              {QUESTION_TYPES.map(type => (
                 <th key={type} colSpan={3} className="px-2 py-2 text-xs font-bold text-indigo-300 uppercase tracking-wider border border-gray-300">{type}</th>
              ))}
            </tr>
            <tr>
              {QUESTION_TYPES.map(qType => 
                COGNITIVE_LEVELS_DOC.map(level => (
                  <th key={`${qType}-${level}`} className="px-2 py-2 text-xs font-bold text-indigo-300 uppercase tracking-wider border border-gray-300">{level}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(groupedSpecification).map(([chuDe, noiDungGroup]) => {
              const chuDeRowSpan = Object.values(noiDungGroup).reduce((sum, yeuCauGroup) => sum + Object.keys(yeuCauGroup).length, 0);
              let isFirstOfChuDe = true;

              return Object.entries(noiDungGroup).map(([noiDung, yeuCauGroup]) => {
                const noiDungRowSpan = Object.keys(yeuCauGroup).length;
                let isFirstOfNoiDung = true;

                return Object.entries(yeuCauGroup).map(([yeuCau, countGroup]) => {
                  const rowTotal = Object.values(countGroup)
                    .flatMap(levelCounts => Object.values(levelCounts))
                    .reduce((sum, count) => sum + (Number(count) || 0), 0);

                  const row = (
                    <tr key={`${chuDe}-${noiDung}-${yeuCau}`}>
                      {isFirstOfChuDe && <td rowSpan={chuDeRowSpan} className="px-3 py-3 border border-gray-300 font-semibold align-top">{chuDe}</td>}
                      {isFirstOfNoiDung && <td rowSpan={noiDungRowSpan} className="px-3 py-3 border border-gray-300 align-top">{noiDung}</td>}
                      <td className="px-3 py-3 border border-gray-300">{yeuCau}</td>
                      {QUESTION_TYPES.map(qType =>
                          COGNITIVE_LEVELS_DOC.map(level => (
                              <td key={`${qType}-${level}`} className="px-3 py-3 border border-gray-300 text-center font-bold text-text-accent">
                                  {countGroup[qType]?.[level] || ''}
                              </td>
                          ))
                      )}
                      <td className="px-3 py-3 border border-gray-300 text-center font-bold text-text-main">
                        {rowTotal}
                      </td>
                    </tr>
                  );
                  isFirstOfChuDe = false;
                  isFirstOfNoiDung = false;
                  return row;
                });
              });
            })}
          </tbody>
           <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td colSpan={3} className="px-3 py-3 border border-gray-300 text-right">Tổng cộng</td>
              {QUESTION_TYPES.map(qType =>
                COGNITIVE_LEVELS_DOC.map(level => (
                  <td key={`${qType}-${level}`} className="px-3 py-3 border border-gray-300 text-center">
                    {columnTotals[qType]?.[level] || 0}
                  </td>
                ))
              )}
              <td className="px-3 py-3 border border-gray-300 text-center">{grandTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="border-t border-indigo-500 pt-4 flex justify-between items-center flex-wrap gap-4">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Quay Lại
        </button>
        <div className="flex items-center gap-4 flex-wrap justify-end">
           <button
            onClick={handleCopyMarkdown}
            disabled={isLoading}
            className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            {copyButtonText}
          </button>
          <button
            onClick={handleDownloadMatrixWord}
            disabled={isLoading}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Tải Ma Trận (Word)
          </button>
          <button
            onClick={handleDownloadSpecWord}
            disabled={isLoading}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            Tải Bảng Đặc Tả (Word)
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50"
          >
            {isLoading ? 'Đang tạo đề...' : 'Tạo Đề Kiểm Tra'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecificationDisplay;