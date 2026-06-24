/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeadForm {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  cnpj?: string;
  city: string;
  state: string;
  industrySector: string;
  companySize: string;
  currentStatus: string;
  message: string;
}

export interface RiskCalculatorInput {
  sector: 'industry' | 'construction' | 'commerce' | 'agro' | 'other';
  size: 'micro' | 'small' | 'medium' | 'large';
  hasCetesbNotification: boolean;
  isOperatingWithoutLicense: boolean;
  environmentalImpact: 'low' | 'moderate' | 'high';
}

export interface CalculatorResult {
  estimatedTimeMonths: string;
  recommendedPathway: string;
  riskScore: number; // 0 to 100
  potentialFinesRange: string;
  requiredDocuments: string[];
  recommendedSolutions: string[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  targetAudience: string;
  keyBenefits: string[];
  estimatedTime: string;
  regulationType: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: 'legal' | 'technical' | 'operational';
  checked: boolean;
  criticality: 'obrigatório' | 'recomendado' | 'opcional';
}
