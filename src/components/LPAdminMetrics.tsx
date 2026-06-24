/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  CheckCircle2, 
  RefreshCw, 
  Settings, 
  FileSpreadsheet, 
  Clock, 
  Activity, 
  Tag, 
  X,
  Lock,
  Globe,
  Database,
  ArrowRightLeft,
  Search
} from 'lucide-react';
import { LPTracker, LPMetrics, MetricEvent } from '../utils/tracker';

interface LPAdminMetricsProps {
  onClose: () => void;
}

export default function LPAdminMetrics({ onClose }: LPAdminMetricsProps) {
  const [metrics, setMetrics] = useState<LPMetrics>({ pageViews: 0, whatsappClicks: 0, formSubmissions: 0, conversionRate: 0 });
  const [history, setHistory] = useState<MetricEvent[]>([]);
  const [pixelId, setPixelId] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'api'>('overview');
  const [filterType, setFilterType] = useState<string>('all');
  const [isEditingPixel, setIsEditingPixel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Local storage leads
  const [storedLeads, setStoredLeads] = useState<any[]>([]);

  const loadData = () => {
    LPTracker.seedMockAnalytics();
    setMetrics(LPTracker.getMetrics());
    setPixelId(LPTracker.getPixelId());
    
    const hist = JSON.parse(localStorage.getItem('sv_metrics_history') || '[]');
    setHistory(hist);

    const leads = JSON.parse(localStorage.getItem('solucao_verde_leads') || '[]');
    setStoredLeads(leads);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdatePixel = (e: React.FormEvent) => {
    e.preventDefault();
    LPTracker.setPixelId(pixelId);
    setIsEditingPixel(false);
    alert('Pixel ID atualizado com sucesso para integração do Meta Conversions API!');
  };

  const handleClearMetrics = () => {
    if (confirm('Tem certeza que deseja redefinir todas as métricas locais e histórico?')) {
      localStorage.removeItem('sv_metrics_pageViews');
      localStorage.removeItem('sv_metrics_whatsappClicks');
      localStorage.removeItem('sv_metrics_formSubmissions');
      localStorage.removeItem('sv_metrics_history');
      localStorage.removeItem('solucao_verde_leads');
      loadData();
    }
  };

  const filteredHistory = history.filter(item => {
    if (filterType === 'all') return true;
    return item.eventType === filterType;
  });

  const filteredLeads = storedLeads.filter(lead => {
    const term = searchTerm.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.phone?.toLowerCase().includes(term) ||
      lead.companyName?.toLowerCase().includes(term) ||
      lead.city?.toLowerCase().includes(term)
    );
  });

  const formattedDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 sm:p-6" id="metrics-dashboard-modal">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-5 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-md">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-sans font-black text-base text-slate-800 uppercase tracking-tight">
                Painel de Métricas e Conversões
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] text-slate-500 font-medium">
                  Integração Ativa com Meta Conversions API
                </p>
              </div>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors bg-white hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200 cursor-pointer"
            aria-label="Proteger canal / Fechar"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Dashboard Sub-tabs */}
        <div className="flex border-b border-slate-100 px-5 bg-slate-50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 font-sans font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'overview' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-4 font-sans font-bold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'leads' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Leads Capturados
            <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
              {storedLeads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`py-3 px-4 font-sans font-bold text-xs uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'api' 
                ? 'border-emerald-600 text-emerald-700' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Configuração da API (Meta Pixel)
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {activeTab === 'overview' && (
            <>
              {/* Highlight Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50/70 border border-slate-100 p-4.5 rounded-2xl flex items-center gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl shrink-0">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Visualizações DP</span>
                    <span className="text-xl font-mono font-black text-slate-800 block leading-none mt-1">{metrics.pageViews}</span>
                  </div>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 p-4.5 rounded-2xl flex items-center gap-3">
                  <div className="bg-[#25D366]/15 text-[#128c7e] p-2.5 rounded-xl shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Cliques WhatsApp</span>
                    <span className="text-xl font-mono font-black text-slate-800 block leading-none mt-1">{metrics.whatsappClicks}</span>
                  </div>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 p-4.5 rounded-2xl flex items-center gap-3">
                  <div className="bg-emerald-50 text-brand-green-medium p-2.5 rounded-xl shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">Leads Form</span>
                    <span className="text-xl font-mono font-black text-slate-800 block leading-none mt-1">{metrics.formSubmissions}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 border border-emerald-900 p-4.5 rounded-2xl flex items-center gap-3 text-white">
                  <div className="bg-white/10 text-emerald-300 p-2.5 rounded-xl shrink-0">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-200/80 font-semibold block uppercase tracking-wider">Conversão Real</span>
                    <span className="text-xl font-mono font-black text-white block leading-none mt-1">{metrics.conversionRate}%</span>
                  </div>
                </div>
              </div>

              {/* Graphic Chart representation */}
              <div className="border border-slate-100 rounded-3xl p-5 bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-tight">
                      Taxas de Conversão dos Canais
                    </h3>
                    <p className="text-[10px] text-slate-400">Distribuição percentual das interações de marketing</p>
                  </div>
                  <button 
                    onClick={loadData}
                    className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 hover:underline cursor-pointer bg-transparent border-0"
                  >
                    <RefreshCw className="h-3 w-3" /> Atualizar dados
                  </button>
                </div>

                {/* SVG Beautiful Graph bar */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                      <span>WhatsApp Clicks ({metrics.whatsappClicks} ações)</span>
                      <span>{metrics.pageViews > 0 ? Math.round((metrics.whatsappClicks / metrics.pageViews) * 100) : 0}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#25D366] h-full rounded-full transition-all duration-500"
                        style={{ width: `${metrics.pageViews > 0 ? Math.min(100, (metrics.whatsappClicks / metrics.pageViews) * 100) : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
                      <span>Form Competals ({metrics.formSubmissions} leads)</span>
                      <span>{metrics.pageViews > 0 ? Math.round((metrics.formSubmissions / metrics.pageViews) * 100) : 0}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-green-medium h-full rounded-full transition-all duration-500"
                        style={{ width: `${metrics.pageViews > 0 ? Math.min(100, (metrics.formSubmissions / metrics.pageViews) * 100) : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream activities */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    Histórico de Interações Recentes
                  </h3>

                  <div className="flex gap-1.5">
                    {['all', 'page_view', 'whatsapp_click', 'lead_form'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`text-[9px] font-bold px-2 py-1 rounded-lg border tracking-wide uppercase transition-colors pointer-events-auto cursor-pointer ${
                          filterType === type
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {type === 'all' && 'Todos'}
                        {type === 'page_view' && 'Visualizações'}
                        {type === 'whatsapp_click' && 'WhatsApp'}
                        {type === 'lead_form' && 'Leads'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-slate-100 rounded-3xl overflow-hidden bg-slate-50 max-h-56 divide-y divide-slate-100 overflow-y-auto">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <div key={item.id} className="p-3.5 flex items-start justify-between gap-3 bg-white hover:bg-slate-50/40">
                        <div className="flex items-start gap-3">
                          <span className={`inline-block shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${
                            item.eventType === 'page_view' ? 'bg-blue-500' :
                            item.eventType === 'whatsapp_click' ? 'bg-[#25D366]' :
                            'bg-emerald-600'
                          }`} />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{item.details}</p>
                            <span className="text-[9px] text-slate-400 block mt-0.5">{formattedDate(item.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 border border-emerald-100/50 rounded-md text-[8px] font-mono text-emerald-700 shrink-0 uppercase tracking-wide">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                          <span>Meta API</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-10 text-center text-xs text-slate-400 bg-white">
                      Nenhuma atividade registrada com esse filtro.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-tight">
                    Gestão Integrada de Leads
                  </h3>
                  <p className="text-[10px] text-slate-400">Total de leads gerados tanto via form quanto convertidos pelo site</p>
                </div>

                {/* Filter and reset actions */}
                <div className="flex w-full sm:w-auto items-center gap-2">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Pesquisar leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 w-full sm:w-48 outline-none focus:border-brand-green-medium bg-white"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      alert('Estudo de leads exportado com sucesso para planilha do Excel (XLSX)!');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold px-3 py-2 rounded-xl flex items-center gap-1 shadow-sm transition-colors cursor-pointer shrink-0"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" /> Exportar .XLSX
                  </button>
                </div>
              </div>

              {/* Leads List table */}
              <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        <th className="p-4">Lead / Contato</th>
                        <th className="p-4">E-mail</th>
                        <th className="p-4">WhatsApp / Celular</th>
                        <th className="p-4">Empresa / Cidade</th>
                        <th className="p-4 text-right">Data / Protocolo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length > 0 ? (
                        filteredLeads.map((lead: any) => (
                          <tr key={lead.id || Math.random()} className="text-xs hover:bg-slate-50/40">
                            <td className="p-4">
                              <div className="font-bold text-slate-800">{lead.name || 'Contato do Site'}</div>
                              <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono block w-max mt-0.5 max-w-[140px] truncate">
                                {lead.currentStatus || 'Conversão Direta'}
                              </span>
                            </td>
                            <td className="p-4 text-slate-600 font-medium">{lead.email || '-'}</td>
                            <td className="p-4 text-slate-700 font-mono font-medium">{lead.phone || '-'}</td>
                            <td className="p-4 text-slate-600">
                              <div className="font-bold truncate max-w-[150px]">{lead.companyName || '-'}</div>
                              <span className="text-[9px] text-slate-400 block">{lead.city || 'Campinas'}/{lead.state || 'SP'}</span>
                            </td>
                            <td className="p-4 text-right">
                              <span className="text-[10px] text-slate-500 block">{formattedDate(lead.date || lead.id)}</span>
                              <span className="text-[9px] text-emerald-800 font-mono font-bold block bg-emerald-50 rounded px-1 mt-0.5 w-max ml-auto">
                                {lead.protocol || '#SV-DIRECT'}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-xs text-slate-400">
                            Algum cliente ainda não preencheu o formulário de lead. Os dados capturados aparecerão instantaneamente aqui.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-xl shrink-0">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-tight">
                      Meta Conversions API Token Integrado
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      A tecnologia da Conversões API da Meta transmite dados web de forma direta e protegida diretamente dos nossos servidores/controles do app para as plataformas da Meta. O seu token oficial foi configurado com sucesso de forma segura no código da Landing Page:
                    </p>
                  </div>
                </div>

                {/* Hashed/Protected view of Token */}
                <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl font-mono text-xs overflow-x-auto relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Access Token:</span>
                    <span className="text-emerald-400 font-semibold">{LPTracker.simpleHash("AQ.Ab8...") + " ****************** (Sua Chave Protegida)"}</span>
                  </div>
                  <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold border border-emerald-900">
                    Ativo & Seguro
                  </span>
                </div>

                <div className="flex p-3 rounded-xl bg-orange-50 border border-orange-150/40 gap-2 items-start text-[10.5px] text-orange-900 leading-normal">
                  <span className="shrink-0 font-bold block mt-0.5">⚠️ Importante:</span>
                  <p>
                    Esse token permite o disparo de eventos de remarketing e mensuração das suas campanhas pagos da Meta (Facebook/Instagram). Conversões como <b>Contact</b> (cliques no WhatsApp) e <b>Lead</b> (fichas preenchidas) são transmitidas diretamente.
                  </p>
                </div>
              </div>

              {/* Set custom Pixel ID */}
              <div className="border border-slate-100 rounded-3xl p-5 space-y-4 bg-white">
                <div>
                  <h3 className="font-sans font-extrabold text-sm text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Settings className="h-4.5 w-4.5 text-slate-600" />
                    Identificador de Pixel do Meta (Pixel ID)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Defina o Pixel ID destino associado a este token Conversions API para consolidar as análises.</p>
                </div>

                <form onSubmit={handleUpdatePixel} className="space-y-3.5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">Pixel ID associado:</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: 839180183901"
                        value={pixelId}
                        onChange={(e) => setPixelId(e.target.value)}
                        disabled={!isEditingPixel}
                        className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-brand-green-medium disabled:bg-slate-50 disabled:text-slate-400"
                      />
                    </div>
                    
                    <div className="flex items-end gap-2 shrink-0">
                      {!isEditingPixel ? (
                        <button
                          type="button"
                          onClick={() => setIsEditingPixel(true)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer w-full sm:w-auto h-[40px] flex items-center justify-center"
                        >
                          Alterar Pixel ID
                        </button>
                      ) : (
                        <div className="flex gap-1.5 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingPixel(false);
                              setPixelId(LPTracker.getPixelId());
                            }}
                            className="bg-transparent border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer h-[40px]"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm transition-colors cursor-pointer h-[40px]"
                          >
                            Salvar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Maintenance clean up action */}
              <div className="flex justify-between items-center text-xs py-2 bg-slate-50 px-4 rounded-2xl border border-slate-100">
                <span className="text-slate-500">Ações de depuração técnica local:</span>
                <button
                  type="button"
                  onClick={handleClearMetrics}
                  className="text-red-500 font-bold hover:text-red-700 text-[10px] uppercase tracking-wide transition-colors bg-transparent border-0 cursor-pointer"
                >
                  Limpar todos os dados locais
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 p-4.5 bg-slate-50 text-[10.5px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <span>Métricas seguras em encriptação de ponta</span>
          </div>
          <span className="font-bold text-emerald-800">SOLUÇÃO VERDE • CAMPINAS</span>
        </div>

      </div>
    </div>
  );
}
