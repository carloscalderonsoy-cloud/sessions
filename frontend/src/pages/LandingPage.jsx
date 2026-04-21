import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Mic2,
  Globe,
  TrendingUp,
  User,
  Check,
  Play,
  ChevronDown,
  Instagram,
  Youtube,
  Music2,
  Camera,
  Building2,
  Award,
  ArrowRight,
  Menu,
  X,
  Headphones,
  Radio,
  Video,
  Palette } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
"@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Assets
const ASSETS = {
  logo: "https://customer-assets.emergentagent.com/job_9ec3d761-60a1-469a-a289-abec3b51c562/artifacts/pbbzc7h7_Captura%20de%20pantalla%202026-02-17%20095203.png",
  heroVideo: "https://customer-assets.emergentagent.com/job_sonic-venture/artifacts/5nrra2hm_Carla%20Apqn%203.mp4",
  artists: {
    costel: "https://customer-assets.emergentagent.com/job_sonic-venture/artifacts/as6i9xqn_image.png",
    tenampa: "https://customer-assets.emergentagent.com/job_sonic-venture/artifacts/i37ogkiv_image.png"
  }
};

// Social Links
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/lumoentretenimiento/",
  facebook: "https://www.facebook.com/LumoEntretenimiento",
  tiktok: "https://www.tiktok.com/@lumoentretenimiento",
  youtube: "https://www.youtube.com/@LumoEntretenimiento"
};

// Services Data
const SERVICES = [
{
  icon: Mic2,
  title: "Producción Musical",
  description: "Grabación profesional en estudio, mezcla y masterización con estándares de industria internacional.",
  features: ["Grabación en estudio", "Videos musicales", "Sesiones en vivo"]
},
{
  icon: Globe,
  title: "Distribución Digital",
  description: "Lleva tu música a todas las plataformas: Spotify, Apple Music, YouTube, Amazon Music, Deezer y Tidal.",
  features: ["Spotify", "Apple Music", "YouTube Music"]
},
{
  icon: TrendingUp,
  title: "Marketing Musical",
  description: "Estrategias de lanzamiento, campañas en redes sociales y playlist pitching para maximizar tu alcance.",
  features: ["Campañas digitales", "Redes sociales", "Playlist pitching"]
},
{
  icon: User,
  title: "Desarrollo Artístico",
  description: "Branding de artista, media training, estrategia de lanzamiento, management y booking profesional.",
  features: ["Branding", "Media training", "Management"]
}];


// Pricing Packages
const PACKAGES = [
{
  name: "Artistas Emergentes",
  price: "$22,000",
  currency: "MXN",
  description: "Ideal para comenzar tu carrera profesional",
  features: [
  "Producción de 1 single completo",
  "Distribución digital básica",
  "Asesoría de imagen",
  "Sesión de fotos básica",
  "Estrategia de lanzamiento"],

  featured: false
},
{
  name: "Artistas Establecidos",
  price: "$35,000",
  currency: "MXN",
  description: "Para artistas que buscan el siguiente nivel",
  features: [
  "Producción de 2 singles",
  "Plan de marketing 60 días",
  "Sesión de fotos profesional",
  "Video musical básico",
  "Distribución premium",
  "Playlist pitching"],

  featured: true
},
{
  name: "Desarrollo Completo",
  price: "$55,000",
  currency: "MXN",
  description: "Paquete integral 360° para tu carrera",
  features: [
  "Producción de EP completo",
  "Management artístico",
  "Tour de medios",
  "Estrategia global",
  "Video musical premium",
  "Branding completo"],

  featured: false
}];


// Artists
const ARTISTS = [
{ name: "Costel", image: ASSETS.artists.costel, genre: "Regional Mexicano" },
{ name: "Tenampa Brass Band", image: ASSETS.artists.tenampa, genre: "Brass Band" },
{ name: "Ocean 5", image: null, genre: "Pop" },
{ name: "Guzmán León", image: null, genre: "Regional" },
{ name: "Luckas O", image: null, genre: "Urbano" },
{ name: "Cedric", image: null, genre: "Pop Latino" },
{ name: "Lobo Mexicano", image: null, genre: "Rock" },
{ name: "Daniela Fridman", image: null, genre: "Pop" }];


// Navigation Component
const Navigation = ({ scrolled, onApplyClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`nav-fixed py-4 px-6 ${scrolled ? 'nav-scrolled' : ''}`} data-testid="main-navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#hero" className="flex items-center">
          <img src={ASSETS.logo} alt="Lumo Entretenimiento" className="h-10 md:h-12" data-testid="logo" />
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider" data-testid="nav-servicios">Servicios</a>
          <a href="#infraestructura" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider" data-testid="nav-infraestructura">Infraestructura</a>
          <a href="#paquetes" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider" data-testid="nav-paquetes">Paquetes</a>
          <a href="#artistas" className="text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider" data-testid="nav-artistas">Artistas</a>
          <Button
            onClick={onApplyClick}
            className="btn-primary text-sm"
            data-testid="nav-apply-btn">

            Aplica Ahora
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="mobile-menu-btn">

          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen &&
      <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0A] border-t border-[#333333] py-6 px-6" data-testid="mobile-menu">
          <div className="flex flex-col gap-4">
            <a href="#servicios" className="text-gray-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Servicios</a>
            <a href="#infraestructura" className="text-gray-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Infraestructura</a>
            <a href="#paquetes" className="text-gray-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Paquetes</a>
            <a href="#artistas" className="text-gray-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Artistas</a>
            <Button
            onClick={() => {onApplyClick();setMobileMenuOpen(false);}}
            className="btn-primary mt-2"
            data-testid="mobile-apply-btn">

              Aplica Ahora
            </Button>
          </div>
        </div>
      }
    </nav>);

};

