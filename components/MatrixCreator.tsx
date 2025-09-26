import React, { useMemo, useState } from 'react';
import { MatrixRow, QUESTION_TYPES, COGNITIVE_LEVELS_DOC, QuestionType, CognitiveLevelDoc, QUESTION_TYPE_POINTS, QUESTION_TYPE_TARGETS, COGNITIVE_LEVEL_TARGET_POINTS } from '../types';
import { mathContentData } from '../data/mathContent';

interface MatrixCreatorProps {
  matrix: MatrixRow[];
  setMatrix: React.Dispatch<React.SetStateAction<MatrixRow[]>>;
  onSubmit: () => void;
  isLoading: boolean;
  selectedClass: string;
  onClassChange: (value: string) => void;
}

const MatrixCreator: React.FC<MatrixCreatorProps> = ({ matrix, setMatrix, onSubmit, isLoading, selectedClass, onClassChange }) => {
  const [copyButtonText, setCopyButtonText] = useState('Sao chép Markdown');
  const topicsForClass = mathContentData[selectedClass] || [];

  const handleAddRow = () => {
    const newRow: MatrixRow = {
      id: new Date().toISOString(),
      topic: '',
      knowledgeUnit: '',
      percentage: 0,
      counts: QUESTION_TYPES.reduce((acc, type) => {
        acc[type] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
          levelAcc[level] = 0;
          return levelAcc;
        }, {} as any);
        return acc;
      }, {} as any),
    };
    setMatrix([...matrix, newRow]);
  };

  const handleRemoveRow = (id: string) => {
    if (matrix.length > 1) {
      setMatrix(matrix.filter(row => row.id !== id));
    }
  };

  const handleUpdate = (id: string, field: 'topic' | 'knowledgeUnit' | 'count', value: any, qType?: QuestionType, level?: CognitiveLevelDoc) => {
    setMatrix(currentMatrix =>
      currentMatrix.map(row => {
        if (row.id !== id) {
          return row;
        }

        let updatedRow = { ...row };

        if (field === 'topic') {
          const newTopicData = topicsForClass.find(t => t.name === value);
          const firstKnowledgeUnit = newTopicData?.knowledgeUnits[0] || '';
          updatedRow = { ...updatedRow, topic: value, knowledgeUnit: firstKnowledgeUnit };
        } else if (field === 'knowledgeUnit') {
          updatedRow = { ...updatedRow, knowledgeUnit: value };
        } else if (field === 'count' && qType && level) {
          const newCounts = { ...updatedRow.counts };
          newCounts[qType] = { ...newCounts[qType], [level]: value };
          updatedRow = { ...updatedRow, counts: newCounts };
        }

        // Always recalculate percentage for the modified row
        let rowPoints = 0;
        for (const type of QUESTION_TYPES) {
          const typeTotalInRow = COGNITIVE_LEVELS_DOC.reduce((sum, lvl) => sum + (Number(updatedRow.counts[type][lvl]) || 0), 0);
          rowPoints += typeTotalInRow * QUESTION_TYPE_POINTS[type];
        }
        updatedRow.percentage = parseFloat((rowPoints * 10).toFixed(2));

        return updatedRow;
      })
    );
  };


  const totalQuestions = useMemo(() => {
    return matrix.reduce((total, row) => {
      let rowTotal = 0;
      for (const qType of QUESTION_TYPES) {
        rowTotal += Object.values(row.counts[qType]).reduce<number>((sum, count) => sum + (Number(count) || 0), 0);
      }
      return total + rowTotal;
    }, 0);
  }, [matrix]);

  const totalPercentage = useMemo(() => {
    return matrix.reduce((total, row) => total + (Number(row.percentage) || 0), 0);
  }, [matrix]);
  
  const totalsByQuestionType = useMemo(() => {
    const totals = {} as Record<QuestionType, number>;
    QUESTION_TYPES.forEach(qType => {
        totals[qType] = matrix.reduce((total, row) => {
            const rowQTypeTotal = COGNITIVE_LEVELS_DOC.reduce((sum, level) => {
                return sum + (Number(row.counts[qType][level]) || 0);
            }, 0);
            return total + rowQTypeTotal;
        }, 0);
    });
    return totals;
  }, [matrix]);
  
  const columnTotals = useMemo(() => {
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

  const grandTotalsByLevel = useMemo(() => {
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

  const totalPoints = useMemo(() => totalPercentage / 10, [totalPercentage]);

  const columnPoints = useMemo(() => {
      const points = {} as Record<QuestionType, Record<CognitiveLevelDoc, number>>;
      QUESTION_TYPES.forEach(qType => {
          points[qType] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
              const count = columnTotals[qType][level];
              levelAcc[level] = count * QUESTION_TYPE_POINTS[qType];
              return levelAcc;
          }, {} as Record<CognitiveLevelDoc, number>);
      });
      return points;
  }, [columnTotals]);

  const grandTotalPointsByLevel = useMemo(() => {
      const totals = {} as Record<CognitiveLevelDoc, number>;
      COGNITIVE_LEVELS_DOC.forEach(level => {
        totals[level] = QUESTION_TYPES.reduce((sum, qType) => sum + (columnPoints[qType][level] || 0), 0);
      });
      return totals;
  }, [columnPoints]);

  const isSubmittable = useMemo(() => {
    const allQuestionTypeTargetsMet = QUESTION_TYPES.every(qType => totalsByQuestionType[qType] === QUESTION_TYPE_TARGETS[qType]);
    
    const allCognitiveLevelPointsMet = COGNITIVE_LEVELS_DOC.every(level => {
      const currentPoints = grandTotalPointsByLevel[level];
      const targetPoints = COGNITIVE_LEVEL_TARGET_POINTS[level];
      return Math.abs(currentPoints - targetPoints) < 0.01;
    });

    const allRowsValid = matrix.every(row => {
        const rowTotal = QUESTION_TYPES.reduce((sum, qType) => sum + COGNITIVE_LEVELS_DOC.reduce((lsum, level) => lsum + (Number(row.counts[qType][level]) || 0), 0), 0);
        if (rowTotal > 0) {
            return !!row.topic.trim() && !!row.knowledgeUnit.trim();
        }
        return true; // Empty rows are considered valid
    });

    return allQuestionTypeTargetsMet && allCognitiveLevelPointsMet && allRowsValid;
  }, [matrix, totalsByQuestionType, grandTotalPointsByLevel]);


  const handleCopyMarkdown = () => {
    let md = '';

    // Header
    const headerLevels = QUESTION_TYPES.flatMap(qType => COGNITIVE_LEVELS_DOC.map(level => `${qType} (${level})`));
    const totalLevels = COGNITIVE_LEVELS_DOC.map(level => `Tổng (${level})`);
    md += `| STT | Chủ đề/Chương | Nội dung/đơn vị kiến thức | ${headerLevels.join(' | ')} | ${totalLevels.join(' | ')} | Tỉ lệ % điểm |\n`;

    // Separator
    md += `|:---:|:---|:---|${headerLevels.map(() => ':---:').join('|')}|${totalLevels.map(() => ':---:').join('|')}|:---:|\n`;

    // Body
    matrix.forEach((row, index) => {
        const rowTotalsByLevel = COGNITIVE_LEVELS_DOC.reduce((acc, level) => {
          acc[level] = QUESTION_TYPES.reduce((sum, qType) => sum + (Number(row.counts[qType][level]) || 0), 0);
          return acc;
        }, {} as Record<CognitiveLevelDoc, number>);

        const countsStr = QUESTION_TYPES.flatMap(qType => COGNITIVE_LEVELS_DOC.map(level => row.counts[qType][level] || 0));
        const totalsStr = COGNITIVE_LEVELS_DOC.map(level => rowTotalsByLevel[level]);
        md += `| ${index + 1} | ${row.topic || ''} | ${row.knowledgeUnit || ''} | ${countsStr.join(' | ')} | ${totalsStr.join(' | ')} | ${row.percentage} |\n`;
    });

    md += `|---|---|---|${headerLevels.map(() => '---').join('|')}|${totalLevels.map(() => '---').join('|')}|---|\n`; // Footer separator

    // Footer - Total Questions
    const totalCountsStr = QUESTION_TYPES.flatMap(qType => COGNITIVE_LEVELS_DOC.map(level => columnTotals[qType][level]));
    const grandTotalCountsStr = COGNITIVE_LEVELS_DOC.map(level => grandTotalsByLevel[level]);
    md += `| **TỔNG SỐ CÂU** | | | ${totalCountsStr.join(' | ')} | ${grandTotalCountsStr.join(' | ')} | **${totalQuestions}** |\n`;

    // Footer - Total Points
    const totalPointsStr = QUESTION_TYPES.flatMap(qType => COGNITIVE_LEVELS_DOC.map(level => columnPoints[qType][level].toFixed(2)));
    const grandTotalPointsStr = COGNITIVE_LEVELS_DOC.map(level => grandTotalPointsByLevel[level].toFixed(2));
    md += `| **TỔNG SỐ ĐIỂM** | | | ${totalPointsStr.join(' | ')} | ${grandTotalPointsStr.join(' | ')} | **${totalPoints.toFixed(2)}** |\n`;

    // Footer - Total Percentage
    const totalPercentsStr = QUESTION_TYPES.flatMap(qType => COGNITIVE_LEVELS_DOC.map(level => `${(columnPoints[qType][level] * 10).toFixed(0)}%`));
    const grandTotalPercentsStr = COGNITIVE_LEVELS_DOC.map(level => `${(grandTotalPointsByLevel[level] * 10).toFixed(0)}%`);
    md += `| **TỈ LỆ %** | | | ${totalPercentsStr.join(' | ')} | ${grandTotalPercentsStr.join(' | ')} | **${totalPercentage.toFixed(0)}%** |\n`;

    navigator.clipboard.writeText(md).then(() => {
        setCopyButtonText('Đã sao chép!');
        setTimeout(() => setCopyButtonText('Sao chép Markdown'), 2000);
    }).catch(err => {
        console.error('Không thể sao chép Markdown Ma Trận:', err);
        setCopyButtonText('Lỗi!');
        setTimeout(() => setCopyButtonText('Sao chép Markdown'), 2000);
    });
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
                        `<td>${columnTotals[qType][level]}</td>`
                    ).join('')
                ).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => 
                    `<td>${grandTotalsByLevel[level]}</td>`
                ).join('')}
                <td>${totalQuestions}</td>
            </tr>
            <tr>
                <td colspan="3" class="text-left">TỔNG SỐ ĐIỂM</td>
                ${QUESTION_TYPES.map(qType =>
                    COGNITIVE_LEVELS_DOC.map(level => 
                      `<td>${columnPoints[qType][level].toFixed(2)}</td>`
                    ).join('')
                  ).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => 
                    `<td>${grandTotalPointsByLevel[level].toFixed(2)}</td>`
                ).join('')}
                <td>${totalPoints.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="3" class="text-left">TỈ LỆ %</td>
                ${QUESTION_TYPES.map(qType =>
                    COGNITIVE_LEVELS_DOC.map(level => 
                      `<td>${(columnPoints[qType][level] * 10).toFixed(0)}%</td>`
                    ).join('')
                  ).join('')}
                ${COGNITIVE_LEVELS_DOC.map(level => 
                    `<td>${(grandTotalPointsByLevel[level] * 10).toFixed(0)}%</td>`
                ).join('')}
                <td>${totalPercentage.toFixed(0)}%</td>
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


  return (
    <div className="bg-primary p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">Bước 1: Tạo Ma Trận Đề Kiểm Tra</h2>
      
      <div className="flex justify-start items-center gap-4">
        <label htmlFor="class-selector" className="text-lg font-medium text-indigo-200">Lớp:</label>
        <select
          id="class-selector"
          value={selectedClass}
          onChange={(e) => onClassChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
          aria-label="Chọn lớp học"
        >
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 text-sm">
          <thead className="text-center align-middle">
            <tr>
              <th rowSpan={3} className="px-2 py-3 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300">STT</th>
              <th rowSpan={3} className="px-2 py-3 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300" style={{ minWidth: '180px' }}>Chủ đề/Chương</th>
              <th rowSpan={3} className="px-2 py-3 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300" style={{ minWidth: '200px' }}>Nội dung/đơn vị kiến thức</th>
              <th colSpan={12} className="px-2 py-3 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300">Mức độ đánh giá</th>
              <th colSpan={3} className="px-2 py-3 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300">Tổng</th>
              <th rowSpan={3} className="px-2 py-3 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300" style={{ minWidth: '80px' }}>Tỉ lệ % điểm</th>
              <th rowSpan={3} className="w-12 border border-gray-300 bg-primary"></th>
            </tr>
            <tr>
              {QUESTION_TYPES.map(type => (
                <th key={type} colSpan={3} className="px-2 py-2 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300">{type}</th>
              ))}
              {COGNITIVE_LEVELS_DOC.map(level => (
                <th key={level} rowSpan={2} className="px-2 py-2 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300">{level}</th>
              ))}
            </tr>
            <tr>
              {QUESTION_TYPES.map(qType => 
                COGNITIVE_LEVELS_DOC.map(level => (
                  <th key={`${qType}-${level}`} className="px-2 py-2 text-sm font-extrabold text-white bg-primary uppercase tracking-wider border border-gray-300">{level}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matrix.map((row, index) => {
              const rowTotalsByLevel = COGNITIVE_LEVELS_DOC.reduce((acc, level) => {
                acc[level] = QUESTION_TYPES.reduce((sum, qType) => {
                    return sum + (Number(row.counts[qType][level]) || 0);
                }, 0);
                return acc;
              }, {} as Record<CognitiveLevelDoc, number>);

              const selectedTopicData = topicsForClass.find(t => t.name === row.topic);
              const knowledgeUnitsForTopic = selectedTopicData ? selectedTopicData.knowledgeUnits : [];

              return (
              <tr key={row.id}>
                <td className="px-2 py-2 border border-gray-300 text-center">{index + 1}</td>
                <td className="p-0 border border-gray-300">
                   <select
                    value={row.topic}
                    onChange={(e) => handleUpdate(row.id, 'topic', e.target.value)}
                    className="w-full h-full px-2 py-2 bg-white border-0 rounded-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  >
                    <option value="" disabled>-- Chọn chủ đề/chương --</option>
                    {topicsForClass.map(topic => (
                      <option key={topic.name} value={topic.name}>{topic.name}</option>
                    ))}
                  </select>
                </td>
                <td className="p-0 border border-gray-300">
                  <select
                    value={row.knowledgeUnit}
                    onChange={(e) => handleUpdate(row.id, 'knowledgeUnit', e.target.value)}
                    disabled={!row.topic || knowledgeUnitsForTopic.length === 0}
                    className="w-full h-full px-2 py-2 bg-white border-0 rounded-none focus:ring-2 focus:ring-inset focus:ring-primary disabled:bg-gray-100"
                  >
                    <option value="" disabled>-- Chọn nội dung --</option>
                    {knowledgeUnitsForTopic.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </td>
                {QUESTION_TYPES.map(qType => 
                  COGNITIVE_LEVELS_DOC.map(level => (
                    <td key={`${qType}-${level}`} className="p-0 border border-gray-300">
                      <input
                        type="number"
                        min="0"
                        value={row.counts[qType][level]}
                        onChange={(e) => handleUpdate(row.id, 'count', parseInt(e.target.value, 10) || 0, qType, level)}
                        className="w-full h-full p-2 text-center bg-transparent border-0 rounded-none focus:ring-2 focus:ring-inset focus:ring-primary"
                      />
                    </td>
                  ))
                )}
                {COGNITIVE_LEVELS_DOC.map(level => (
                  <td key={level} className="px-2 py-2 border border-gray-300 text-center font-bold text-text-accent">
                    {rowTotalsByLevel[level]}
                  </td>
                ))}
                <td className="px-2 py-2 border border-gray-300 text-center bg-gray-50 font-medium text-text-main align-middle">
                  {row.percentage}
                </td>
                <td className="px-2 py-2 text-center border border-gray-300">
                   <button onClick={() => handleRemoveRow(row.id)} className="text-red-500 hover:text-red-700 disabled:opacity-50" disabled={matrix.length <= 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
          <tfoot className="bg-gray-100 font-bold">
            <tr>
              <td colSpan={3} className="px-2 py-2 border border-gray-300 text-left">TỔNG SỐ CÂU</td>
              {QUESTION_TYPES.map(qType =>
                COGNITIVE_LEVELS_DOC.map(level => (
                  <td key={`${qType}-${level}-total`} className="px-2 py-2 border border-gray-300 text-center">
                    {columnTotals[qType][level]}
                  </td>
                ))
              )}
              {COGNITIVE_LEVELS_DOC.map(level => (
                <td key={`${level}-grandtotal`} className="px-2 py-2 border border-gray-300 text-center">
                  {grandTotalsByLevel[level]}
                </td>
              ))}
              <td className="px-2 py-2 border border-gray-300 text-center">
                {totalQuestions}
              </td>
              <td className="border border-gray-300"></td>
            </tr>
            <tr>
              <td colSpan={3} className="px-2 py-2 border border-gray-300 text-left">TỔNG SỐ ĐIỂM</td>
              {QUESTION_TYPES.map(qType =>
                COGNITIVE_LEVELS_DOC.map(level => (
                  <td key={`${qType}-${level}-points`} className="px-2 py-2 border border-gray-300 text-center">
                    {columnPoints[qType][level].toFixed(2)}
                  </td>
                ))
              )}
              {COGNITIVE_LEVELS_DOC.map(level => (
                <td key={`${level}-grandtotal-points`} className="px-2 py-2 border border-gray-300 text-center">
                  {grandTotalPointsByLevel[level].toFixed(2)}
                </td>
              ))}
              <td className="px-2 py-2 border border-gray-300 text-center">
                {totalPoints.toFixed(2)}
              </td>
              <td className="border border-gray-300"></td>
            </tr>
            <tr>
              <td colSpan={3} className="px-2 py-2 border border-gray-300 text-left">TỈ LỆ %</td>
              {QUESTION_TYPES.map(qType =>
                COGNITIVE_LEVELS_DOC.map(level => (
                  <td key={`${qType}-${level}-percent`} className="px-2 py-2 border border-gray-300 text-center">
                    {(columnPoints[qType][level] * 10).toFixed(0)}%
                  </td>
                ))
              )}
              {COGNITIVE_LEVELS_DOC.map(level => (
                <td key={`${level}-grandtotal-percent`} className="px-2 py-2 border border-gray-300 text-center">
                  {(grandTotalPointsByLevel[level] * 10).toFixed(0)}%
                </td>
              ))}
              <td className={`px-2 py-2 border border-gray-300 text-center ${totalPercentage.toFixed(0) === '100' ? 'text-green-700' : 'text-red-700'}`}>
                {totalPercentage.toFixed(0)}%
              </td>
              <td className="border border-gray-300"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button onClick={handleAddRow} className="text-sm font-medium text-indigo-300 hover:text-white">+ Thêm chủ đề/chương</button>
      
      <div className="border-t border-indigo-500 pt-6 space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-white mb-4">Kiểm tra số lượng câu hỏi:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUESTION_TYPES.map(qType => {
              const current = totalsByQuestionType[qType];
              const target = QUESTION_TYPE_TARGETS[qType];
              const isMet = current === target;
              return (
                <div key={qType} className={`p-3 rounded-lg border transition-all ${isMet ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10'}`}>
                  <p className="font-semibold text-indigo-100">{qType}</p>
                  <p className={`text-base font-bold ${isMet ? 'text-green-400' : 'text-red-400'}`}>{current} / {target}</p>
                  {!isMet && <p className="text-xs font-medium text-red-300">{current > target ? `Thừa ${current - target} câu` : `Thiếu ${target - current} câu`}</p>}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white mb-4">Kiểm tra số điểm:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUESTION_TYPES.map(qType => {
              const currentPoints = totalsByQuestionType[qType] * QUESTION_TYPE_POINTS[qType];
              const targetPoints = QUESTION_TYPE_TARGETS[qType] * QUESTION_TYPE_POINTS[qType];
              const isMet = Math.abs(currentPoints - targetPoints) < 0.01;
              const diff = Math.abs(currentPoints - targetPoints);

              return (
                <div key={qType} className={`p-3 rounded-lg border transition-all ${isMet ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10'}`}>
                  <p className="font-semibold text-indigo-100">{qType}</p>
                  <p className={`text-base font-bold ${isMet ? 'text-green-400' : 'text-red-400'}`}>{currentPoints.toFixed(2)} / {targetPoints.toFixed(2)}</p>
                  {!isMet && <p className="text-xs font-medium text-red-300">{currentPoints > targetPoints ? `Thừa ${diff.toFixed(2)} điểm` : `Thiếu ${diff.toFixed(2)} điểm`}</p>}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white mb-4">Kiểm tra số điểm mỗi mức độ:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COGNITIVE_LEVELS_DOC.map(level => {
                const currentPoints = grandTotalPointsByLevel[level];
                const targetPoints = COGNITIVE_LEVEL_TARGET_POINTS[level];
                const isMet = Math.abs(currentPoints - targetPoints) < 0.01;
                const diff = Math.abs(currentPoints - targetPoints);

                return (
                    <div key={level} className={`p-3 rounded-lg border transition-all ${isMet ? 'border-green-400 bg-green-500/10' : 'border-red-400 bg-red-500/10'}`}>
                        <p className="font-semibold text-indigo-100">{level}</p>
                        <p className={`text-base font-bold ${isMet ? 'text-green-400' : 'text-red-400'}`}>{currentPoints.toFixed(2)} / {targetPoints.toFixed(2)}</p>
                        {!isMet && <p className="text-xs font-medium text-red-300">{currentPoints > targetPoints ? `Thừa ${diff.toFixed(2)} điểm` : `Thiếu ${diff.toFixed(2)} điểm`}</p>}
                    </div>
                );
            })}
          </div>
        </div>
        <div className="pt-4 flex justify-end items-center flex-wrap gap-4">
          <button
            onClick={handleCopyMarkdown}
            className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            {copyButtonText}
          </button>
          <button
            onClick={handleDownloadMatrixWord}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label="Tải ma trận về dưới dạng Word"
          >
            Tải Ma Trận (Word)
          </button>
          <button
            onClick={onSubmit}
            disabled={!isSubmittable || isLoading}
            className="bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang xử lý...' : 'Tạo Bảng Đặc Tả'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatrixCreator;