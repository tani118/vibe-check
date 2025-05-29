import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { quizQuestions, getVibeFromScore } from '../lib/quiz'
import { submitVibeResult } from '../lib/database'
import { useAuth } from '../hooks/useAuth'

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [vibeResult, setVibeResult] = useState(null)
  
  // Generate stable random values for background elements
  const [backgroundElements] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 60 + 20,
      height: Math.random() * 60 + 20,
      color: ['#08D9D640', '#FF2E6340', '#9D4EDD40'][Math.floor(Math.random() * 3)],
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2
    }))
  )

  // Generate stable random values for celebration background
  const [celebrationElements] = useState(() => 
    Array.from({ length: 25 }).map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 40 + 10,
      height: Math.random() * 40 + 10,
      color: ['#FFD700', '#FF69B4', '#00FFFF', '#FF6347'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 1
    }))
  )
  
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleAnswerSelect = (questionId, points) => {
    setAnswers({ ...answers, [questionId]: points })
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishQuiz = async () => {
    setLoading(true)
    
    // Calculate total score
    const totalScore = Object.values(answers).reduce((sum, points) => sum + points, 0)
    const result = getVibeFromScore(totalScore)
    
    // Submit to database
    try {
      await submitVibeResult(user.id, result.vibe, totalScore)
      setVibeResult({ ...result, score: totalScore })
      setQuizComplete(true)
    } catch (error) {
      console.error('Error submitting quiz result:', error)
    }
    
    setLoading(false)
  }

  const currentQ = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const canProceed = answers[currentQ?.id] !== undefined

  if (quizComplete && vibeResult) {
    return (
      <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
        {/* Celebration background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-secondary-950/30 to-accent-950/50"></div>
          {celebrationElements.map((element, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-bounce"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                background: `radial-gradient(circle, ${element.color}60, transparent)`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>

        {/* Floating celebration elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] text-6xl animate-bounce">🎉</div>
          <div className="absolute top-20 right-[15%] text-5xl animate-float">✨</div>
          <div className="absolute top-32 left-[70%] text-4xl animate-pulse">🌟</div>
          <div className="absolute bottom-20 left-[20%] text-6xl animate-bounce">💫</div>
          <div className="absolute bottom-32 right-[25%] text-5xl animate-float">🎊</div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
          <div className="w-full max-w-3xl text-center">
            <div className="glass-card p-16">
              <div className="text-9xl mb-8 animate-float">{vibeResult.emoji}</div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                <span className="holographic-text">Your Vibe Is</span>
              </h1>
              
              <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-12">
                {vibeResult.vibe}
              </h2>
              
              <div className="glass-card p-8 mb-12">
                <div className="text-4xl font-bold text-primary-400 mb-4">
                  {vibeResult.score}/50
                </div>
                <div className="text-lg text-neutral-300">
                  {vibeResult.score >= 20 
                    ? "You're radiating authentic positive energy ✨" 
                    : vibeResult.score >= 0
                    ? "You're maintaining beautiful balanced energy ⚖️"
                    : "You're in a reflective phase, and that's perfectly valid 💜"
                  }
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={() => navigate('/home')}
                  className="btn-primary text-lg px-8 py-4"
                >
                  View Dashboard
                </button>
                
                <button
                  onClick={() => navigate('/users')}
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Explore Community
                </button>
              </div>
              
              <p className="text-neutral-400 mt-8 text-sm">
                Want to retake? Visit your dashboard anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-secondary-950/30 to-accent-950/50"></div>
        <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
          {backgroundElements.map((element, i) => (
            <div
              key={i}
              className="border border-primary-500/10 animate-pulse"
              style={{
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="holographic-text">Vibe Check</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <div className="glass-card p-2 mb-4">
            <div 
              className="h-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-neutral-400">
            {Math.round(progress)}% complete • You're doing amazing
          </p>
        </div>

        {/* Question Card */}
        <div className="glass-card p-8 md:p-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-relaxed">
              {currentQ?.question}
            </h2>
          </div>
          
          <div className="space-y-6">
            {currentQ?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQ.id, option.points)}
                className={`w-full p-6 md:p-8 rounded-xl border-2 transition-all duration-300 text-left group ${
                  answers[currentQ.id] === option.points
                    ? 'border-primary-400 bg-primary-400/20 scale-[1.02]'
                    : 'border-white/20 bg-white/5 hover:border-primary-400/50 hover:bg-white/10 hover:scale-[1.01]'
                }`}
              >
                <p className="text-white font-semibold text-lg md:text-xl mb-3 group-hover:text-primary-300 transition-colors">
                  {option.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400 text-sm">
                    {option.points > 0 ? `+${option.points}` : option.points} points
                  </span>
                  <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                    answers[currentQ.id] === option.points
                      ? 'border-primary-400 bg-primary-400'
                      : 'border-white/30 group-hover:border-primary-400'
                  }`}>
                    {answers[currentQ.id] === option.points && (
                      <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <div className="text-neutral-400 text-center hidden md:block">
            {canProceed ? "Great choice! Ready to continue?" : "Please select an answer to proceed"}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed || loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Calculating...</span>
              </div>
            ) : currentQuestion === quizQuestions.length - 1 ? (
              'Reveal My Vibe ✨'
            ) : (
              'Next →'
            )}
          </button>
        </div>

        {/* Motivational text */}
        <div className="text-center mt-12">
          <p className="text-neutral-500">
            There are no wrong answers • Trust your instincts ✨
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