// Hero Section
const HeroSection = ({ onApplyClick }) => {
  return (
    <section id="hero" className="hero-section" data-testid="hero-section">
      <div className="hero-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          src={ASSETS.heroVideo}
          className="hero-video"
          data-testid="hero-video"
        />
      </div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 animate-fade-in-up tracking-tight" data-testid="hero-title">
          Convierte tu música en una <span className="text-[#CCFF00]">carrera profesional</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-4 animate-fade-in-up delay-100 max-w-3xl mx-auto" data-testid="hero-subtitle">
          Producción, distribución y desarrollo artístico completo desde Guadalajara.
        </p>
        <p className="text-base md:text-lg text-[#CCFF00] mb-10 animate-fade-in-up delay-200 font-medium" data-testid="hero-tagline">
          Tu música merece calidad de industria. Tu proyecto, una estrategia real.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Button
            onClick={onApplyClick}
            className="btn-primary text-lg"
            data-testid="hero-cta-primary">
            Aplica Ahora
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button
            variant="outline"
            className="btn-secondary text-lg"
            onClick={() => document.getElementById('artistas').scrollIntoView({ behavior: 'smooth' })}
            data-testid="hero-cta-secondary">
            Ver Casos de Éxito
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 animate-fade-in-up delay-400">
          <div className="stat-item">
            <div className="stat-number">+200</div>
            <div className="stat-label">Conciertos en Vivo</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">+50</div>
            <div className="stat-label">Artistas Producidos</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">+1M</div>
            <div className="stat-label">Streams Digitales</div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-[#CCFF00]" size={32} />
        </div>
      </div>
    </section>);

};

// About Section
const AboutSection = () => {
  return (
    <section id="nosotros" className="py-24 md:py-32 px-6 bg-[#0A0A0A]" data-testid="about-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#CCFF00] text-sm uppercase tracking-widest mb-4 block">Quiénes Somos</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-testid="about-title">
              Más que un estudio.<br />
              Más que una agencia.<br />
              <span className="text-[#CCFF00]">Somos tu equipo completo.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8" data-testid="about-description">
              En Lumo Entretenimiento, ayudamos a artistas emergentes y establecidos a grabar, lanzar y posicionar su música con calidad profesional y estrategia real de industria.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#CCFF00]/10 flex items-center justify-center">
                  <Headphones className="text-[#CCFF00]" size={24} />
                </div>
                <span className="text-white font-medium">Producción Premium</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#CCFF00]/10 flex items-center justify-center">
                  <Radio className="text-[#CCFF00]" size={24} />
                </div>
                <span className="text-white font-medium">Distribución Global</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#333333]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#CCFF00]/20 flex items-center justify-center">
                    <Play className="text-[#CCFF00]" size={40} />
                  </div>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">Guadalajara, México</p>
                  <p className="text-white text-lg font-medium mt-2">Sede de Lumo Entretenimiento</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-[#CCFF00]/30 rounded-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-[#333333] rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>);

};

// Services Section
const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 md:py-32 px-6 bg-[#121212]" data-testid="services-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#CCFF00] text-sm uppercase tracking-widest mb-4 block">Nuestros Servicios</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-testid="services-title">
            Todo lo que necesitas para lanzar tu música,<br />
            <span className="text-[#CCFF00]">en un solo lugar.</span>
          </h2>
        </div>
        
        <div className="services-grid">
          {SERVICES.map((service, index) =>
          <div
            key={index}
            className="bg-[#1A1A1A] border border-[#333333] p-8 rounded-xl card-hover group"
            data-testid={`service-card-${index}`}>

              <div className="w-16 h-16 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center mb-6 group-hover:bg-[#CCFF00]/20 transition-colors">
                <service.icon className="text-[#CCFF00]" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) =>
              <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="text-[#CCFF00]" size={16} />
                    {feature}
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>);

};

// Infrastructure Section
const InfrastructureSection = () => {
  return (
    <section id="infraestructura" className="py-24 md:py-32 px-6 bg-[#0A0A0A]" data-testid="infrastructure-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1A1A] border border-[#333333] p-6 rounded-xl">
                <Camera className="text-[#CCFF00] mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Cámaras PROFESIONALES</h4>
                <p className="text-gray-400 text-sm">Calidad cinematográfica 4K para tus videos</p>
              </div>
              <div className="bg-[#1A1A1A] border border-[#333333] p-6 rounded-xl">
                <Headphones className="text-[#CCFF00] mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Audio Profesional</h4>
                <p className="text-gray-400 text-sm">Equipamiento de gama alta para grabación</p>
              </div>
              <div className="bg-[#1A1A1A] border border-[#333333] p-6 rounded-xl">
                <Building2 className="text-[#CCFF00] mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Acústica Calibrada</h4>
                <p className="text-gray-400 text-sm">Estudios tratados profesionalmente</p>
              </div>
              <div className="bg-[#1A1A1A] border border-[#333333] p-6 rounded-xl">
                <Video className="text-[#CCFF00] mb-4" size={32} />
                <h4 className="text-white font-bold mb-2">Producción Broadcast</h4>
                <p className="text-gray-400 text-sm">Nivel TV y streaming profesional</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="text-[#CCFF00] text-sm uppercase tracking-widest mb-4 block">Infraestructura</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-testid="infrastructure-title">
              Calidad Profesional<br />
              <span className="text-[#CCFF00]">Nivel Industria</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Infraestructura propia con calidad broadcast y cine. Acceso a las mejores instalaciones de producción en Guadalajara.
            </p>
            
            <div className="bg-[#1A1A1A] border-2 border-[#CCFF00]/50 p-6 rounded-xl neon-glow">
              <div className="flex items-center gap-4 mb-4">
                <Award className="text-[#CCFF00]" size={32} />
                <div>
                  <h4 className="text-white font-bold">Alianza Destacada</h4>
                  <p className="text-[#CCFF00] font-medium">Buffalo Azul Studios</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="text-[#CCFF00]" size={16} />
                  +200 conciertos en vivo
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-[#CCFF00]" size={16} />
                  Producción de nivel internacional
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-[#CCFF00]" size={16} />
                  Acceso preferencial para artistas Lumo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

// Pricing Section
const PricingSection = ({ onApplyClick }) => {
  return (
    <section id="paquetes" className="py-24 md:py-32 px-6 bg-[#121212]" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#CCFF00] text-sm uppercase tracking-widest mb-4 block">Paquetes</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-testid="pricing-title">
            Paquetes diseñados<br />
            <span className="text-[#CCFF00]">para cada etapa de tu carrera</span>
          </h2>
        </div>
        
        <div className="pricing-grid">
          {PACKAGES.map((pkg, index) =>
          <div
            key={index}
            className={`p-8 rounded-xl flex flex-col h-full transition-all duration-300 ${
            pkg.featured ?
            'bg-[#1A1A1A] border-2 border-[#CCFF00] neon-glow relative' :
            'bg-[#1A1A1A] border border-[#333333] hover:border-[#CCFF00]/50'}`
            }
            data-testid={`pricing-card-${index}`}>

              {pkg.featured &&
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#CCFF00] text-black text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Más Popular
                </div>
            }
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">{pkg.description}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-[#CCFF00]">{pkg.price}</span>
                <span className="text-gray-400 text-sm ml-2">{pkg.currency}</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feature, idx) =>
              <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <Check className="text-[#CCFF00] flex-shrink-0 mt-1" size={16} />
                    <span>{feature}</span>
                  </li>
              )}
              </ul>
              
              <Button
              onClick={onApplyClick}
              className={pkg.featured ? 'btn-primary w-full' : 'btn-secondary w-full'}
              data-testid={`pricing-cta-${index}`}>

                Solicitar Paquete
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>);

};

// Savings Comparison Section
const SavingsSection = () => {
  return (
    <section id="ahorro" className="py-24 md:py-32 px-6 bg-[#0A0A0A]" data-testid="savings-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#CCFF00] text-sm uppercase tracking-widest mb-4 block">Ahorra con Lumo</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-testid="savings-title">
            Ahorra hasta <span className="text-[#CCFF00]">50%</span> comparado<br />
            con el modelo tradicional
          </h2>
        </div>
        
        <div className="comparison-table rounded-xl overflow-hidden">
          <div className="comparison-row bg-[#1A1A1A]">
            <div className="comparison-cell text-gray-400 font-medium text-left">Servicio</div>
            <div className="comparison-cell text-gray-400 font-medium">Tradicional</div>
            <div className="comparison-cell text-[#CCFF00] font-medium">Con Lumo</div>
          </div>
          
          {[
          { service: "Grabación de Single", traditional: "$8,000", lumo: "Incluido" },
          { service: "Mezcla y Master", traditional: "$6,000", lumo: "Incluido" },
          { service: "Distribución", traditional: "$3,000", lumo: "Incluido" },
          { service: "Video Musical", traditional: "$15,000", lumo: "Incluido" },
          { service: "Marketing Digital", traditional: "$10,000", lumo: "Incluido" },
          { service: "Sesión de Fotos", traditional: "$5,000", lumo: "Incluido" }].
          map((item, index) =>
          <div key={index} className="comparison-row border-b border-[#333333] last:border-b-0">
              <div className="comparison-cell text-white text-left">{item.service}</div>
              <div className="comparison-cell text-gray-400">{item.traditional}</div>
              <div className="comparison-cell text-[#CCFF00] font-bold">{item.lumo}</div>
            </div>
          )}
          
          <div className="comparison-row bg-[#1A1A1A]/50">
            <div className="comparison-cell text-white font-bold text-left">Total Estimado</div>
            <div className="comparison-cell text-gray-400 line-through">$47,000 MXN</div>
            <div className="comparison-cell">
              <span className="text-[#CCFF00] font-black text-xl">Desde $22,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

// Artists Section
const ArtistsSection = () => {
  return (
    <section id="artistas" className="py-24 md:py-32 px-6 bg-[#121212]" data-testid="artists-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#CCFF00] text-sm uppercase tracking-widest mb-4 block">Casos de Éxito</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6" data-testid="artists-title">
            Artistas Reales,<br />
            <span className="text-[#CCFF00]">Resultados Reales</span>
          </h2>
          <p className="text-gray-400 text-lg">Hemos trabajado con artistas como:</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ARTISTS.map((artist, index) =>
          <div
            key={index}
            className="bg-[#1A1A1A] border border-[#333333] rounded-xl overflow-hidden group card-hover"
            data-testid={`artist-card-${index}`}>

              <div className="aspect-square bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                {artist.image ?
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> :


              <div className="w-20 h-20 rounded-full bg-[#CCFF00]/10 flex items-center justify-center">
                    <Music2 className="text-[#CCFF00]" size={32} />
                  </div>
              }
              </div>
              <div className="p-4 text-center">
                <h4 className="text-white font-bold">{artist.name}</h4>
                <p className="text-gray-400 text-sm">{artist.genre}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-xl text-white font-medium">
            Guadalajara es nuestro hub. <span className="text-[#CCFF00]">El mundo es el objetivo.</span>
          </p>
        </div>
      </div>
    </section>);

};

// Contact Form Component
const ContactForm = ({ onClose, formId = "modal" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artist_type: '',
    message: '',
    package_interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.");
      setFormData({ name: '', email: '', phone: '', artist_type: '', message: '', package_interest: '' });
      if (onClose) onClose();
    } catch (error) {
      toast.error("Error al enviar el formulario. Por favor intenta de nuevo.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid={`contact-form-${formId}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Nombre completo *</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#1A1A1A] border-[#333333] text-white focus:border-[#CCFF00]"
            placeholder="Tu nombre"
            required
            data-testid={`contact-name-input-${formId}`} />

        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email *</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-[#1A1A1A] border-[#333333] text-white focus:border-[#CCFF00]"
            placeholder="tu@email.com"
            required
            data-testid={`contact-email-input-${formId}`} />

        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Teléfono</label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-[#1A1A1A] border-[#333333] text-white focus:border-[#CCFF00]"
            placeholder="+52 33 1234 5678"
            data-testid={`contact-phone-input-${formId}`} />

        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tipo de Artista *</label>
          <Select
            value={formData.artist_type}
            onValueChange={(value) => setFormData({ ...formData, artist_type: value })}>

            <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-white" data-testid={`contact-artist-type-select-${formId}`}>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[#333333]">
              <SelectItem value="solista">Solista</SelectItem>
              <SelectItem value="banda">Banda</SelectItem>
              <SelectItem value="productor">Productor</SelectItem>
              <SelectItem value="dj">DJ</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Paquete de Interés</label>
        <Select
          value={formData.package_interest}
          onValueChange={(value) => setFormData({ ...formData, package_interest: value })}>

          <SelectTrigger className="bg-[#1A1A1A] border-[#333333] text-white" data-testid={`contact-package-select-${formId}`}>
            <SelectValue placeholder="Selecciona un paquete" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1A1A] border-[#333333]">
            <SelectItem value="emergentes">Artistas Emergentes - $22,000 MXN</SelectItem>
            <SelectItem value="establecidos">Artistas Establecidos - $35,000 MXN</SelectItem>
            <SelectItem value="completo">Desarrollo Completo - $55,000 MXN</SelectItem>
            <SelectItem value="personalizado">Paquete Personalizado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-2">Cuéntanos sobre tu proyecto</label>
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-[#1A1A1A] border-[#333333] text-white focus:border-[#CCFF00] min-h-[120px]"
          placeholder="Describe tu música, tus objetivos y qué buscas lograr..."
          data-testid={`contact-message-input-${formId}`} />

      </div>
      
      <Button
        type="submit"
        className="btn-primary w-full"
        disabled={isSubmitting}
        data-testid={`contact-submit-btn-${formId}`}>

        {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
      </Button>
      
      <p className="text-gray-500 text-xs text-center">
        Producción profesional limitada a cierto número de artistas por mes.
      </p>
    </form>);

};

// Footer Section
const FooterSection = ({ onApplyClick }) => {
  return (
    <footer id="contacto" className="py-24 px-6 bg-[#0A0A0A] border-t border-[#333333]" data-testid="footer-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <img src={ASSETS.logo} alt="Lumo Entretenimiento" className="h-12 mb-8" />
            <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
              Convierte tu talento en una<br />
              <span className="text-[#CCFF00]">carrera profesional</span>
            </h3>
            <p className="text-gray-400 mb-8">
              Producción profesional limitada a cierto número de artistas por mes.
            </p>
            
            <div className="flex gap-4 mb-8">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                data-testid="social-instagram">

                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                data-testid="social-youtube">

                <Youtube size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                data-testid="social-tiktok">

                <Music2 size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                data-testid="social-facebook">

                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={onApplyClick}
                className="btn-primary"
                data-testid="footer-cta-primary">

                Aplica Ahora
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                variant="outline"
                className="btn-secondary"
                onClick={() => document.getElementById('artistas').scrollIntoView({ behavior: 'smooth' })}
                data-testid="footer-cta-secondary">

                Ver Casos de Éxito
              </Button>
            </div>
          </div>
          
          <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-8">
            <h4 className="text-xl font-bold text-white mb-6">QUIERO SER PARTE DE SESSIONS...</h4>
            <ContactForm formId="footer" />
          </div>
        </div>
        
        <div className="section-divider my-12"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2025 Lumo Entretenimiento. Todos los derechos reservados.</p>
          <p>Guadalajara, Jalisco, México</p>
        </div>
      </div>
    </footer>);

};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/523312345678?text=Hola%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Lumo%20Entretenimiento"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      data-testid="whatsapp-float-btn"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyClick = () => {
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]" data-testid="landing-page">
      <Navigation scrolled={scrolled} onApplyClick={handleApplyClick} />
      
      <HeroSection onApplyClick={handleApplyClick} />
      <AboutSection />
      <ServicesSection />
      <InfrastructureSection />
      <PricingSection onApplyClick={handleApplyClick} />
      <SavingsSection />
      <ArtistsSection />
      <FooterSection onApplyClick={handleApplyClick} />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
      
      {/* Apply Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#333333] max-w-lg max-h-[90vh] overflow-y-auto [&>button]:text-white" data-testid="apply-dialog">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white">
              Aplica para trabajar con <span className="text-[#CCFF00]">Lumo</span>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Completa el formulario y nos pondremos en contacto contigo.
            </DialogDescription>
          </DialogHeader>
          <ContactForm onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>);

};

export default LandingPage;