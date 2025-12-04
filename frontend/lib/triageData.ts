import { consultationFlow } from './data/consultation';
import { examsFlow } from './data/exams';
import { preventiveFlow } from './data/preventive';

export type StepType = 'question' | 'info' | 'end';
export type InputType = 'text' | 'choice' | 'date';

export interface Option {
    label: string;
    value: string;
    nextStepId: string;
}

export interface Step {
    id: string;
    type: StepType;
    inputType?: InputType;
    question?: string;
    options?: Option[];
    validationRegex?: string;
    nextStepId?: string;
    summaryLabel?: string;
    whyAsk?: string;
}

const mainFlow: Record<string, Step> = {
    'start': {
        id: 'start',
        type: 'question',
        inputType: 'choice',
        question: 'Olá! Como podemos ajudar você hoje?',
        summaryLabel: 'Motivo do contato',
        options: [
            { label: 'Preparação para Consulta', value: 'consultation', nextStepId: 'consultation_start' },
            { label: 'Orientações para Exames', value: 'exams', nextStepId: 'exams_start' },
            { label: 'Cuidados Preventivos (Papanicolau)', value: 'preventive', nextStepId: 'preventive_start' },
            { label: 'Estou sentindo algo', value: 'symptoms', nextStepId: 'symptoms_start' },
        ]
    },
    'symptoms_start': {
        id: 'symptoms_start',
        type: 'question',
        inputType: 'choice',
        question: 'O que você está sentindo?',
        summaryLabel: 'Sintomas',
        options: [
            { label: 'Dor de cabeça', value: 'headache', nextStepId: 'duration' },
            { label: 'Febre', value: 'fever', nextStepId: 'duration' },
            { label: 'Dor de garganta', value: 'sore_throat', nextStepId: 'duration' },
            { label: 'Dor abdominal', value: 'abdominal_pain', nextStepId: 'duration' },
            { label: 'Outros', value: 'other', nextStepId: 'symptoms_other' },
        ]
    },
    'symptoms_other': {
        id: 'symptoms_other',
        type: 'question',
        inputType: 'text',
        question: 'Por favor, descreva o que você está sentindo:',
        validationRegex: '^.{3,}$',
        nextStepId: 'duration'
    },
    'duration': {
        id: 'duration',
        type: 'question',
        inputType: 'choice',
        question: 'Há quanto tempo você sente isso?',
        summaryLabel: 'Duração',
        options: [
            { label: 'Começou hoje', value: 'today', nextStepId: 'severity' },
            { label: 'Alguns dias', value: 'days', nextStepId: 'severity' },
            { label: 'Mais de uma semana', value: 'weeks', nextStepId: 'severity' },
        ]
    },
    'severity': {
        id: 'severity',
        type: 'question',
        inputType: 'choice',
        question: 'De 0 a 10, qual a intensidade do desconforto?',
        summaryLabel: 'Intensidade',
        options: [
            { label: 'Leve (1-3)', value: 'mild', nextStepId: 'end_triage' },
            { label: 'Moderado (4-7)', value: 'moderate', nextStepId: 'end_triage' },
            { label: 'Intenso (8-10)', value: 'severe', nextStepId: 'end_urgent' },
        ]
    },
    'end_triage': {
        id: 'end_triage',
        type: 'end',
        question: 'Obrigado pelas informações. Sugerimos agendar uma consulta para avaliação detalhada.',
    },
    'end_urgent': {
        id: 'end_urgent',
        type: 'end',
        question: 'Atenção: Recomendamos que você procure um pronto-atendimento para avaliação imediata.',
    }
};

// Combine all flows
export const triageFlow: Record<string, Step> = {
    ...mainFlow,
    ...consultationFlow,
    ...examsFlow,
    ...preventiveFlow,
};
