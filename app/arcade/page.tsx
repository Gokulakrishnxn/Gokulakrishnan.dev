"use client"

import { useState, useEffect, useRef } from "react"
import { BrowserNavigation } from "@/components/browser-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Gamepad2, 
  Trophy, 
  Star, 
  Play, 
  Pause, 
  RotateCcw,
  Target,
  Zap,
  Heart,
  Clock
} from "lucide-react"

interface Game {
  id: string
  title: string
  description: string
  icon: any
  difficulty: 'Easy' | 'Medium' | 'Hard'
  category: 'Puzzle' | 'Action' | 'Strategy' | 'Arcade'
  highScore?: number
  isNew?: boolean
}

const games: Game[] = [
  {
    id: "snake",
    title: "Snake Game",
    description: "Classic snake game with modern controls. Eat food and grow longer!",
    icon: Target,
    difficulty: "Easy",
    category: "Arcade",
    highScore: 0,
    isNew: true
  },
  {
    id: "tetris",
    title: "Tetris",
    description: "Drop blocks and clear lines in this classic puzzle game.",
    icon: Zap,
    difficulty: "Medium",
    category: "Puzzle",
    highScore: 0
  },
  {
    id: "memory",
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards.",
    icon: Heart,
    difficulty: "Easy",
    category: "Puzzle",
    highScore: 0
  },
  {
    id: "coming-soon",
    title: "More Games",
    description: "Additional games coming soon! Stay tuned for more fun.",
    icon: Gamepad2,
    difficulty: "Easy",
    category: "Arcade",
    isNew: true
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'Hard':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Puzzle':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'Action':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'Strategy':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'Arcade':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Snake Game Component
function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [highScore, setHighScore] = useState(0)

  const startGame = () => {
    setIsPlaying(true)
    setGameOver(false)
    setScore(0)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setGameOver(false)
    setScore(0)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-lg font-semibold">Score: {score}</div>
          <div className="text-sm text-muted-foreground">High Score: {highScore}</div>
        </div>
        <div className="flex gap-2">
          {!isPlaying && !gameOver && (
            <Button onClick={startGame} size="sm" className="gap-2">
              <Play className="h-4 w-4" />
              Start
            </Button>
          )}
          {isPlaying && (
            <Button onClick={() => setIsPlaying(false)} size="sm" variant="outline" className="gap-2">
              <Pause className="h-4 w-4" />
              Pause
            </Button>
          )}
          <Button onClick={resetGame} size="sm" variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
      
      <div className="border-2 border-border rounded-lg p-4 bg-muted/20">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full max-w-md mx-auto block border border-border rounded"
        />
        {gameOver && (
          <div className="text-center mt-4">
            <div className="text-xl font-bold text-red-500 mb-2">Game Over!</div>
            <div className="text-muted-foreground">Final Score: {score}</div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground text-center">
        Use arrow keys to control the snake. Eat the red food to grow and increase your score!
      </div>
    </div>
  )
}

// Memory Game Component
function MemoryGame() {
  const [cards, setCards] = useState<number[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedCards, setMatchedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const initializeGame = () => {
    const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
    const shuffled = numbers.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameWon(false)
  }

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return
    }

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newFlippedCards
      
      if (cards[first] === cards[second]) {
        setMatchedCards([...matchedCards, first, second])
        setFlippedCards([])
        
        if (matchedCards.length + 2 === cards.length) {
          setGameWon(true)
        }
      } else {
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  useEffect(() => {
    initializeGame()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Moves: {moves}</div>
        <Button onClick={initializeGame} size="sm" variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          New Game
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`aspect-square border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
              flippedCards.includes(index) || matchedCards.includes(index)
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-muted hover:bg-muted/80 border-border'
            }`}
          >
            {flippedCards.includes(index) || matchedCards.includes(index) ? (
              <span className="text-2xl font-bold">{card}</span>
            ) : (
              <span className="text-2xl">?</span>
            )}
          </div>
        ))}
      </div>
      
      {gameWon && (
        <div className="text-center">
          <div className="text-xl font-bold text-green-500 mb-2">🎉 Congratulations!</div>
          <div className="text-muted-foreground">You won in {moves} moves!</div>
        </div>
      )}
    </div>
  )
}

export default function ArcadePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const renderGame = (gameId: string) => {
    switch (gameId) {
      case 'snake':
        return <SnakeGame />
      case 'memory':
        return <MemoryGame />
      case 'coming-soon':
        return (
          <div className="text-center py-12">
            <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Coming Soon!</h3>
            <p className="text-muted-foreground">More exciting games are in development.</p>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Game Not Available</h3>
            <p className="text-muted-foreground">This game is currently under development.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <BrowserNavigation />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Game <span className="text-muted-foreground">Arcade</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Welcome to my personal arcade! Play classic games and test your skills. 
              Have fun and try to beat the high scores!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{games.length}</div>
              <div className="text-sm text-muted-foreground">Total Games</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{games.filter(g => g.highScore && g.highScore > 0).length}</div>
              <div className="text-sm text-muted-foreground">Games Played</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{games.filter(g => g.isNew).length}</div>
              <div className="text-sm text-muted-foreground">New Games</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Fun Level</div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Available Games</h2>
              <p className="text-lg text-muted-foreground">
                Choose a game to play and challenge yourself!
              </p>
            </div>

            {!selectedGame ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => {
                  const Icon = game.icon
                  return (
                    <Card key={game.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedGame(game.id)}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                                {game.title}
                              </CardTitle>
                              {game.isNew && (
                                <Badge className="mt-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  New
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Play className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {game.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                          <Badge className={getCategoryColor(game.category)}>
                            {game.category}
                          </Badge>
                        </div>
                        
                        {game.highScore && game.highScore > 0 && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-4 w-4" />
                            <span>High Score: {game.highScore}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={() => setSelectedGame(null)} 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                  >
                    ← Back to Games
                  </Button>
                  <h3 className="text-xl font-semibold">
                    {games.find(g => g.id === selectedGame)?.title}
                  </h3>
                </div>
                
                <Card>
                  <CardContent className="p-8">
                    {renderGame(selectedGame)}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 max-w-4xl mx-auto">
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">More Games Coming Soon!</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm constantly working on adding new games to the arcade. 
                Check back regularly for updates and new challenges!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Gamepad2 className="h-4 w-4" />
                Play Now
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Star className="h-4 w-4" />
                View High Scores
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
