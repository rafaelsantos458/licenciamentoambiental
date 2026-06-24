/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, ChecklistItem } from './types';

export const ENVIRONMENTAL_RISKS = [
  {
    id: 'risco-multas',
    title: 'Risco de multas e penalidades altas',
    description: 'Multas pesadas aplicadas por órgãos de fiscalização que podem comprometer severamente o fluxo de caixa e a estabilidade da sua empresa.',
    iconName: 'AlertTriangle',
    severity: 'Crítica',
  },
  {
    id: 'risco-cetesb',
    title: 'Dificuldades com a CETESB',
    description: 'Problemas no atendimento a condicionantes e exigências técnicas, sem respostas adequadas.',
    iconName: 'Building',
    severity: 'Alta',
  },
  {
    id: 'risco-demora',
    title: 'Demora nas aprovações e atrasos',
    description: 'Processos parados nos órgãos oficiais por falta de conhecimento técnico e de acompanhamento ativo, gerando perdas e atrasos operacionais.',
    iconName: 'Clock',
    severity: 'Média',
  },
  {
    id: 'risco-documentacao',
    title: 'Falta de documentação adequada',
    description: 'Ausência de laudos técnicos, outorgas, plantas e relatórios que deveriam servir para sustentar a regularidade da atividade ante os fiscais.',
    iconName: 'FileText',
    severity: 'Alta',
  },
  {
    id: 'risco-inseguranca',
    title: 'Insegurança jurídica e riscos legais',
    description: 'Empresa passível de processos civis e criminais por crimes ambientais previstos em lei, ameaçando a integridade da operação.',
    iconName: 'Scale',
    severity: 'Crítica',
  },
  {
    id: 'risco-embargo',
    title: 'Embargo ou interdição da operação',
    description: 'Interrupção definitiva ou temporária das atividades operacionais da empresa pela fiscalização, impedindo o faturamento da noite para o dia.',
    iconName: 'Lock',
    severity: 'Crítica-Máxima',
  },
];

export const CORE_SERVICES: ServiceDetail[] = [
  {
    id: 'licenciamento',
    title: 'Licenciamento Ambiental',
    shortDescription: 'Conduzimos todo o processo de licença ambiental de forma segura.',
    fullDescription: 'Gerenciamos o processo completo para a obtenção das licenças prévia (LP), instalação (LI) e operação (LO). Nossa assessoria garante o total cumprimento das exigências legais com máxima velocidade, estruturando o dossiê perfeitamente desde o início para evitar exigências adicionais desnecessárias dos órgãos ambientais.',
    iconName: 'Leaf',
    targetAudience: 'Novas indústrias, ampliações de negócios e empreendimentos com potencial poluidor.',
    keyBenefits: [
      'Análise estratégica prévia de viabilidade locacional',
      'Elaboração de todos os estudos e compilação de documentos necessários',
      'Protocolo e acompanhamento passo-a-passo no órgão regulador',
      'Mitigação ágil de inconformidades apontadas pelos analistas'
    ],
    estimatedTime: 'Analisado conforme complexidade',
    regulationType: 'LP, LI, LO e Renovação'
  },
  {
    id: 'regularizacao',
    title: 'Regularização Ambiental',
    shortDescription: 'Adequação completa da sua empresa às exigências legais vigentes.',
    fullDescription: 'Ajustamos processos operacionais, elaboramos defesas técnicas contra autuações e propomos soluções para conformidade, livrando sua operação de penalidades.',
    iconName: 'ShieldCheck',
    targetAudience: 'Empresas em operação sem licença ou que receberam notificações/autuações de órgãos ambientais.',
    keyBenefits: [
      'Auditoria de conformidade dedicada para identificar lacunas;',
      'Elaboração de defesas de multas ambientais fundamentadas em embasamento técnico;',
      'Elaboração e retificação de Cadastro Ambiental Rural;',
      'Plano de Ação para eliminação de riscos legais.'
    ],
    estimatedTime: 'Analisado conforme complexidade',
    regulationType: 'Regularização / TAC / Termo de Compromisso'
  },
  {
    id: 'estudos',
    title: 'Estudos Técnicos',
    shortDescription: 'Estudos ambientais específicos, precisos e confiáveis.',
    fullDescription: 'Desenvolvimento de laudos e estudos ambientais requeridos por lei ou por fiscalizadores, conduzidos por um time multidisciplinar altamente experiente. Empregamos tecnologia de ponta e conhecimento atualizado para produzir documentos robustos com alta taxa de aceitação técnica.',
    iconName: 'TrendingUp',
    targetAudience: 'Empreendimentos sob licenciamento rigoroso, loteamentos e construções civis.',
    keyBenefits: [
      'Estudo de Impacto Ambiental e Relatório de Impacto Ambiental (EIA/RIMA), Relatório Ambiental Preliminar (RAP), Estudo Ambiental Simplificado;',
      'Laudo de Fauna e Flora;',
      'Plano de Recuperação de Áreas Degradadas (PRAD);',
      'Planos e Projetos Ambientais.'
    ],
    estimatedTime: 'Analisado conforme complexidade',
    regulationType: 'EIA/RIMA, RAP, RAS, PRAD, Laudos específicos'
  },
  {
    id: 'cetesb',
    title: 'Assessoria a Órgãos Ambientais',
    shortDescription: 'Suporte especializado e gestão completa junto aos Órgãos Ambientais.',
    fullDescription: 'Atuação especializada junto aos órgãos ambientais, cuidando de todo o processo técnico, e fazendo a interface entre os órgãos e o cliente.',
    iconName: 'Building2',
    targetAudience: 'Indústrias, transportadoras, construtoras, postos de combustíveis, agroindústrias, empresas no geral.',
    keyBenefits: [
      'Análise técnica das condicionantes de licença',
      'Resposta rápida em tempo hábil das notificações',
      'Acompanhamento presencial e virtual de reuniões técnicas com analistas'
    ],
    estimatedTime: 'Analisado conforme complexidade',
    regulationType: 'Licenças, CADRI, autorizações, respostas a autos de infração'
  },
  {
    id: 'relatorios',
    title: 'Relatórios Ambientais',
    shortDescription: 'Laudos especializados, RAPs, RASs e análises consolidadas.',
    fullDescription: 'Compilação de informações complexas para a montagem de relatórios informativos de conformidade (RAP, RAS, EAS, etc.). Desmistificamos exigências burocráticas complexas e entregamos análises detalhadas estruturadas de acordo com as normas da ABNT e diretrizes regulatórias.',
    iconName: 'FileBarChart',
    targetAudience: 'Empresas necessitando reportar conformidade ambiental estruturada ou em processos de auditoria.',
    keyBenefits: [
      'Relatório Ambiental Prévio (RAP) de alto rigor técnico',
      'Relatório de Controle Ambiental (RCA) estruturado',
      'Programas de Monitoramento Ambiental aplicáveis à planta',
      'Assinatura técnica de profissionais com alta credibilidade no setor'
    ],
    estimatedTime: 'Analisado conforme complexidade',
    regulationType: 'RAP, RAS, RCA, PCA'
  },
  {
    id: 'consultoria',
    title: 'Consultoria Corporativa',
    shortDescription: 'Consultoria estratégica para crescimento com total segurança.',
    fullDescription: 'Solução continuada para empresas e indústrias de médio e grande porte. Atuamos como o departamento de meio ambiente externo (terceirizado) do seu negócio, garantindo que novos projetos, novas aquisições de maquinários ou mudanças operacionais ocorram sob total controle legal de riscos.',
    iconName: 'Users',
    targetAudience: 'Diretores de indústrias, construtoras e investidores focados em ESG e compliance legal.',
    keyBenefits: [
      'Auditoria ambiental preventiva periódica (revisão de conformidade)',
      'Due Diligence ambiental para aquisições de imóveis ou plantas industriais',
      'Gestão de condicionantes de licenças já concedidas (evita vencimentos)',
      'Assessoria ESG, mitigação de pegada de carbono e fomento à economia circular'
    ],
    estimatedTime: 'Analisado conforme complexidade',
    regulationType: 'Compliance / ESG / Due Diligence'
  }
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'chk-cnpj', label: 'Cartão de CNPJ Ativo e Atualizado', category: 'legal', checked: false, criticality: 'obrigatório' },
  { id: 'chk-iptu', label: 'Cópia do IPTU do imóvel ou Matrícula do Imóvel', category: 'legal', checked: false, criticality: 'obrigatório' },
  { id: 'chk-uso-solo', label: 'Certidão de Diretrizes de Uso e Ocupação do Solo do Município', category: 'legal', checked: false, criticality: 'obrigatório' },
  { id: 'chk-quadro-areas', label: 'Planta de Localização da Empresa com Quadro de Áreas', category: 'technical', checked: false, criticality: 'obrigatório' },
  { id: 'chk-agua', label: 'Cópia da última fatura de água ou outorga de poço artesiano', category: 'operational', checked: false, criticality: 'recomendado' },
  { id: 'chk-energia', label: 'Cópia da fatura de fornecimento de energia elétrica recente', category: 'operational', checked: false, criticality: 'recomendado' },
  { id: 'chk-residuos', label: 'Contrato com transportador e receptor final de resíduos perigosos', category: 'operational', checked: false, criticality: 'recomendado' },
  { id: 'chk-bombeiro', label: 'AVCB (Auto de Vistoria do Corpo de Bombeiros) ativo', category: 'legal', checked: false, criticality: 'recomendado' },
  { id: 'chk-memorial', label: 'Memorial Descritivo do Processo Industrial da Atividade', category: 'technical', checked: false, criticality: 'obrigatório' },
  { id: 'chk-maquinas', label: 'Relação detalhada de máquinas e equipamentos instalados', category: 'technical', checked: false, criticality: 'opcional' },
];

