/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Shield, 
  Clock, 
  ArrowRight, 
  Lock, 
  Scale, 
  Building, 
  FileText, 
  Building2, 
  Users, 
  Phone, 
  MapPin, 
  Mail, 
  AlertTriangle, 
  FileCheck, 
  ExternalLink, 
  ChevronDown, 
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
  FileBarChart,
  Award,
  Globe,
  Check
} from 'lucide-react';

import { ENVIRONMENTAL_RISKS, CORE_SERVICES, CLIENT_LOGOS, FAQS } from './data';
import { ServiceDetail } from './types';
import ServiceModal from './components/ServiceModal';
import LeadModal from './components/LeadModal';
import Logo from './components/Logo';
import ClientLogos from './components/ClientLogos';
import HeroLeadForm from './components/HeroLeadForm';
import { LPTracker } from './utils/tracker';
import LPAdminMetrics from './components/LPAdminMetrics';

// For icon mapping in local lists
const localIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle: AlertTriangle,
  Building: Building,
  Clock: Clock,
  FileText: FileText,
  Scale: Scale,
  Lock: Lock,
  Leaf: Leaf,
  ShieldCheck: ShieldCheck,
  TrendingUp: TrendingUp,
  Building2: Building2,
  FileBarChart: FileBarChart,
  Users: Users,
};

