/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Send, 
  CheckCircle2, 
  Lock, 
  Phone,
  Mail,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { LeadForm } from '../types';
import { LPTracker } from '../utils/tracker';

export default function HeroLeadForm() {
  const [formData, setFormData] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    companyName: 'Não informada',
    cnpj: 'não',
    city: 'Não informada',
    state: 'SP',
    industrySector: 'Comum',
    companySize: 'micro',
    currentStatus: 'Formulário Simples de Captura Hero',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [protocol, setProtocol] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Por favor, informe seu WhatsApp.');
      return;
    }
    if (!formData.email.trim()) {
      alert('Por favor, informe seu e-mail.');
      return;
    }

    setLoading(true);

    const generatedProtocol = `#SV-${Math.floor(Math.random() * 90000) + 10000}`;
    setProtocol(generatedProtocol);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Track conversion
      LPTracker.trackLeadSubmission(formData.name, formData.email);
      
      // Store in localStorage for real simulation
      try {
        const storedLeads = JSON.parse(localStorage.getItem('solucao_verde_leads') || '[]');
        storedLeads.push({
          ...formData,
          id: Date.now(),
          protocol: generatedProtocol,
          date: new Date().toISOString(),
        });
        localStorage.setItem('solucao_verde_leads', JSON.stringify(storedLeads));
      } catch (err) {
        console.error(err);
      }
    }, 1000);
  };

  const triggerWhatsappRedirect = () => {
    // Track click
    LPTracker.trackWhatsappClick('Alinhamento pós-Lead Hero');

    const text = encodeURIComponent(
      `Olá Solução Verde! Preenchi o formulário de contato simplificado no site com o protocolo *${protocol}*.\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*WhatsApp:* ${formData.phone}\n` +
      `*E-mail:* ${formData.email}`
    );
    window.open(`https://wa.me/5519990183036?text=${text}`, '_blank');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: 'Não informada',
      cnpj: 'não',
      city: 'Não informada',
      state: 'SP',
      industrySector: 'Comum',
      companySize: 'micro',
      currentStatus: 'Formulário Simples de Captura Hero',
      message: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-7 relative overflow-hidden" id="hero-inline-lead-form">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 opacity-60" />

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4 space-y-5"
          id="hero-form-success"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-brand-green-medium">
            <CheckCircle2 className="h-9 w-9 text-brand-green-medium" />
          </div>
          
          <div className="space-y-1.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-900 uppercase tracking-tight">
              Dados Recebidos!
            </h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
              Obrigado pelo contato! Um de nossos consultores de Campinas/São Paulo entrará em contato comercial em instantes.
            </p>
          </div>

          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100/50 text-left max-w-xs mx-auto space-y-1">
            <span className="text-[10px] text-emerald-950 font-bold uppercase tracking-wider block">Protocolo de Atendimento:</span>
            <span className="text-sm font-mono font-bold text-emerald-800 block">{protocol}</span>
            <span className="text-[10px] text-slate-500 block leading-tight mt-1.5">
              Dica: clique abaixo para falar imediatamente com nosso coordenador técnico via WhatsApp acelerando sua resposta.
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
            <button
              type="button"
              onClick={triggerWhatsappRedirect}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-5 rounded-2xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <svg className="h-5.5 w-5.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.006c6.55 0 11.885-5.335 11.888-11.892a11.83 11.83 0 00-3.485-8.413z" />
              </svg>
              <span className="shrink-0">Falar no WhatsApp</span>
            </button>
            
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-neutral-500 hover:text-brand-green-medium transition-all underline pt-1 bg-transparent border-0 cursor-pointer"
            >
              Preencher novamente
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="rounded-lg bg-emerald-50 p-1.5 text-brand-green-medium">
              <PhoneCall className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-tight leading-none">
                Receba uma Análise Gratuita
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Insira seus dados para contato comercial</p>
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Form Input fields */}
          <div className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1">
                <User className="h-3.5 w-3.5 text-brand-green-medium" />
                <span>Nome Completo *</span>
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: João da Silva"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-green-medium focus:ring-1 focus:ring-brand-green-medium transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1">
                <Phone className="h-3.5 w-3.5 text-brand-green-medium" />
                <span>WhatsApp / Celular *</span>
              </label>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: (19) 99018-3036"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-green-medium focus:ring-1 focus:ring-brand-green-medium transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 mb-1">
                <Mail className="h-3.5 w-3.5 text-brand-green-medium" />
                <span>E-mail Profissional *</span>
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: joao@empresa.com"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-green-medium focus:ring-1 focus:ring-brand-green-medium transition-all"
              />
            </div>
          </div>

          <div className="flex gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 items-start">
            <ShieldCheck className="h-4 w-4 text-brand-green-medium shrink-0 mt-0.5" />
            <p className="text-[9px] text-slate-500 leading-normal">
              Seus dados estão 100% seguros de acordo com as diretrizes rígidas da LGPD.
            </p>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green-medium hover:bg-brand-green-dark text-white font-bold py-3 px-4 rounded-xl text-xs transition-with shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Enviando dados...</span>
                </>
              ) : (
                <>
                  <span>Enviar Solicitação Gratuitamente</span> <Send className="h-3 w-3" />
                </>
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-1 text-[9px] text-slate-400 font-sans mt-1">
            <Lock className="h-3 w-3 text-slate-300" />
            <span>Ambiente seguro sob criptografia de ponta</span>
          </div>
        </form>
      )}
    </div>
  );
}