export const CLIENT_LOGOS = [
  { name: 'Adler', text: 'ADLER', iconName: 'Hexagon' },
  { name: 'Bentomar', text: 'BENTOMAR', iconName: 'Compass' },
  { name: 'Brascobos', text: 'BRASCOBOS', iconName: 'Waves' },
  { name: 'DNV', text: 'DNV GL', iconName: 'FileCheck' },
  { name: 'Montcalm', text: 'MONTCALM', iconName: 'Shield' },
  { name: 'Deco', text: 'DECO', iconName: 'Cpu' },
];

export const FAQS = [
  {
    question: 'Quem precisa de Licenciamento Ambiental?',
    answer: 'Qualquer empresa, fábrica, comércio ou atividade que desenvolva ações consideradas efetiva ou potencialmente poluidoras, ou que possam causar degradação ambiental. Isso se aplica a indústrias metalúrgicas, alimentícias, químicas, mecânicas, transportadoras de certos produtos, construção civil, oficinas, postos de combustíveis, entre outros.'
  },
  {
    question: 'O que acontece se minha empresa operar sem licença ambiental?',
    answer: 'A falta de licenciamento ambiental configura crime ambiental. As penalidades incluem multas diárias que podem chegar a milhões de reais, embargo imediato das operações, dificuldades extremas ou perda de financiamentos bancários públicos/privados, além de inquéritos civis e criminais contra os administradores.'
  },
  {
    question: 'O que é a CETESB e qual sua função em São Paulo?',
    answer: 'A CETESB é a Companhia Ambiental do Estado de São Paulo. Ela é a agência governamental estadual responsável pela aplicação das leis ambientais, controle de poluição, fiscalização e emissão de licenças (LP, LI, LO), renovações, CADRIs e pareceres de viabilidade. Cuidamos do relacionamento completo e qualificado para que o analista da CETESB aprove seu projeto.'
  },
  {
    question: 'Quanto tempo leva para emitir uma Licença de Operação (LO)?',
    answer: 'O tempo varia amplamente com base no potencial poluidor e da qualidade das apresentações técnicas. Licenças simplificadas podem sair em até 60 dias, ao passo que licenciamentos complexos e industriais amplos com exigência de estudos de flora/fauna levam em média de 4 a 9 meses. Auxiliamos a encurtar esse prazo garantindo que o dossiê entre com zero falhas técnicas.'
  },
  {
    question: 'Posso transferir uma licença ambiental ou reverter um embargo?',
    answer: 'Sim, dependendo da regularização e do atendimento tempestivo de condicionantes técnico-jurídicas. Transferências de titularidade são processos oficiais via requerimento documentado. Para reversão de embargos, montamos um plano de emergência técnico focado em remover as inconformidades legais que originaram o bloqueio da operação.'
  }
];