export default function App() {
  // Tracker init on load
  useEffect(() => {
    LPTracker.init();
  }, []);

  // Conversion Modals States
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // FAQ Accordion State
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const openLeadModalWithService = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setIsLeadModalOpen(true);
  };

  const handleOpenServiceDetails = (service: ServiceDetail) => {
    setActiveService(service);
    setIsServiceModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-brand-green-light selection:text-white" id="main-app-container">
      {/* Top Notification Bar */}
      <div className="bg-brand-dark text-white text-[11px] font-sans py-1.5 px-4 text-center border-b border-white/5 relative z-40 hidden sm:block">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green-neon animate-ping shrink-0" />
          Atendimento Prioritário Ativo para São Paulo e Região • Fale conosco: 
          <strong>(19) 99018-3036</strong>
        </span>
      </div>

      {/* Styled Top Sticky Header Container */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs" id="site-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-2 flex items-center justify-between">
          
          {/* Logo Brand Block */}
          <div 
            onClick={() => scrollToSection('hero-section')} 
            className="cursor-pointer"
            id="brand-logo-clickable"
          >
            <Logo iconSize="md" textColor="dark" />
          </div>

          {/* Header Direct Actions - Clean Landing Page Style */}
          <div className="flex items-center gap-4 sm:gap-6" id="header-actions">
            <a 
              href="tel:5519990183036" 
              className="flex items-center gap-1.5 text-slate-700 hover:text-brand-green-medium font-bold text-xs sm:text-sm py-1 transition-colors"
              id="header-phone-link"
            >
              <Phone className="h-3.5 w-3.5 text-brand-green-medium stroke-[2.5]" />
              <span className="hidden sm:inline">(19) 99018-3036</span>
              <span className="sm:hidden">Ligar</span>
            </a>
            
            <button
              onClick={() => openLeadModalWithService('Geral / Header')}
              className="bg-brand-green-medium hover:bg-brand-green-dark text-white font-bold text-xs py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl shadow-md transition-all hover:shadow-lg active:scale-95 cursor-pointer"
              id="header-cta-btn"
            >
              Análise Técnica Grátis
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pb-4 pt-1.5 sm:pt-3 sm:pb-6 lg:pt-3 lg:pb-8 bg-white" id="hero-section">
        {/* Beautiful Ambient Background */}
        <div className="absolute inset-0 bg-radial-[circle_at_70%_30%] from-emerald-50/50 via-white to-white z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column Text details */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5" id="hero-left-content">
              
              <div className="space-y-2">
                <div>
                  <span className="inline-flex items-center bg-[#1ea843] text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm shadow-sm" id="hero-badge-licenciamento">
                    LICENCIAMENTO AMBIENTAL
                  </span>
                </div>
                
                <h1 className="font-sans font-black tracking-tight leading-[1.06] uppercase" id="hero-heading-main">
                  <span className="text-[#134924] block text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.35rem]">LICENCIAMENTO</span>
                  <span className="text-[#134924] block text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] xl:text-[3.35rem]">AMBIENTAL COM</span>
                  <span className="text-[#5cbd31] block text-xl sm:text-2xl md:text-3xl lg:text-[1.95rem] xl:text-[2.35rem] mt-1.5 sm:mt-2.5">SEGURANÇA, AGILIDADE</span>
                  <span className="text-[#5cbd31] block text-xl sm:text-2xl md:text-3xl lg:text-[1.95rem] xl:text-[2.35rem]">E SUPORTE ESPECIALIZADO</span>
                </h1>
              </div>

              <p className="text-slate-650 text-sm sm:text-base md:text-lg max-w-xl font-sans leading-relaxed font-semibold" id="hero-paragraph-description">
                Regularize sua empresa com apoio técnico especializado e evite multas, embargos e atrasos em seu projeto.
              </p>

              {/* Conversion Actions Group */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => openLeadModalWithService('Hero Principal')}
                  className="w-full sm:w-auto bg-brand-green-medium hover:bg-brand-green-dark text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all shadow-emerald-900/10 hover:shadow-emerald-900/25 active:scale-98 flex items-center justify-center gap-2 group cursor-pointer text-sm sm:text-base"
                  id="hero-cta-main"
                >
                  <FileCheck className="h-5 w-5 shrink-0" />
                  <span>SOLICITAR ANÁLISE TÉCNICA</span>
                  <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="https://wa.me/5519990183036?text=Ol%C3%A1%21%20Gostaria%20de%20falar%20com%20um%20consultor%20da%20Solu%C3%A7%C3%A3o%20Verde%20sobre%20Licenciamento%20Ambiental."
                  target="_blank"
                  onClick={() => LPTracker.trackWhatsappClick('Hero CTA Secundário')}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-emerald-950/10 hover:shadow-emerald-950/20 active:scale-98 flex items-center justify-center gap-2 group text-sm sm:text-base cursor-pointer"
                  id="hero-cta-whatsapp"
                >
                  <svg className="h-5.5 w-5.5 fill-current shrink-0 text-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.006c6.55 0 11.885-5.335 11.888-11.892a11.83 11.83 0 00-3.485-8.413z" />
                  </svg>
                  <span>FALAR NO WHATSAPP</span>
                </a>
              </div>

              {/* Badges ticker showing proof metrics */}
              <div className="pt-1.5 border-t border-slate-100 flex flex-wrap gap-x-5 gap-y-1.5 items-center text-slate-500 text-xs font-sans">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-green-medium" /> Atuação Técnica Nacional
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-green-medium" /> Engenharia Registrada no CREA
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brand-green-medium" /> +10 Anos de Mercado Ambiental
                </span>
              </div>
            </div>

            {/* Right Column Lead Capture Form - Replacing the photo for lead capturing */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0" id="hero-right-visual">
              <HeroLeadForm />
            </div>

          </div>
        </div>
      </section>

      {/* Core Highlight Bar below Hero */}
      <section className="bg-brand-dark py-4 text-white relative z-10" id="feature-highlights-bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="rounded-lg bg-brand-green-medium p-2 text-white shrink-0">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-bold font-display uppercase tracking-wider block text-brand-green-neon">EVITE MULTAS</span>
                <span className="text-[10px] text-slate-300 leading-tight block mt-1">E embargos irreversíveis</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="rounded-lg bg-brand-green-medium p-2 text-white shrink-0">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-bold font-display uppercase tracking-wider block text-brand-green-neon">PROCESSOS ÁGEIS</span>
                <span className="text-[10px] text-slate-300 leading-tight block mt-1">Trâmite acelerado na CETESB</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="rounded-lg bg-brand-green-medium p-2 text-white shrink-0">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-bold font-display uppercase tracking-wider block text-brand-green-neon">TIME ESPECIALISTA</span>
                <span className="text-[10px] text-slate-300 leading-tight block mt-1">Engenharia multidisciplinar</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="rounded-lg bg-brand-green-medium p-2 text-white shrink-0">
                <Leaf className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-bold font-display uppercase tracking-wider block text-brand-green-neon">SUSTENTABILIDADE</span>
                <span className="text-[10px] text-slate-300 leading-tight block mt-1">Soluções econômicas e verdes</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Risks of Environmental Non-Compliance section */}
      <section className="py-10 sm:py-14 bg-slate-50" id="riscos-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 border border-rose-100 py-1.5 px-3 rounded-md">
              Atenção: Fiscalização Rigorosa
            </span>
            <h2 className="font-display font-black tracking-tight text-brand-dark text-2xl sm:text-4xl uppercase">
              OS RISCOS DA IRREGULARIDADE AMBIENTAL
            </h2>
          </div>

          {/* Grid of 6 Risk cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENVIRONMENTAL_RISKS.map((risk, index) => {
              const IconComp = localIconMap[risk.iconName] || AlertTriangle;
              
              return (
                <div 
                  key={risk.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xxs hover:shadow-lg hover:border-rose-200 transition-all group flex gap-4"
                  id={`risk-card-${risk.id}`}
                >
                  <div className="rounded-xl bg-rose-50 text-rose-600 p-3 shrink-0 h-12 w-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 justify-between">
                      <h4 className="font-display font-bold text-slate-900 group-hover:text-rose-750 transition-colors text-sm">
                        {risk.title}
                      </h4>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-extrabold text-rose-500">
                      Gravidade: {risk.severity}
                    </span>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans pt-1">
                      {risk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlight risk banner CTA */}
          <div className="mt-12 bg-rose-950 text-white rounded-2xl p-6 sm:p-8 border border-rose-900/50 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs font-bold text-rose-300 tracking-wider uppercase">FUI NOTIFICADO! O QUE DEVO FAZER?</p>
              <h3 className="font-display text-lg sm:text-xl font-bold">O prazo da notificação do Órgão Ambiental está correndo?</h3>
              <p className="text-slate-300 text-xs leading-relaxed leading-normal mt-1">
                Uma análise técnica para a resposta e contestação deve ser feita por profissional especializado para a suspensão das sanções e embargos.
              </p>
            </div>
            <button
              onClick={() => openLeadModalWithService('Defesa Notificação Emergencial')}
              className="whitespace-nowrap w-full md:w-auto bg-rose-600 hover:bg-rose-550 transition-all font-bold text-xs py-3 px-6 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-md"
              id="emergency-notif-btn"
            >
              Defesa de Notificação Urgente <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Sustainable solutions / Service Grid section */}
      <section className="py-10 sm:py-14 bg-white relative" id="solucoes-section">
        {/* Decorative background vectors */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/40 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-8 sm:mb-10">
            <span className="text-xs font-semibold text-brand-green-medium uppercase tracking-wider bg-emerald-50 border border-emerald-100 py-1 px-2.5 rounded-md">
              Portfólio de Serviços
            </span>
            <h2 className="font-display font-black tracking-tight text-brand-dark text-2xl sm:text-4xl">
              NOSSAS SOLUÇÕES PARA SUA EMPRESA
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Soluções integradas e completas com responsabilidade técnica e simplificação processual para todos os setores de negócios.
            </p>
          </div>

          {/* Grid of 6 main services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CORE_SERVICES.map((service) => {
              const ServiceIcon = localIconMap[service.iconName] || Leaf;
              
              return (
                <div
                  key={service.id}
                  onClick={() => handleOpenServiceDetails(service)}
                  className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 shadow-xxs hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
                  id={`service-card-${service.id}`}
                >
                  <div className="space-y-4">
                    <div className="rounded-xl bg-brand-green-medium text-white p-3.5 w-12 h-12 flex items-center justify-center shadow-md">
                      <ServiceIcon className="h-6 w-6 stroke-[2]" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 group-hover:text-brand-green-medium transition-colors text-base">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed font-sans mt-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-xs text-brand-green-medium font-semibold">
                    <span>Ver detalhes técnicos</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => openLeadModalWithService('Outro serviço / Geral')}
              className="bg-brand-dark hover:bg-brand-green-dark text-white font-bold py-3 px-8 rounded-xl text-xs transition-all active:scale-95 shadow-md inline-flex items-center gap-2 cursor-pointer"
              id="request-general-quote-btn"
            >
              Qual o seu caso? Solicite Diagnóstico Customizado <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Side-by-side Section: NOSSOS DIFERENCIAIS vs COMO FUNCIONA */}
      <section className="py-10 bg-slate-50 border-y border-slate-200" id="diferenciais-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Box: Nossos Diferenciais */}
            <div className="lg:col-span-5 space-y-6" id="diferenciais-pane">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase bg-emerald-100 py-1 px-2.5 rounded-md inline-block">
                  Segurança &amp; Tradição
                </span>
                <h2 className="font-display font-black tracking-tight text-neutral-900 text-2xl sm:text-3xl">
                  NOSSOS DIFERENCIAIS
                </h2>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Por que escolher a Solução Verde para assessorar sua fábrica ou empreendimento comercial? Conheça os atributos de confiança de nossos licenciadores:
                </p>
              </div>

              {/* List of 6 checkmarks */}
              <div className="space-y-3 pt-2">
                {[
                  { title: 'Equipe multidisciplinar com especialistas', desc: 'Profissionais de engenharia civil, química, florestal, sanitária e advogados ambientais.' },
                  { title: 'Atendimento personalizado e dinâmico', desc: 'Atendimento um-para-um diretamente com o coordenador técnico do seu processo.' },
                  { title: 'Atuação técnica em todo o Brasil', desc: 'Homologação de documentações em órgãos federais, estaduais e municipais de ponta.' },
                  { title: 'Agilidade nos processos e prazos', desc: 'Foco exclusivo em acelerar pareceres reduzindo ao máximo a necessidade de retrabalho.' },
                  { title: 'Suporte completo do início ao fim', desc: 'Acompanhamento presencial nas fiscalizações do início do escopo até a licença.' },
                  { title: 'Mais de 10 anos de experiência real', desc: 'Nossa bagagem com mais de uma década destrava caminhos difíceis nos entes reguladores.' },
                ].map((dif, idx) => (
                  <div key={idx} className="flex gap-3 bg-white p-3 rounded-xl border border-neutral-200/50" id={`diferencial-list-item-${idx}`}>
                    <span className="rounded-full bg-emerald-100 text-brand-green-medium p-1 shrink-0 h-7 w-7 flex items-center justify-center font-bold">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </span>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-xs leading-none">{dif.title}</h4>
                      <p className="text-[10px] text-neutral-500 leading-tight mt-1">{dif.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Como Funciona */}
            <div className="lg:col-span-7 space-y-6" id="funcionamento-section">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase block">
                  Metodologia Eficaz
                </span>
                <h2 className="font-display font-black tracking-tight text-neutral-900 text-2xl sm:text-3xl">
                  COMO FUNCIONA?
                </h2>
                <p className="text-neutral-500 text-sm">
                  Um processo transparente, sem sustos, estruturado para colocar sua empresa na regularidade em 4 etapas:
                </p>
              </div>

              {/* Step Flow timeline card */}
              <div className="space-y-4 pt-2">
                {[
                  { step: '01', title: 'ANÁLISE INICIAL', desc: 'Entendemos sua necessidade, avaliamos o cenário ambiental, levantamos o zoneamento urbano e enquadramos de acordo com o porte e impacto poluidor.' },
                  { step: '02', title: 'LEVANTAMENTO TÉCNICO', desc: 'Realizamos vistorias, elaboramos memoriais, organizamos a pasta de documentos estatais e compilamos projetos sanitários necessários.' },
                  { step: '03', title: 'PROTOCOLO E ACOMPANHAMENTO', desc: 'Protocolamos tecnicamente junto ao órgão responsável (ex: CETESB) e realizamos o controle periódico rigoroso das demandas e exigências dos analistas.' },
                  { step: '04', title: 'REGULARIZAÇÃO E SUPORTE', desc: 'Emissão da licença definitiva e acompanhamento de condicionantes visando manter sua empresa regular com atendimento para reformas ou ampliações.' }
                ].map((st, idx) => (
                  <div key={st.step} className="flex gap-4 p-4 bg-white rounded-xl border border-neutral-200 shadow-xxs items-start relative group" id={`steps-block-item-${idx}`}>
                    <div className="rounded-xl bg-slate-900 text-brand-green-neon text-lg font-display font-black h-12 w-12 flex items-center justify-center shrink-0 shadow-md group-hover:bg-brand-green-medium group-hover:text-white transition-colors">
                      {st.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-slate-900 uppercase text-xs tracking-wider">
                        {st.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Client Logos trust showcase */}
      <section className="relative py-7 sm:py-9 bg-gradient-to-b from-[#102B19] via-[#091D11] to-[#07160D] overflow-hidden" id="trust-clients-section">
        {/* Dynamic Abstract Leaf & Botanical Overlapping Gradients (Inspired by mockup) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="absolute inset-0 w-full h-full object-cover opacity-[0.28] mix-blend-screen" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="leafGradLogos1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#22C55E" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#15803D" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="leafGradLogos2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#84CC16" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#16A34A" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#14532D" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="leafGradLogos3" x1="10%" y1="90%" x2="90%" y2="10%">
                <stop offset="0%" stopColor="#15803D" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#22C55E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.38" />
              </linearGradient>
              <linearGradient id="leafGradLogos4" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#052E16" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Background overlapping smooth wavy leaves curves */}
            <path d="M-100,-100 C300,150 500,-50 900,250 C1200,450 1100,800 1600,900 L1600,-100 Z" fill="url(#leafGradLogos1)" />
            <path d="M1500,100 C1100,150 800,400 450,300 C100,200 -50,600 -100,1000 L1600,1000 Z" fill="url(#leafGradLogos2)" />
            <path d="M-150,500 C300,300 650,750 1100,550 C1300,450 1450,700 1600,500 L1600,1000 L-150,1000 Z" fill="url(#leafGradLogos3)" />
            <path d="M200,-50 C500,200 900,100 1150,450 C1300,650 1400,300 1600,600 L1600,-100 L200,-100 Z" fill="url(#leafGradLogos4)" />
            <path d="M-80,200 C350,400 600,150 1000,600 C1200,800 1350,550 1550,750 L1550,-100 L-80,-100 Z" fill="url(#leafGradLogos1)" opacity="0.6" />
            <path d="M100,950 C400,750 700,850 1050,650 C1300,500 1450,300 1600,-50 L-200,-50 Z" fill="url(#leafGradLogos2)" opacity="0.5" mix-blend-mode="multiply" />
          </svg>
        </div>

        {/* Subtle green foliage real textured overlay photo */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-[0.05] pointer-events-none" 
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            
            {/* Left Column: Heading text content */}
            <div className="w-full lg:w-[34%] text-left space-y-1.5 shrink-0">
              <h3 className="font-sans font-extrabold text-white text-lg sm:text-xl md:text-2xl tracking-wider uppercase leading-none select-none">
                QUEM CONFIA NA
              </h3>
              <h4 className="font-display font-black text-[#5CBA32] text-2.5xl sm:text-3.5xl lg:text-[42px] tracking-tight leading-none mb-1">
                SOLUÇÃO VERDE
              </h4>
              <p className="text-slate-300 text-xs sm:text-xs leading-relaxed max-w-sm">
                Mais de 10 anos auxiliando empresas dos mais diversos segmentos em processos ambientais.
              </p>
            </div>

            {/* Right Column: Logos layout & Actuation button */}
            <div className="w-full lg:w-[66%] flex flex-col gap-5 items-center">
              <ClientLogos />
              
              {/* Actuation map badge */}
              <div className="flex w-full justify-center xl:justify-center mt-1">
                <div className="inline-flex items-center gap-2.5 bg-[#478627] hover:bg-[#51992c] text-white text-[14px] sm:text-[16px] font-black py-4 px-10 sm:px-14 rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.02] border border-emerald-800/10 select-none cursor-pointer">
                  <img
                    src="https://res.cloudinary.com/dgzkksdzi/image/upload/v1780251660/1477996_npysyb.svg"
                    alt="Mapa do Brasil"
                    className="h-5.5 w-5.5 sm:h-6 sm:w-6 object-contain shrink-0 opacity-95"
                    referrerPolicy="no-referrer"
                  />
                  <span>Atuação em todo o Brasil</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQs Knowledge Base block */}
      <section className="py-10 sm:py-14 bg-slate-50" id="faqs-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-1.5 mb-8">
            <h2 className="font-display font-black tracking-tight text-neutral-900 text-2xl sm:text-3xl uppercase">
              DÚVIDAS FREQUENTES (FAQ)
            </h2>
            <p className="text-neutral-500 text-sm">
              Confira as respostas de nossos analistas para os principais questionamentos técnicos sobre a CETESB e documentação de licenciamento urbano ambiental.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3" id="faqs-accordion">
            {FAQS.map((faq, index) => {
              const isExpanded = expandedFaqIndex === index;

              return (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xxs flex flex-col"
                  id={`faq-item-${index}`}
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                    className="flex justify-between items-center text-left p-4 focus:outline-hidden hover:bg-slate-50/50 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                      {faq.question}
                    </span>
                    <span className={`shrink-0 text-slate-400 hover:text-brand-green-medium transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                      <ChevronDown className="h-4.5 w-4.5 stroke-[2.5]" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-4 text-xs text-slate-600 font-sans leading-relaxed bg-slate-50/20">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bottom Conversion Area / Final Forms */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#102B19] via-[#091D11] to-[#050F09] text-white overflow-hidden" id="contato-section">
        {/* Dynamic Abstract Leaf & Botanical Overlapping Gradients (Inspired by mockup) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="absolute inset-0 w-full h-full object-cover opacity-[0.28] mix-blend-screen" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#22C55E" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#15803D" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="leafGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#84CC16" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#16A34A" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#14532D" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="leafGrad3" x1="10%" y1="90%" x2="90%" y2="10%">
                <stop offset="0%" stopColor="#15803D" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#22C55E" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#86EFAC" stopOpacity="0.38" />
              </linearGradient>
              <linearGradient id="leafGrad4" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#052E16" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Background overlapping smooth wavy leaves curves and layers representing the foliage mockup shapes */}
            <path d="M-100,-100 C300,150 500,-50 900,250 C1200,450 1100,800 1600,900 L1600,-100 Z" fill="url(#leafGrad1)" />
            <path d="M1500,100 C1100,150 800,400 450,300 C100,200 -50,600 -100,1000 L1600,1000 Z" fill="url(#leafGrad2)" />
            <path d="M-150,500 C300,300 650,750 1100,550 C1300,450 1450,700 1600,500 L1600,1000 L-150,1000 Z" fill="url(#leafGrad3)" />
            <path d="M200,-50 C500,200 900,100 1150,450 C1300,650 1400,300 1600,600 L1600,-100 L200,-100 Z" fill="url(#leafGrad4)" />
            <path d="M-80,200 C350,400 600,150 1000,600 C1200,800 1350,550 1550,750 L1550,-100 L-80,-100 Z" fill="url(#leafGrad1)" opacity="0.6" />
            <path d="M100,950 C400,750 700,850 1050,650 C1300,500 1450,300 1600,-50 L-200,-50 Z" fill="url(#leafGrad2)" opacity="0.5" mix-blend-mode="multiply" />
          </svg>
        </div>

        {/* Subtle green foliage real textured overlay photo beneath the SVG vectors to add realism */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-[0.05] pointer-events-none" 
        />
        
        {/* Glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(74,222,128,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col Contact text */}
            <div className="lg:col-span-6 space-y-6" id="final-cta-text">
              <span className="bg-emerald-800 text-brand-green-neon text-[10px] font-bold tracking-wider uppercase py-1.5 px-3.5 rounded-md border border-emerald-700/50 inline-block font-display">
                Fale Com Consultores de Plantão
              </span>
              <h2 className="font-display font-black tracking-tight text-3xl sm:text-4xl text-white">
                PRECISA REGULARIZAR SUA EMPRESA?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg font-sans">
                Fale agora com engenhosos especialistas em licenciamento da Solução Verde e receba orientação especializada, ágil e segura para o seu processo municipal ou estadual.
              </p>

              {/* Complete Address & operations info block */}
              <div className="space-y-4 pt-4 border-t border-slate-800 text-xs text-slate-350">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-brand-green-light shrink-0" />
                  <span>Sede Corporativa: Avenida 6, 752 - Centro Rio Claro SP | CEP 13500-430</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-brand-green-light shrink-0" />
                  <span>comercial@solucaoverde.com.br</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-green-light shrink-0" />
                  <span>Horários: Segunda a Sexta, das 08h00 às 18h00 (Atendimento online 24h para emergências)</span>
                </div>
              </div>
            </div>

            {/* Right Col Beautiful White Box from the Image */}
            <div className="lg:col-span-6" id="final-cta-box-container">
              <div className="bg-white rounded-3xl p-6 sm:p-8 text-neutral-900 border border-emerald-100 shadow-2xl space-y-6">
                
                {/* Whatsapp Header representation */}
                <div className="flex items-center gap-4 border-b border-neutral-100 pb-4">
                  <div className="rounded-full bg-[#25D366] text-white p-2.5 shadow-lg flex items-center justify-center">
                    <svg className="h-7 w-7 fill-current text-white shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.006c6.55 0 11.885-5.335 11.888-11.892a11.83 11.83 0 00-3.485-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase block">Atendimento Via WhatsApp</span>
                    <a 
                      href="tel:5519990183036" 
                      className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-none block hover:text-brand-green-medium transition-colors mt-0.5"
                    >
                      (19) 99018-3036
                    </a>
                  </div>
                </div>

                {/* Primary WhatsApp Direct Button */}
                <a
                  href="https://wa.me/5519990183036?text=Ol%C3%A1%21%20Acesse%20o%20site%20da%20Solu%C3%A7%C3%A3o%20Verde%20e%20gostaria%20de%20conversar%20com%20um%20especialista%20agora."
                  target="_blank"
                  onClick={() => LPTracker.trackWhatsappClick('CTA Rodapé Especialista')}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 group text-sm sm:text-base cursor-pointer animate-pulse"
                  id="final-whatsapp-box-btn"
                >
                  <svg className="h-6 w-6 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.006c6.55 0 11.885-5.335 11.888-11.892a11.83 11.83 0 00-3.485-8.413z" />
                  </svg>
                  <span>FALAR COM ESPECIALISTA AGORA</span>
                </a>

                {/* Lead Form Alternative Trigger */}
                <div className="text-center">
                  <span className="text-xxs text-neutral-400 font-semibold block uppercase">OU SE PREFERIR ENVIAR DADOS TÉCNICOS</span>
                  <button
                    onClick={() => openLeadModalWithService('')}
                    className="mt-3 text-xs text-brand-green-medium hover:text-brand-green-dark font-extrabold flex items-center justify-center gap-1 mx-auto border-b-2 border-dashed border-emerald-300 hover:border-emerald-600 transition-all pb-0.5 cursor-pointer"
                    id="final-lead-modal-trigger"
                  >
                    Abrir Formulário Eletrônico de Consulta
                  </button>
                </div>



              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Actual Legal Footer of the application */}
      <footer className="bg-neutral-950 py-12 text-slate-400 border-t border-slate-900" id="legal-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-900">
            
            <div className="space-y-3">
              <Logo iconSize="sm" textColor="light" />
              <p className="text-[11px] text-slate-500 max-w-sm font-sans leading-normal">
                Consultoria e Planejamento Sustentável LTDA • CNPJ 35.830.570/0001-93 • ARTs registradas no CREA-SP. Todos os direitos reservados.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <button onClick={() => scrollToSection('riscos-section')} className="hover:text-white transition-colors cursor-pointer">Os Riscos</button>
              <button onClick={() => scrollToSection('solucoes-section')} className="hover:text-white transition-colors cursor-pointer">Serviços</button>
              <button onClick={() => scrollToSection('diferenciais-section')} className="hover:text-white transition-colors cursor-pointer">Diferenciais</button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 text-[10px] text-slate-600 font-sans select-none">
            <p onDoubleClick={() => setIsMetricsOpen(true)} className="cursor-default" title="Clique duas vezes para acessar métricas">© {new Date().getFullYear()} Solução Verde • Criado com alta fidelidade a partir do mockup.</p>
            <p>Projeto de Segurança, Agilidade &amp; Sustentabilidade Corporativa • São Paulo, Brasil.</p>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Whatsapp Widget on Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40" id="floating-whatsapp-widget">
        <a
          href="https://wa.me/5519990183036?text=Ol%C3%A1%21%20Estou%20navegando%20no%20site%20da%20Solu%C3%A7%C3%A3o%20Verde%2520e%20gostaria%20de%20atendimento%20t%25C3%25A9cnico."
          target="_blank"
          onClick={() => LPTracker.trackWhatsappClick('Widget Flutuante')}
          className="flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 sm:p-5 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group cursor-pointer"
          aria-label="Falar pelo WhatsApp"
          title="Falar pelo WhatsApp"
        >
          {/* High-fidelity vector SVG WhatsApp icon */}
          <svg className="h-6 w-6 sm:h-7 sm:w-7 fill-current text-white shrink-0" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.006c6.55 0 11.885-5.335 11.888-11.892a11.83 11.83 0 00-3.485-8.413z" />
          </svg>
        </a>
      </div>

      {/* Immersive Modular Modals Inject */}
      <AnimatePresence>
        {isServiceModalOpen && activeService && (
          <ServiceModal
            isOpen={isServiceModalOpen}
            onClose={() => setIsServiceModalOpen(false)}
            service={activeService}
            onSelectAction={openLeadModalWithService}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLeadModalOpen && (
          <LeadModal
            isOpen={isLeadModalOpen}
            onClose={() => {
              setIsLeadModalOpen(false);
              setPreselectedService('');
            }}
            preselectedService={preselectedService}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMetricsOpen && (
          <LPAdminMetrics
            onClose={() => setIsMetricsOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
