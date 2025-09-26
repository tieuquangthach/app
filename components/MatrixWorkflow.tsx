import React, { useState, useCallback } from 'react';
import { QuizMatrix, MatrixRow, QuizSpecification, QuizQuestion, QUESTION_TYPES, COGNITIVE_LEVELS_DOC, LevelCountsDoc, QuestionType } from '../types';
import { generateSpecification, generateQuizFromSpec } from '../services/geminiService';
import Stepper from './Stepper';
import MatrixCreator from './MatrixCreator';
import SpecificationDisplay from './SpecificationDisplay';
import QuizDisplay from './QuizDisplay';

const STEPS = ['Tạo Ma Trận', 'Bảng Đặc Tả', 'Tạo Đề'];

const createInitialCounts = (): Record<QuestionType, LevelCountsDoc> => {
  return QUESTION_TYPES.reduce((acc, type) => {
    acc[type] = COGNITIVE_LEVELS_DOC.reduce((levelAcc, level) => {
      levelAcc[level] = 0;
      return levelAcc;
    }, {} as LevelCountsDoc);
    return acc;
  }, {} as Record<QuestionType, LevelCountsDoc>);
};

const createInitialMatrixRow = (): MatrixRow => ({
  id: new Date().toISOString(),
  topic: '',
  knowledgeUnit: '',
  percentage: 0,
  counts: createInitialCounts()
});


const MatrixWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [matrix, setMatrix] = useState<QuizMatrix>([createInitialMatrixRow()]);
  const [specification, setSpecification] = useState<QuizSpecification>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>('6');


  const handleGenerateSpec = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const nonEmptyRows = matrix.filter(row => {
          if (!row.topic.trim() || !row.knowledgeUnit.trim()) return false;
          return QUESTION_TYPES.some(qType => 
              COGNITIVE_LEVELS_DOC.some(level => (row.counts[qType]?.[level] || 0) > 0)
          );
      });

      if (nonEmptyRows.length === 0) {
        throw new Error("Ma trận không hợp lệ. Vui lòng nhập chủ đề, nội dung và ít nhất một câu hỏi.");
      }
      const spec = await generateSpecification(nonEmptyRows, selectedClass);
      setSpecification(spec);
      setCurrentStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra khi tạo bảng đặc tả.");
    } finally {
      setIsLoading(false);
    }
  }, [matrix, selectedClass]);

  const handleGenerateQuiz = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedQuestions = await generateQuizFromSpec(specification, selectedClass);
      setQuestions(generatedQuestions);
      setCurrentStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra khi tạo đề kiểm tra.");
    } finally {
      setIsLoading(false);
    }
  }, [specification, selectedClass]);
  
  const handleStartOver = () => {
    setCurrentStep(1);
    setMatrix([createInitialMatrixRow()]);
    setSpecification([]);
    setQuestions([]);
    setError(null);
    setSelectedClass('6');
  }

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    // Đặt lại ma trận về trạng thái ban đầu để phù hợp với chương trình học mới
    setMatrix([createInitialMatrixRow()]);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <MatrixCreator 
                  matrix={matrix} 
                  setMatrix={setMatrix} 
                  onSubmit={handleGenerateSpec} 
                  isLoading={isLoading} 
                  selectedClass={selectedClass}
                  onClassChange={handleClassChange}
                />;
      case 2:
        return <SpecificationDisplay specification={specification} matrix={matrix} onBack={() => setCurrentStep(1)} onSubmit={handleGenerateQuiz} isLoading={isLoading} />;
      case 3:
        return <QuizDisplay questions={questions} onStartOver={handleStartOver} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <Stepper currentStep={currentStep} steps={STEPS} />
       {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Lỗi!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
      )}
      {renderCurrentStep()}
    </div>
  );
};

export default MatrixWorkflow;