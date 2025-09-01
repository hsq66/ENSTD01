import React, { useState } from 'react';
import { RefreshCw, Volume2, CheckCircle, X, RotateCcw } from 'lucide-react';
import { VocabularyCard } from '../../../contexts/LearningContext';

interface VocabularyReviewProps {
  cards: VocabularyCard[];
}

export default function VocabularyReview({ cards }: VocabularyReviewProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<number[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentCardIndex];
  const cardsToReview = cards.filter(card => new Date(card.nextReview) <= new Date());
  const progress = reviewedCards.length;
  const total = cardsToReview.length;

  const handleNext = () => {
    setReviewedCards(prev => [...prev, currentCardIndex]);
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
    setShowAnswer(false);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const handleDifficultyRating = (rating: 'easy' | 'medium' | 'hard') => {
    // This would update the spaced repetition algorithm
    console.log(`Rating word "${currentCard.word}" as ${rating}`);
    handleNext();
  };

  const playPronunciation = () => {
    // This would trigger text-to-speech
    console.log(`Playing pronunciation for: ${currentCard.word}`);
  };

  if (cards.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <RefreshCw className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">暂无词汇需要复习</h3>
        <p className="text-gray-600">您已经完成了今天的词汇复习任务！</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">词汇复习</h2>
        <div className="text-sm text-gray-600">
          {progress} / {total} 已复习
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">复习进度</span>
          <span className="text-sm text-gray-600">{Math.round((progress / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(progress / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="max-w-2xl mx-auto">
        <div 
          className={`relative w-full h-80 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-full flex flex-col justify-center items-center text-center">
              <div className="mb-6">
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{currentCard.word}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation();
                  }}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm">{currentCard.pronunciation}</span>
                </button>
              </div>
              <p className="text-gray-600 mb-6">点击卡片查看释义</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  levelColors[currentCard.level as keyof typeof levelColors]
                }`}>
                  {currentCard.level}
                </span>
                <span>复习次数: {currentCard.reviewCount}</span>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center text-white">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-4">{currentCard.word}</h3>
                <p className="text-xl mb-4">{currentCard.definition}</p>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <p className="text-lg italic">"{currentCard.example}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating buttons */}
        {showAnswer && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => handleDifficultyRating('hard')}
              className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
              困难
            </button>
            <button
              onClick={() => handleDifficultyRating('medium')}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              一般
            </button>
            <button
              onClick={() => handleDifficultyRating('easy')}
              className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
            >
              <CheckCircle className="w-5 h-5" />
              简单
            </button>
          </div>
        )}
      </div>

      {/* Study stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">复习统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{cards.length}</p>
            <p className="text-sm text-gray-600">总词汇量</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{cardsToReview.length}</p>
            <p className="text-sm text-gray-600">今日待复习</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{progress}</p>
            <p className="text-sm text-gray-600">已复习</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">85%</p>
            <p className="text-sm text-gray-600">掌握率</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const levelColors = {
  'A1': 'bg-green-100 text-green-700',
  'A2': 'bg-blue-100 text-blue-700',
  'B1': 'bg-yellow-100 text-yellow-700',
  'B2': 'bg-orange-100 text-orange-700',
  'C1': 'bg-red-100 text-red-700',
  'C2': 'bg-purple-100 text-purple-700'
};