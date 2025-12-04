import { Step } from '../triageData';

/**
 * Preventive Care & Education Flows
 * Includes Pap Smear (Papanicolau) Guide
 */
export const preventiveFlow: Record<string, Step> = {
    'preventive_start': {
        id: 'preventive_start',
        type: 'question',
        inputType: 'choice',
        question: 'Qual exame preventivo você vai fazer?',
        summaryLabel: 'Exame Preventivo',
        options: [
            { label: 'Papanicolau (Preventivo Ginecológico)', value: 'pap', nextStepId: 'pap_intro' },
            { label: 'Outro exame', value: 'other', nextStepId: 'end_preventive' },
        ]
    },

    // === Pap Smear Guide ===
    'pap_intro': {
        id: 'pap_intro',
        type: 'info',
        question: '📋 O Papanicolau (ou colpocitologia oncótica) é um exame preventivo fundamental para detectar alterações no colo do útero que podem levar ao câncer.',
        nextStepId: 'pap_who'
    },
    'pap_who': {
        id: 'pap_who',
        type: 'info',
        question: '👩 Toda mulher com vida sexual ativa acima de 25 anos deve realizar o exame regularmente (a cada 1-3 anos, conforme orientação médica).',
        nextStepId: 'pap_why'
    },
    'pap_why': {
        id: 'pap_why',
        type: 'info',
        question: '✅ O exame pode detectar câncer de colo do útero em estágio inicial (tratável) e lesões pré-cancerígenas. A detecção precoce salva vidas!',
        nextStepId: 'pap_procedure'
    },
    'pap_procedure': {
        id: 'pap_procedure',
        type: 'info',
        question: '🩺 Como funciona: A médica usa um espéculo (bico de pato) para visualizar o colo do útero e coleta células para análise. É rápido (2-5 min) e pode causar leve desconforto, mas não dói.',
        nextStepId: 'pap_concerns'
    },
    'pap_concerns': {
        id: 'pap_concerns',
        type: 'question',
        inputType: 'choice',
        question: 'Você tem alguma preocupação sobre o exame?',
        summaryLabel: 'Preocupações sobre Papanicolau',
        options: [
            { label: 'Sim, tenho medo da dor', value: 'pain', nextStepId: 'pap_pain' },
            { label: 'Sim, tenho vergonha', value: 'shame', nextStepId: 'pap_shame' },
            { label: 'Não, estou tranquila', value: 'no', nextStepId: 'pap_prep' },
        ]
    },
    'pap_pain': {
        id: 'pap_pain',
        type: 'info',
        question: '💚 É normal ter receio! Mas relaxe: o exame não costuma doer. Pode haver um desconforto leve quando o espéculo é inserido. Respirar fundo e relaxar a musculatura ajuda muito. Converse com a profissional se sentir dor.',
        nextStepId: 'pap_prep'
    },
    'pap_shame': {
        id: 'pap_shame',
        type: 'info',
        question: '💚 Sua saúde é prioridade! Profissionais de saúde realizam esse exame diariamente e estão ali para cuidar de você. Não há motivo para vergonha – é um procedimento médico normal e essencial.',
        nextStepId: 'pap_prep'
    },
    'pap_prep': {
        id: 'pap_prep',
        type: 'info',
        question: '📝 Preparo: Evite relações sexuais, duchas e cremes vaginais 48h antes. Não realize durante a menstruação. Vista roupa confortável.',
        nextStepId: 'pap_after'
    },
    'pap_after': {
        id: 'pap_after',
        type: 'info',
        question: '🏠 Após o exame: Você pode ter um leve sangramento (normal). Evite relações sexuais por 24-48h. O resultado sai em 2-4 semanas.',
        nextStepId: 'end_preventive'
    },

    'end_preventive': {
        id: 'end_preventive',
        type: 'end',
        question: '✅ Você está informada! Lembre-se: exames preventivos salvam vidas. Cuide da sua saúde!',
        summaryLabel: 'Fim da Orientação Preventiva',
    }
};
