/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Leaf, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  FileBarChart, 
  Users, 
  Calendar, 
  Target, 
  FileText 
} from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
  onSelectAction: (serviceName: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf: Leaf,
  ShieldCheck: ShieldCheck,
  TrendingUp: TrendingUp,
  Building2: Building2,
  FileBarChart: FileBarChart,
  Users: Users,
};

export default function ServiceModal({ isOpen, onClose, service, onSelectAction }: ServiceModalProps) {
  if (!service) return null;

  const ServiceIcon = iconMap[service.iconName] || Leaf;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="service-modal-root">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
            id="service-overlay"
          />

          {/* Center container for modern modal */}
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6" id="service-modal-container">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-emerald-100"
              id="service-card"
            >
              {/* Header block with green theme */}
              <div className="bg-brand-dark px-6 py-8 text-white relative">
                {/* Close Button */}
                <button
                  type="button"
                  id="close-service-modal-btn"
                  onClick={onClose}
                  className="absolute top-4 right-4 rounded-full p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-brand-green-medium p-3 text-white shadow-lg">
                    <ServiceIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-brand-green-neon block mb-1">
                      Solução Verde • Especialista
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-white leading-none">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="px-6 py-6 space-y-6" id="service-modal-[body]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2 font-display">
                    Visão Geral do Serviço
                  </h4>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {service.fullDescription}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/60">
                  <div className="flex items-start gap-2.5">
                    <Target className="h-5 w-5 text-brand-green-medium shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-950 block">Público-Alvo Recomendado</span>
                      <span className="text-xs text-neutral-600 font-sans leading-tight block mt-0.5">{service.targetAudience}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Calendar className="h-5 w-5 text-brand-green-medium shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-950 block">Prazo Médio Resposta</span>
                      <span className="text-xs text-neutral-600 font-sans leading-tight block mt-0.5">{service.estimatedTime}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 md:col-span-2 border-t border-emerald-100/40 pt-3 mt-1">
                    <FileText className="h-5 w-5 text-brand-green-medium shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-950 block">Principais Documentos Trabalhados</span>
                      <span className="text-xs font-mono text-emerald-800 text-xs block mt-0.5">{service.regulationType}</span>
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 font-display">
                    Principais Atividades e Benefícios
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    {service.keyBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="mt-0.5 rounded-full p-0.5 bg-emerald-100 text-brand-green-medium shrink-0">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-neutral-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-neutral-100">
                <p className="text-xs text-neutral-500 max-w-sm">
                  Receba uma análise prévia e fale diretamente com nossos licenciadores municipais e estaduais de plantão.
                </p>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    id="service-action-close"
                    onClick={onClose}
                    className="flex-1 sm:flex-none border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 font-medium px-4 py-2.5 rounded-lg text-sm transition-all text-center cursor-pointer"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    id="service-action-quote"
                    onClick={() => {
                      onSelectAction(service.title);
                      onClose();
                    }}
                    className="flex-grow whitespace-nowrap bg-brand-green-medium hover:bg-brand-green-dark text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md active:scale-95 cursor-pointer text-center"
                  >
                    Falar com consultor
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
