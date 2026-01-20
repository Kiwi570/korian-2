import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react'
import { Button, Input, Badge } from '@/components/ui'
import { useApp } from '@/context/AppContext'
import { IMAGES } from '@/lib/images'
import { ROLES } from '@/lib/constants'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useApp()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const result = await login(email, password)
    
    setLoading(false)
    
    if (result.success) {
      navigate(result.role === ROLES.MANAGER ? '/manager' : '/consultant')
    } else {
      setError(result.error)
    }
  }

  const fillDemo = (type) => {
    if (type === 'consultant') {
      setEmail('paul@lux-as.com')
      setPassword('demo123')
    } else {
      setEmail('korian@lux-as.com')
      setPassword('demo123')
    }
  }

  const quickLogin = async (type) => {
    setLoading(true)
    const email = type === 'consultant' ? 'paul@lux-as.com' : 'korian@lux-as.com'
    const result = await login(email, 'demo123')
    setLoading(false)
    if (result.success) {
      navigate(result.role === ROLES.MANAGER ? '/manager' : '/consultant')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.loginBg}')` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-900/70" />
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl">LUX-AS</h1>
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Portal</p>
              </div>
            </Link>
          </div>
          
          <div className="max-w-md">
            <Badge variant="solid-gold" size="lg" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" /> V6.0 Ultimate
            </Badge>
            <h2 className="text-4xl font-display font-bold mb-4 leading-tight">
              Bienvenue sur votre
              <span className="text-gradient"> espace personnel</span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Gérez vos timesheets, congés et documents en toute simplicité. 
              Conçu pour les consultants IT au Luxembourg.
            </p>
          </div>
          
          <p className="text-sm text-slate-500">© 2025 LUX-AS Consulting</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-dark-950">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/30">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-slate-900 dark:text-white">LUX-AS</h1>
                <p className="text-gold-500 text-xs font-semibold uppercase tracking-wider">Portal</p>
              </div>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Connexion</h2>
            <p className="text-slate-500 dark:text-slate-400">Entrez vos identifiants pour accéder au portail</p>
          </div>

          {/* Demo buttons - Accès direct */}
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => quickLogin('consultant')}
              className="flex-1 p-4 rounded-2xl border-2 border-slate-200 dark:border-dark-700 hover:border-gold-400 dark:hover:border-gold-500 hover:bg-gold-50 dark:hover:bg-gold-500/10 transition-all text-center group hover:scale-[1.02]"
            >
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400">👤 Consultant</p>
              <p className="text-xs text-slate-500 mt-0.5">Entrer en tant que Paul</p>
            </button>
            <button
              type="button"
              onClick={() => quickLogin('manager')}
              className="flex-1 p-4 rounded-2xl border-2 border-slate-200 dark:border-dark-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all text-center group hover:scale-[1.02]"
            >
              <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">👔 Manager</p>
              <p className="text-xs text-slate-500 mt-0.5">Entrer en tant que Korian</p>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-dark-700"></div>
            </div>
            <span className="relative px-4 bg-white dark:bg-dark-950 text-sm text-slate-500">ou connectez-vous</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 text-sm animate-shake">
                {error}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-gold-500 focus:ring-gold-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-gold-600 hover:text-gold-700 dark:text-gold-400 font-medium">
                Mot de passe oublié ?
              </a>
            </div>

            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Se connecter <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Cliquez sur <span className="font-semibold text-gold-600">Consultant</span> ou <span className="font-semibold text-indigo-600">Manager</span> pour accéder directement
          </p>
        </div>
      </div>
    </div>
  )
}
