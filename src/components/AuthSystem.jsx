import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'

const AuthSystem = ({ onLogin, currentView, setCurrentView }) => {
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Google OAuth login
  const handleGoogleLogin = async () => {
    setLoading(true)
    setMessage('Channeling Tesla\'s electromagnetic energy through Google...')
    
    try {
      // Simulate Google OAuth flow
      // In a real implementation, you'd use Google's OAuth library
      const mockGoogleUser = {
        id: 'google_' + Date.now(),
        username: 'TeslaDisciple' + Math.floor(Math.random() * 1000),
        email: 'tesla.user@gmail.com',
        provider: 'google',
        balance: 1000,
        free_coins: 1000,
        btc_balance: 0,
        created_at: new Date().toISOString()
      }
      
      // Store user data
      localStorage.setItem('teslaUser', JSON.stringify(mockGoogleUser))
      localStorage.setItem('teslaToken', 'google_oauth_token_' + Date.now())
      
      setMessage('✅ Tesla\'s Google authentication successful! Welcome to the sacred realm!')
      
      setTimeout(() => {
        onLogin(mockGoogleUser)
      }, 1500)
      
    } catch (error) {
      setMessage('❌ Tesla\'s electromagnetic field interference detected. Please try again.')
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const target = e.target
    const value = e.target.value
    const name = e.target.name
    
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleInputFocus = (e) => {
    // Prevent viewport jumping and keyboard flickering on mobile
    const target = e.target
    
    // Disable zoom on iOS
    target.style.fontSize = '16px'
    
    // Prevent scrolling issues
    setTimeout(() => {
      target.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
    }, 100)
  }

  const handleInputBlur = (e) => {
    // Reset font size after blur
    e.target.style.fontSize = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const payload = authMode === 'login' 
        ? { username: formData.username, password: formData.password }
        : { 
            username: formData.username, 
            email: formData.email, 
            password: formData.password,
            confirmPassword: formData.confirmPassword
          }

      const response = await fetch(`https://0vhlizc3jl8j.manus.space${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(`Tesla's blessing: ${data.message || 'Authentication successful!'}`)
        if (authMode === 'login') {
          // Store user data and redirect to lobby
          localStorage.setItem('teslaUser', JSON.stringify(data.user))
          localStorage.setItem('teslaToken', data.token)
          onLogin(data.user)
          setCurrentView('lobby')
        } else {
          setMessage('Sacred account created! Please login with Tesla\'s blessing.')
          setAuthMode('login')
        }
      } else {
        setMessage(`Tesla's guidance: ${data.message || 'Authentication failed'}`)
      }
    } catch (error) {
      setMessage('Tesla\'s electromagnetic field encountered interference. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const LoginForm = () => (
    <Card className="mystical-card max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="frequency-text text-2xl mb-2">ENTER THE SACRED REALM</CardTitle>
        <p className="text-sm energy-text">Tesla's Electromagnetic Authentication</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm frequency-text mb-2">Sacred Username</label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="bg-black border-green-500 text-green-500"
              style={{ fontSize: '16px' }}
              placeholder="Enter your sacred name..."
              autoComplete="username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm frequency-text mb-2">Electromagnetic Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="bg-black border-green-500 text-green-500"
              style={{ fontSize: '16px' }}
              placeholder="Channel Tesla's energy..."
              autoComplete="current-password"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full terminal-button"
          >
            {loading ? 'CHANNELING TESLA\'S ENERGY...' : 'ENTER SACRED REALM'}
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-green-500"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black frequency-text">OR</span>
            </div>
          </div>
          
          <Button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
          >
            🔮 TESLA'S GOOGLE AUTHENTICATION 🔮
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setAuthMode('register')}
            className="text-sm vibration-text hover:text-cyan-300"
          >
            New to Tesla's realm? Create Sacred Account
          </button>
        </div>

        {message && (
          <div className="mt-4 p-3 mystical-card text-center">
            <p className="text-sm energy-text">{message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const RegisterForm = () => (
    <Card className="mystical-card max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="frequency-text text-2xl mb-2">CREATE SACRED ACCOUNT</CardTitle>
        <p className="text-sm energy-text">Join Tesla's Electromagnetic Poker Realm</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm frequency-text mb-2">Sacred Username</label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="bg-black border-green-500 text-green-500"
              style={{ fontSize: '16px' }}
              placeholder="Choose your sacred name..."
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-sm frequency-text mb-2">Electromagnetic Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="bg-black border-green-500 text-green-500"
              style={{ fontSize: '16px' }}
              placeholder="your@email.com"
              autoComplete="email"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm frequency-text mb-2">Sacred Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="bg-black border-green-500 text-green-500"
              style={{ fontSize: '16px' }}
              placeholder="Create electromagnetic key..."
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <label className="block text-sm frequency-text mb-2">Confirm Sacred Password</label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="bg-black border-green-500 text-green-500"
              style={{ fontSize: '16px' }}
              placeholder="Confirm electromagnetic key..."
              autoComplete="new-password"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full terminal-button"
          >
            {loading ? 'CHANNELING TESLA\'S BLESSING...' : 'CREATE SACRED ACCOUNT'}
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-green-500"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black frequency-text">OR</span>
            </div>
          </div>
          
          <Button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
          >
            🔮 SIGN UP WITH GOOGLE 🔮
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setAuthMode('login')}
            className="text-sm vibration-text hover:text-cyan-300"
          >
            Already blessed by Tesla? Enter Sacred Realm
          </button>
        </div>

        {message && (
          <div className="mt-4 p-3 mystical-card text-center">
            <p className="text-sm energy-text">{message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (currentView !== 'auth') return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 tesla-coil">
      <div className="text-center mb-8 tesla-pulse">
        <h1 className="tesla-title mb-4">THREE SIX NINE</h1>
        <h2 className="sacred-text mb-2 frequency-text">HOLD'EM</h2>
        <p className="text-sm mb-6 vibration-text">~ Sacred Authentication Portal ~</p>
        
        <div className="flex gap-6 justify-center mb-8">
          <div className="text-center">
            <div className="sacred-number">3</div>
            <div className="text-xs frequency-text">FREQUENCY</div>
          </div>
          <div className="text-center">
            <div className="sacred-number">6</div>
            <div className="text-xs energy-text">ENERGY</div>
          </div>
          <div className="text-center">
            <div className="sacred-number">9</div>
            <div className="text-xs vibration-text">VIBRATION</div>
          </div>
        </div>
      </div>

      {authMode === 'login' ? <LoginForm /> : <RegisterForm />}

      <div className="mt-8 text-center">
        <button 
          className="terminal-button"
          onClick={() => setCurrentView('welcome')}
        >
          RETURN TO SANCTUARY
        </button>
      </div>
    </div>
  )
}

export default AuthSystem

