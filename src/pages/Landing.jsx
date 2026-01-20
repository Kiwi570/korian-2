import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, Shield, Clock, Users, Star, MapPin, Phone, Mail, 
  ChevronDown, Sparkles, BarChart3, CheckCircle, Zap, Play, Trophy,
  Calendar, FileText, Rocket, MousePointer, Send, Award, ChevronLeft, ChevronRight as ChevronRightIcon,
  Plus, Monitor
} from 'lucide-react'
import { Button, Badge, AnimatedCounter } from '@/components/ui'
import { IMAGES, TESTIMONIALS } from '@/lib/images'
import { FEATURES, QUICK_STATS, CONTACT_INFO, CLIENT_LOGOS } from '@/lib/constants'
import { cn } from '@/lib/utils'

const HOW_IT_WORKS = [
  { step: 1, title: 'Connectez-vous', description: 'Accédez à votre espace personnel sécurisé en quelques secondes', icon: MousePointer, color: 'from-blue-500 to-cyan-500' },
  { step: 2, title: 'Saisissez vos heures', description: 'Remplissez votre timesheet avec notre calendrier interactif', icon: Clock, color: 'from-gold-500 to-amber-500' },
  { step: 3, title: 'Soumettez', description: 'Envoyez pour validation en un clic à votre manager', icon: Send, color: 'from-purple-500 to-pink-500' },
  { step: 4, title: 'Gagnez des XP !', description: 'Débloquez des badges et montez en niveau', icon: Award, color: 'from-emerald-500 to-teal-500' },
]

