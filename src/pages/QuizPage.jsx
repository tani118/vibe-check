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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black relative overflow-hidden">
        {/* Celebration background */}
        <div className="absolute inset-0">
          {celebrationElements.map((element, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-bounce"
              style={{
                left: `${element.left}%`,
                top: `${element.top}%`,
                width: `${element.width}px`,
                height: `${element.height}px`,
                background: `radial-gradient(circle, ${element.color}, transparent)`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`
              }}
            />
          ))}
        </div>

        {/* Floating celebration emojis */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-[10%] text-6xl animate-bounce">🎉</div>
          <div className="absolute top-20 right-[15%] text-5xl animate-wiggle">✨</div>
          <div className="absolute top-32 left-[70%] text-4xl animate-float">🌟</div>
          <div className="absolute bottom-20 left-[20%] text-6xl animate-pulse">💫</div>
          <div className="absolute bottom-32 right-[25%] text-5xl animate-bounce">🎊</div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
          <div className="w-full max-w-2xl text-center">
            <div className="glass-card p-12 rounded-3xl">
              <div className="text-8xl mb-6 animate-bounce">{vibeResult.emoji}</div>
              
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 mb-6">
                your vibe is
              </h1>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 gradient-text">
                {vibeResult.vibe}
              </h2>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <p className="text-xl text-white/90 mb-4">
                  your vibe score: <span className="font-bold text-cyan-400">{vibeResult.score}/50</span>
                </p>
                <p className="text-lg text-white/80">
                  {vibeResult.score >= 20 
                    ? "friend you're absolutely bringing authentic energy rn ✨" 
                    : vibeResult.score >= 0
                    ? "you're giving balanced energy, we love to see it ✨"
                    : "it's giving 'need some self care' vibes and that's valid fam 💜"
                  }
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/home')}
                  className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  check out your dashboard ✨
                </Button>
                
                <Button
                  onClick={() => navigate('/users')}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-bold py-4 px-8 rounded-full transition-all duration-300 text-lg ml-4"
                >
                  see other vibes 👥
                </Button>
              </div>
              
              <p className="text-white/60 mt-6 text-sm">
                want to retake? just hit up your dashboard friend
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-pink-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {backgroundElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              background: `radial-gradient(circle, ${element.color}, transparent)`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-4">
            vibe check time friend ✨
          </h1>
          <p className="text-lg text-white/80">
            question {currentQuestion + 1} of {quizQuestions.length} - just be honest fam
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-white/60 mt-2 text-sm">
            {Math.round(progress)}% complete - you're doing great! 💪
          </p>
        </div>

        {/* Question Card */}
        <Card className="glass-card border-0 shadow-2xl mb-8">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-white text-center leading-relaxed">
              {currentQ?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQ?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQ.id, option.points)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left ${
                    answers[currentQ.id] === option.points
                      ? 'border-pink-400 bg-pink-400/20 scale-105'
                      : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  <p className="text-white font-medium text-lg">{option.text}</p>
                  <p className="text-white/60 text-sm mt-2">
                    {option.points > 0 ? `+${option.points}` : option.points} points
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed py-3 px-6 rounded-full font-bold"
          >
            ← back
          </Button>

          <div className="text-white/60 text-sm">
            {canProceed ? "looking good friend! 👀" : "pick an answer to continue ✨"}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed || loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>calculating...</span>
              </div>
            ) : currentQuestion === quizQuestions.length - 1 ? (
              'get my vibe! ✨'
            ) : (
              'next →'
            )}
          </Button>
        </div>

        {/* Motivational text */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            no wrong answers friend, just vibe with it 💫
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
