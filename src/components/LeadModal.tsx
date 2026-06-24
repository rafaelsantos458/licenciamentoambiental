/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Building, 
  User, 
  MessageSquare,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { LeadForm } from '../types';
import { LPTracker } from '../utils/tracker';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function LeadModal({ isOpen, onClose, preselectedService = '' }: LeadModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    cnpj: '',
    city: '',
    state: 'SP',
    industrySector: 'industry',
    companySize: 'micro',
    currentStatus: preselectedService ? `Desejo licenciamento para: ${preselectedService}` : 'none',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync preselectedService changes
  React.useEffect(() => {
    if (preselectedService && isOpen) {
      setFormData(prev => ({
        ...prev,
        currentStatus: `Desejo licenciamento para: ${preselectedService}`
      }));
    }
  }, [preselectedService, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.companyName.trim()) {
        alert('Por favor, informe o nome ou razão social da empresa.');
        return;
      }
    } else if (step === 2) {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
        alert('Nome, email e telefone são obrigatórios.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending lead to the team
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Track conversion
      LPTracker.trackLeadSubmission(formData.name, formData.email);

      // Store in localStorage to make it real persistence
      try {
        const storedLeads = JSON.parse(localStorage.getItem('solucao_verde_leads') || '[]');
        storedLeads.push({
          ...formData,
          id: Date.now(),
          date: new Date().toISOString(),
        });
        localStorage.setItem('solucao_verde_leads', JSON.stringify(storedLeads));
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      cnpj: '',
      city: '',
      state: 'SP',
      industrySector: 'industry',
      companySize: 'micro',
      currentStatus: 'none',
      message: '',
    });
    setStep(1);
    setSubmitted(false);
  };

  const triggerWhatsappRedirect = () => {
    // Track click
    LPTracker.trackWhatsappClick(`Alinhamento pós-Lead Modal (${formData.companyName})`);

    const text = encodeURIComponent(
      `Olá Solução Verde! Acabei de enviar um formulário no site e gostaria de atendimento prioritário.\n\n` +
      `*Empresa:* ${formData.companyName}\n` +
      `*Setor:* ${formData.industrySector}\n` +
      `*Solicitante:* ${formData.name}\n` +
      `*Cidade/UF:* ${formData.city}/${formData.state}\n` +
      `*Mensagem:* ${formData.message || 'Solicitação de orçamento ambiental'}`
    );
    window.open(`https://wa.me/5519990183036?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="lead-modal-root">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
            id="lead-overlay"
          />

          {/* Modal Container */}
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6" id="lead-container">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-emerald-100"
              id="lead-box"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-brand-dark to-brand-green-dark px-6 py-6 text-white relative">
                <button
                  type="button"
                  id="close-lead-modal-btn"
                  onClick={onClose}
                  className="absolute top-4 right-4 rounded-full p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-green-neon p-2 text-brand-dark font-bold">
                    <PhoneCall className="h-5 w-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">Solicitar Análise Técnica</h3>
                    <p className="text-xs text-emerald-100 mt-0.5">Analistas ambientais responderão em até 2 horas úteis</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {!submitted && (
                <div className="w-full bg-emerald-100 h-1.5 flex" id="lead-progress-bar">
                  <div 
                    className="bg-brand-green-medium h-1.5 transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              )}

              {/* Step Forms */}
              <div className="px-6 py-6" id="lead-body">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-5"
                    id="lead-success-msg"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-brand-green-medium">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display text-xl font-bold text-neutral-900">Análise Solicitada!</h4>
                      <p className="text-sm text-neutral-600 max-w-sm mx-auto">
                        Recebemos os dados técnicos da sua empresa com sucesso. Um especialista de nossa equipe em São Paulo entrará em contato comercial via WhatsApp ou e-mail.
                      </p>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-left space-y-1">
                      <p className="text-xs text-emerald-950 font-bold">Protocolo de Registro:</p>
                      <p className="text-xs font-mono text-emerald-800">#SV-{Math.floor(Math.random() * 90000) + 10000}</p>
                      <p className="text-xs text-neutral-500 mt-2">Dica: Clique abaixo para acelerar seu atendimento ligando diretamente ao coordenador pelo Whatsapp.</p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        type="button"
                        id="redirect-whatsapp-btn"
                        onClick={triggerWhatsappRedirect}
                        className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="h-5 w-5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.006c6.55 0 11.885-5.335 11.888-11.892a11.83 11.83 0 00-3.485-8.413z" />
                        </svg>
                        <span className="shrink-0 font-bold">Falar Urgente via WhatsApp</span>
                      </button>
                      
                      <button
                        type="button"
                        id="reset-form-btn"
                        onClick={resetForm}
                        className="text-xs text-neutral-500 hover:text-brand-green-medium transition-all underline pt-2"
                      >
                        Enviar outro formulário
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Step 1: Company Profile */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                        id="lead-step-1"
                      >
                        <div className="border-b border-neutral-100 pb-3 mb-2 flex items-center gap-2">
                          <Building className="h-4 w-4 text-emerald-700" />
                          <span className="text-xs font-bold text-emerald-950 tracking-wide uppercase">Passo 1 de 3: Perfil da Empresa</span>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Razão Social ou Nome Fantasia *</label>
                          <input
                            type="text"
                            required
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Ex: Metalúrgica Silva Ltda"
                            className="w-full text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-neutral-700 block mb-1">Porte da Empresa</label>
                            <select
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleChange}
                              className="w-full text-sm px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                            >
                              <option value="micro">Microempresa (ME)</option>
                              <option value="small">Empresa de Pequeno Porte (EPP)</option>
                              <option value="medium">Média Empresa</option>
                              <option value="large">Grande Corporação/Multinacional</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-neutral-700 block mb-1">Setor de Atuação</label>
                            <select
                              name="industrySector"
                              value={formData.industrySector}
                              onChange={handleChange}
                              className="w-full text-sm px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                            >
                              <option value="industry">Indústria Geral</option>
                              <option value="construction">Construção Civil</option>
                              <option value="commerce">Comércio / Oficinas</option>
                              <option value="agro">Agropecuária / Silvicultura</option>
                              <option value="other">Outros Serviços Regulados</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Já recebeu autuação/notificação da CETESB?</label>
                          <select
                            name="cnpj" // we utilize CNPJ field as temporary or custom input indicator
                            value={formData.cnpj}
                            onChange={handleChange}
                            className="w-full text-sm px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                          >
                            <option value="não">Não recebi nenhuma notificação</option>
                            <option value="sim_recente">Sim, recebi notificação recente com prazo correndo</option>
                            <option value="sim_multa">Sim, fui multado e preciso recorrer</option>
                            <option value="nao_sei">Não sei ou estou em fase de abertura do negócio</option>
                          </select>
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            id="lead-next-step-1"
                            onClick={handleNext}
                            className="w-full bg-brand-green-medium hover:bg-brand-green-dark text-white font-semibold py-3 px-4 rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            Prosseguir <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Contact Person */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                        id="lead-step-2"
                      >
                        <div className="border-b border-neutral-100 pb-3 mb-2 flex items-center gap-2">
                          <User className="h-4 w-4 text-emerald-700" />
                          <span className="text-xs font-bold text-emerald-950 tracking-wide uppercase">Passo 2 de 3: Dados de Contato</span>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Seu Nome Completo *</label>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Rafael Santos"
                            className="w-full text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-semibold text-neutral-700 block mb-1">Celular / WhatsApp *</label>
                            <input
                              type="tel"
                              required
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Ex: (19) 99018-3036"
                              className="w-full text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-neutral-700 block mb-1">E-mail Profissional *</label>
                            <input
                              type="email"
                              required
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Ex: rafael@silvaindustria.com.br"
                              className="w-full text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-2">
                            <label className="text-xs font-semibold text-neutral-700 block mb-1">Cidade do Imóvel</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Ex: Campinas"
                              className="w-full text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-neutral-700 block mb-1">Estado</label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="w-full text-sm px-2 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                            >
                              <option value="SP">SP</option>
                              <option value="MG">MG</option>
                              <option value="RJ">RJ</option>
                              <option value="PR">PR</option>
                              <option value="SC">SC</option>
                              <option value="RS">RS</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            id="lead-back-step-2"
                            onClick={handleBack}
                            className="w-1/3 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-3 px-4 rounded-lg text-sm transition-all text-center cursor-pointer"
                          >
                            Voltar
                          </button>
                          <button
                            type="button"
                            id="lead-next-step-2"
                            onClick={handleNext}
                            className="w-2/3 bg-brand-green-medium hover:bg-brand-green-dark text-white font-semibold py-3 px-4 rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                          >
                            Avançar <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Specific Needs & Submit */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                        id="lead-step-3"
                      >
                        <div className="border-b border-neutral-100 pb-3 mb-2 flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-emerald-700" />
                          <span className="text-xs font-bold text-emerald-950 tracking-wide uppercase">Passo 3 de 3: Necessidades do Caso</span>
                        </div>

                        {formData.currentStatus && formData.currentStatus !== 'none' && (
                          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100/70 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-brand-green-medium shrink-0 animate-pulse" />
                            <span>Interesse: {formData.currentStatus}</span>
                          </div>
                        )}

                        <div>
                          <label className="text-xs font-semibold text-neutral-700 block mb-1">Fale um pouco sobre o caso ou dúvidas (opcional)</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Descreva o processo industrial, se há poço, se deseja CADRI, planta de áreas, etc."
                            className="w-full text-sm px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-2 focus:ring-brand-green-medium transition-all"
                          />
                        </div>

                        {/* GDPR Compliance note */}
                        <div className="flex gap-2 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                          <ShieldCheck className="h-5 w-5 text-brand-green-medium shrink-0 mt-0.5" />
                          <p className="text-xxs text-neutral-500 leading-normal">
                            Ao enviar, você autoriza o recebimento de contato técnico e concorda que seus dados de negócio serão tratados estritamente em acordo com as normas da Lei Geral de Proteção de Dados (LGPD).
                          </p>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            id="lead-back-step-3"
                            onClick={handleBack}
                            disabled={loading}
                            className="w-1/3 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium py-3 px-4 rounded-lg text-sm transition-all text-center cursor-pointer disabled:opacity-50"
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            id="lead-submit-btn"
                            disabled={loading}
                            className="w-2/3 bg-brand-green-medium hover:bg-brand-green-dark text-white font-bold py-3 px-4 rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Enviando...
                              </>
                            ) : (
                              <>
                                Solicitar Agora <Send className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