const FAQ_ITEMS = [
  { q: "Comment accéder au portail ?", a: "Connectez-vous avec vos identifiants LUX-AS. Si vous êtes nouveau consultant, contactez votre manager pour obtenir vos accès." },
  { q: "Puis-je modifier un timesheet déjà soumis ?", a: "Non, une fois soumis, le timesheet ne peut plus être modifié. Contactez votre manager pour toute correction." },
  { q: "Comment fonctionne le système de gamification ?", a: "Chaque action (timesheet rempli, soumis à temps, connexion quotidienne) vous rapporte des XP. Accumulez des XP pour monter de niveau et débloquer des badges !" },
  { q: "Le portail est-il accessible sur mobile ?", a: "Oui ! Le portail est entièrement responsive et fonctionne parfaitement sur smartphone et tablette." },
  { q: "Comment demander un congé ?", a: "Rendez-vous dans la section 'Congés', cliquez sur 'Nouvelle demande' et remplissez le formulaire. Votre manager sera notifié automatiquement." },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length)
  const prevTestimonial = () => setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden">
      {/* HEADER */}
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled && 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-lg'
      )}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h1 className="text-white font-display font-bold text-xl tracking-tight">LUX-AS</h1>
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Consulting</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Fonctionnalités</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Comment ça marche</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">Témoignages</a>
              <a href="#faq" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">FAQ</a>
              <Link to="/login">
                <Button size="md" className="shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50">
                  Connexion <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </nav>

            <Link to="/login" className="md:hidden">
              <Button size="sm">Connexion</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-100" 
            style={{ 
              backgroundImage: `url('${IMAGES.hero}')`,
              transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)`
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30" />
        </div>

        {/* Animated blobs */}
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold-500/20 rounded-full blur-[150px] animate-blob"
          style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000"
          style={{ transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` }}
        />

        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8 animate-fade-in hover:bg-white/20 transition-colors cursor-default">
                <Sparkles className="w-4 h-4 text-gold-400 animate-sparkle" />
                <span className="text-sm text-white font-medium">Nouveau • Portail V6.0 Ultimate</span>
                <Badge variant="solid-success" size="sm">DISPONIBLE</Badge>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[0.95]">
                <span className="inline-block animate-slide-up">Votre espace</span><br />
                <span className="text-gradient-animated inline-block animate-slide-up animation-delay-100">consultant</span><br />
                <span className="text-slate-400 text-3xl md:text-4xl lg:text-5xl inline-block animate-slide-up animation-delay-200">réinventé.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed animate-fade-in-up animation-delay-300">
                Gérez vos feuilles de temps, congés et documents avec style. 
                Conçu pour les consultants IT au{' '}
                <span className="text-gold-400 font-semibold">Luxembourg</span> 🇱🇺
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up animation-delay-400">
                <Link to="/login">
                  <Button size="xl" className="group text-lg shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50">
                    Accéder au portail <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="outline-white" size="xl" className="text-lg group">
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" /> Découvrir
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 animate-fade-in-up animation-delay-500">
                <StatItem value={QUICK_STATS.consultants} suffix="+" label="Consultants" />
                <StatItem value={QUICK_STATS.satisfaction} suffix="%" label="Satisfaction" />
                <StatItem value={QUICK_STATS.majorClients} label="Clients" />
              </div>
            </div>

            {/* Right - Mockup */}
            <div className="hidden lg:block relative animate-fade-in animation-delay-300">
              <div 
                className="relative"
                style={{ transform: `translate(${-mousePos.x * 2}px, ${-mousePos.y * 2}px)` }}
              >
                {/* Phone mockup */}
                <div className="absolute -left-8 bottom-0 w-48 bg-slate-800 rounded-[2rem] p-2 shadow-2xl shadow-black/50 border border-slate-700 animate-float z-10">
                  <div className="bg-slate-900 rounded-[1.5rem] p-4 h-80 overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                      </div>
                      <span className="text-white text-sm font-semibold">LUX-AS</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gold-500/20 rounded-xl p-3">
                        <p className="text-gold-400 text-xs font-semibold">Niveau 3</p>
                        <p className="text-white text-lg font-bold">850 XP</p>
                        <div className="h-2 bg-slate-700 rounded-full mt-2">
                          <div className="h-full w-3/5 bg-gradient-to-r from-gold-400 to-amber-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="bg-slate-800 rounded-xl p-3">
                        <p className="text-slate-400 text-xs">Ce mois</p>
                        <p className="text-white font-bold">142h</p>
                      </div>
                      <div className="bg-slate-800 rounded-xl p-3">
                        <p className="text-slate-400 text-xs">Streak</p>
                        <p className="text-orange-400 font-bold">🔥 5 jours</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop mockup */}
                <div className="bg-slate-800 rounded-2xl p-3 shadow-2xl shadow-black/50 border border-slate-700 ml-20">
                  <div className="bg-slate-900 rounded-xl overflow-hidden">
                    {/* Browser bar */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      </div>
                      <div className="flex-1 mx-4 px-3 py-1 bg-slate-700 rounded-lg text-xs text-slate-400">
                        portal.lux-as.com
                      </div>
                    </div>
                    {/* App content */}
                    <div className="p-4 h-64">
                      <div className="flex gap-4 h-full">
                        {/* Sidebar mini */}
                        <div className="w-16 bg-slate-800 rounded-xl p-2 space-y-2">
                          <div className="w-10 h-10 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl"></div>
                          <div className="w-8 h-8 mx-auto bg-slate-700 rounded-lg"></div>
                          <div className="w-8 h-8 mx-auto bg-gold-500/20 rounded-lg border border-gold-500/30"></div>
                          <div className="w-8 h-8 mx-auto bg-slate-700 rounded-lg"></div>
                        </div>
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="h-16 bg-gradient-to-r from-gold-500/20 to-amber-500/10 rounded-xl p-3">
                            <div className="w-24 h-3 bg-gold-500/40 rounded"></div>
                            <div className="w-32 h-4 bg-white/20 rounded mt-2"></div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-16 bg-slate-800 rounded-xl p-2">
                              <div className="w-8 h-2 bg-slate-600 rounded"></div>
                              <div className="w-12 h-4 bg-emerald-500/40 rounded mt-2"></div>
                            </div>
                            <div className="h-16 bg-slate-800 rounded-xl p-2">
                              <div className="w-8 h-2 bg-slate-600 rounded"></div>
                              <div className="w-12 h-4 bg-blue-500/40 rounded mt-2"></div>
                            </div>
                            <div className="h-16 bg-slate-800 rounded-xl p-2">
                              <div className="w-8 h-2 bg-slate-600 rounded"></div>
                              <div className="w-12 h-4 bg-purple-500/40 rounded mt-2"></div>
                            </div>
                          </div>
                          <div className="h-20 bg-slate-800 rounded-xl"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -right-4 top-1/4 bg-emerald-500 text-white px-3 py-2 rounded-xl shadow-lg shadow-emerald-500/30 animate-bounce-gentle text-sm font-semibold">
                  ✓ Approuvé !
                </div>
                <div className="absolute right-1/4 -top-4 bg-gold-500 text-white px-3 py-2 rounded-xl shadow-lg shadow-gold-500/30 animate-float animation-delay-1000 text-sm font-semibold">
                  🏆 +50 XP
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-slate-500 text-sm">Découvrir</span>
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* CLIENTS BANNER */}
      <section className="py-12 bg-slate-800/50 border-y border-slate-700/50">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-500 text-sm mb-8">Ils nous font confiance</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {CLIENT_LOGOS.map((client) => (
              <div 
                key={client.id} 
                className="text-2xl font-bold opacity-40 hover:opacity-100 transition-opacity cursor-default"
                style={{ color: client.color }}
              >
                {client.initials}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-slate-900 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 scroll-reveal">
            <Badge variant="gold" size="lg" className="mb-6"><Rocket className="w-4 h-4 mr-2" />Simple & Rapide</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              En 4 étapes simples, gérez votre activité comme un pro
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item, index) => (
              <div 
                key={item.step}
                className="scroll-reveal group relative bg-slate-800/50 backdrop-blur rounded-3xl p-6 border border-slate-700/50 hover:border-gold-500/50 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-700">
                    <ChevronRightIcon className="absolute -right-2 -top-2 w-4 h-4 text-slate-600" />
                  </div>
                )}
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br shadow-lg',
                  item.color
                )}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-gold-400 text-sm font-bold mb-2">Étape {item.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 scroll-reveal">
            <Badge variant="gold" size="lg" className="mb-6"><Zap className="w-4 h-4 mr-2" />Fonctionnalités</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Un portail complet et moderne pour simplifier votre quotidien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: CheckCircle, text: 'Conformité Luxembourg', color: 'text-emerald-400' },
              { icon: Shield, text: 'Sécurité renforcée', color: 'text-blue-400' },
              { icon: Monitor, text: 'Desktop & Mobile', color: 'text-purple-400' },
              { icon: Users, text: 'Support dédié', color: 'text-gold-400' },
            ].map((item, i) => (
              <div key={i} className="scroll-reveal flex items-center gap-3 px-5 py-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-gold-500/30 hover:bg-slate-800 transition-all duration-300">
                <item.icon className={cn('w-5 h-5', item.color)} />
                <span className="text-slate-300 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[150px]" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-12 scroll-reveal">
            <Badge variant="gold" size="lg" className="mb-6"><Star className="w-4 h-4 mr-2" />Témoignages</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ce qu'ils en pensent
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Testimonial card */}
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50">
                <div className="flex justify-center mb-6">
                  {Array.from({ length: TESTIMONIALS[currentTestimonial].rating }).map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-gold-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-white text-center mb-8 leading-relaxed font-medium">
                  "{TESTIMONIALS[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <img 
                    src={TESTIMONIALS[currentTestimonial].avatar} 
                    alt={TESTIMONIALS[currentTestimonial].name} 
                    className="w-14 h-14 rounded-full ring-2 ring-gold-500/50" 
                  />
                  <div className="text-left">
                    <p className="font-semibold text-white">{TESTIMONIALS[currentTestimonial].name}</p>
                    <p className="text-slate-400">{TESTIMONIALS[currentTestimonial].title} • {TESTIMONIALS[currentTestimonial].company}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button 
                  onClick={prevTestimonial}
                  className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all',
                        i === currentTestimonial ? 'w-8 bg-gold-500' : 'bg-slate-600 hover:bg-slate-500'
                      )}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextTestimonial}
                  className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-white transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <Badge variant="gold" size="lg" className="mb-6">❓ FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Questions fréquentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div 
                key={i}
                className="scroll-reveal bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-white pr-4">{item.q}</span>
                  <div className={cn(
                    'w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0 transition-transform',
                    openFaq === i && 'rotate-45'
                  )}>
                    <Plus className="w-4 h-4 text-gold-400" />
                  </div>
                </button>
                <div className={cn(
                  'overflow-hidden transition-all duration-300',
                  openFaq === i ? 'max-h-40 pb-6' : 'max-h-0'
                )}>
                  <p className="px-6 text-slate-400">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/10 rounded-full blur-[200px] animate-pulse-glow" />
        <div className="container mx-auto px-6 text-center relative scroll-reveal">
          <Badge variant="gold" size="lg" className="mb-6"><Sparkles className="w-4 h-4 mr-2" />Commencez maintenant</Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Prêt à simplifier<br />votre quotidien ?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">
            Rejoignez les {QUICK_STATS.consultants}+ consultants qui utilisent déjà le portail LUX-AS
          </p>
          <Link to="/login">
            <Button size="xl" className="text-xl shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50">
              Accéder au portail <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">LUX-AS</h3>
                  <p className="text-slate-500 text-xs">Consulting</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Votre partenaire IT de confiance au Luxembourg depuis 2018.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5">Portail</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/login" className="text-slate-400 hover:text-gold-400 transition-colors">Connexion</Link></li>
                <li><a href="#features" className="text-slate-400 hover:text-gold-400 transition-colors">Fonctionnalités</a></li>
                <li><a href="#faq" className="text-slate-400 hover:text-gold-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5">Entreprise</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-gold-400 transition-colors">À propos</a></li>
                <li><a href="#" className="text-slate-400 hover:text-gold-400 transition-colors">Carrières</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span>{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-gold-400 transition-colors">{CONTACT_INFO.phone}</a>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-gold-400 transition-colors">{CONTACT_INFO.email}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2025 LUX-AS Consulting. Tous droits réservés.</p>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              Fait avec <span className="text-rose-500 animate-heartbeat">❤️</span> au Luxembourg 🇱🇺
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatItem({ value, suffix = '', label }) {
  return (
    <div className="text-center md:text-left group cursor-default">
      <p className="text-3xl md:text-4xl font-bold text-white group-hover:scale-105 transition-transform">
        <AnimatedCounter value={value} /><span className="text-gold-400">{suffix}</span>
      </p>
      <p className="text-slate-400 text-sm mt-1">{label}</p>
    </div>
  )
}

function FeatureCard({ feature, index }) {
  const iconMap = { Clock, Shield, BarChart3, Users, Trophy, Calendar, FileText }
  const Icon = iconMap[feature.icon] || Clock
  
  return (
    <div 
      className="scroll-reveal group relative bg-slate-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 hover:border-gold-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-3"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="h-48 overflow-hidden relative bg-gradient-to-br from-slate-700 to-slate-800">
        <img 
          src={IMAGES[feature.image] || IMAGES.hero} 
          alt={feature.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        {feature.badge && (
          <Badge variant="solid-gold" size="sm" className="absolute top-4 right-4">
            {feature.badge}
          </Badge>
        )}
      </div>
      <div className="p-6">
        <div className="w-12 h-12 bg-gradient-to-br from-gold-500/20 to-amber-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-gold-500/20">
          <Icon className="w-6 h-6 text-gold-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  )
}
