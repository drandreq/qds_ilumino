import { Step } from '../triageData';

/**
 * Consultation Preparation Flow
 * Follows medical thinking: General History → Sex-Specific → Current Symptoms
 */
export const consultationFlow: Record<string, Step> = {
    // === START: Demographics (Sex & Age) ===
    'consultation_start': {
        id: 'consultation_start',
        type: 'question',
        inputType: 'choice',
        question: 'Para personalizarmos seu atendimento, qual foi seu sexo atribuído ao nascer?',
        summaryLabel: 'Sexo ao nascer',
        whyAsk: 'Algumas condições de saúde e exames são específicos para cada sexo biológico.',
        options: [
            { label: 'Feminino (XX)', value: 'female', nextStepId: 'age' },
            { label: 'Masculino (XY)', value: 'male', nextStepId: 'age' },
        ]
    },
    'age': {
        id: 'age',
        type: 'question',
        inputType: 'choice',
        question: 'Qual é a sua idade?',
        summaryLabel: 'Idade',
        whyAsk: 'A idade ajuda a orientar os exames preventivos e avaliações necessárias.',
        options: [
            { label: 'Menos de 18 anos', value: 'under18', nextStepId: 'health_issues' },
            { label: '18-29 anos', value: '18-29', nextStepId: 'health_issues' },
            { label: '30-49 anos', value: '30-49', nextStepId: 'health_issues' },
            { label: '50-64 anos', value: '50-64', nextStepId: 'health_issues' },
            { label: '65 anos ou mais', value: '65+', nextStepId: 'health_issues' },
        ]
    },

    // === General Medical History ===
    'health_issues': {
        id: 'health_issues',
        type: 'question',
        inputType: 'choice',
        question: 'Você tem algum problema de saúde diagnosticado (crônico)?',
        summaryLabel: 'Problemas de Saúde Crônicos',
        options: [
            { label: 'Sim', value: 'yes', nextStepId: 'medications' },
            { label: 'Não', value: 'no', nextStepId: 'medications' },
        ]
    },
    'medications': {
        id: 'medications',
        type: 'question',
        inputType: 'choice',
        question: 'Toma algum remédio todo dia?',
        summaryLabel: 'Uso de Medicamentos',
        whyAsk: 'Saber quais medicamentos você usa evita interações perigosas e ajuda no diagnóstico.',
        options: [
            { label: 'Não tomo remédios', value: 'none', nextStepId: 'surgeries' },
            { label: 'Um remédio', value: 'one', nextStepId: 'meds_knowledge' },
            { label: 'Dois ou mais', value: 'multiple', nextStepId: 'meds_knowledge' },
        ]
    },
    'meds_knowledge': {
        id: 'meds_knowledge',
        type: 'question',
        inputType: 'choice',
        question: 'Você sabe para que servem esses remédios?',
        summaryLabel: 'Conhecimento sobre Medicamentos',
        options: [
            { label: 'Sim, sei', value: 'yes', nextStepId: 'surgeries' },
            { label: 'Não tenho certeza', value: 'no', nextStepId: 'surgeries' },
        ]
    },
    'surgeries': {
        id: 'surgeries',
        type: 'question',
        inputType: 'choice',
        question: 'Já realizou alguma cirurgia?',
        summaryLabel: 'Cirurgias Prévias',
        options: [
            { label: 'Sim', value: 'yes', nextStepId: 'surgery_details' },
            { label: 'Não', value: 'no', nextStepId: 'hospitalization' },
        ]
    },
    'surgery_details': {
        id: 'surgery_details',
        type: 'question',
        inputType: 'text',
        question: 'Qual cirurgia e em qual ano?',
        summaryLabel: 'Detalhes da Cirurgia',
        nextStepId: 'hospitalization'
    },
    'hospitalization': {
        id: 'hospitalization',
        type: 'question',
        inputType: 'choice',
        question: 'Já ficou internado em hospital por alguma razão?',
        summaryLabel: 'Internações',
        options: [
            { label: 'Nunca', value: 'never', nextStepId: 'cardio_history' },
            { label: 'Uma vez', value: 'once', nextStepId: 'hospitalization_details' },
            { label: 'Mais de uma vez', value: 'multiple', nextStepId: 'hospitalization_details' },
        ]
    },
    'hospitalization_details': {
        id: 'hospitalization_details',
        type: 'question',
        inputType: 'text',
        question: 'Qual foi o motivo e o ano da internação mais recente?',
        summaryLabel: 'Detalhes da Internação',
        nextStepId: 'cardio_history'
    },
    'cardio_history': {
        id: 'cardio_history',
        type: 'question',
        inputType: 'choice',
        question: 'Você tem histórico de infarto ou AVC?',
        summaryLabel: 'Histórico Cardíaco',
        whyAsk: 'Histórico de eventos cardiovasculares requer atenção especial e monitoramento contínuo.',
        options: [
            { label: 'Não', value: 'no', nextStepId: 'cancer_history' },
            { label: 'Já infartei', value: 'heart_attack', nextStepId: 'cancer_history' },
            { label: 'Já tive AVC', value: 'stroke', nextStepId: 'cancer_history' },
            { label: 'Ambos', value: 'both', nextStepId: 'cancer_history' },
        ]
    },
    'cancer_history': {
        id: 'cancer_history',
        type: 'question',
        inputType: 'choice',
        question: 'Já tratou algum câncer?',
        summaryLabel: 'Histórico de Câncer',
        options: [
            { label: 'Sim', value: 'yes', nextStepId: 'cancer_details' },
            { label: 'Não', value: 'no', nextStepId: 'family_cancer' },
        ]
    },
    'cancer_details': {
        id: 'cancer_details',
        type: 'question',
        inputType: 'text',
        question: 'Qual tipo de câncer?',
        summaryLabel: 'Tipo de Câncer',
        nextStepId: 'family_cancer'
    },
    'family_cancer': {
        id: 'family_cancer',
        type: 'question',
        inputType: 'choice',
        question: 'Tem histórico de câncer na família?',
        summaryLabel: 'Histórico Familiar de Câncer',
        whyAsk: 'Alguns tipos de câncer têm componente genético, o que pode influenciar no rastreamento preventivo.',
        options: [
            { label: 'Sim', value: 'yes', nextStepId: 'vaccines' },
            { label: 'Não', value: 'no', nextStepId: 'vaccines' },
            { label: 'Não sei', value: 'unknown', nextStepId: 'vaccines' },
        ]
    },
    'vaccines': {
        id: 'vaccines',
        type: 'question',
        inputType: 'choice',
        question: 'Você tomou todas as vacinas da infância?',
        summaryLabel: 'Vacinação na Infância',
        whyAsk: 'O histórico vacinal é crucial para entender sua imunidade contra diversas doenças.',
        options: [
            { label: 'Sim', value: 'yes', nextStepId: 'birth_history' },
            { label: 'Não', value: 'no', nextStepId: 'birth_history' },
            { label: 'Não sei', value: 'unknown', nextStepId: 'birth_history' },
        ]
    },
    'birth_history': {
        id: 'birth_history',
        type: 'question',
        inputType: 'choice',
        question: 'Você nasceu de parto normal ou cesárea?',
        summaryLabel: 'Tipo de Parto',
        whyAsk: 'Informações sobre o nascimento podem ser relevantes para entender certas predisposições ou históricos.',
        options: [
            { label: 'Normal', value: 'vaginal', nextStepId: 'sex_at_birth' },
            { label: 'Cesárea', value: 'c_section', nextStepId: 'sex_at_birth' },
            { label: 'Não sei', value: 'unknown', nextStepId: 'sex_at_birth' },
        ]
    },

    // === Sex-Specific Questions ===
    'sex_at_birth': {
        id: 'sex_at_birth',
        type: 'question',
        inputType: 'choice',
        question: 'Para personalizarmos seu atendimento, qual foi seu sexo atribuído ao nascer?',
        summaryLabel: 'Sexo ao nascer',
        whyAsk: 'Algumas condições de saúde e exames são específicos para cada sexo biológico.',
        options: [
            { label: 'Feminino (XX)', value: 'female', nextStepId: 'menstruation_history' },
            { label: 'Masculino (XY)', value: 'male', nextStepId: 'current_symptoms' },
        ]
    },

    // Women's Health
    'menstruation_history': {
        id: 'menstruation_history',
        type: 'question',
        inputType: 'choice',
        question: 'Como é seu ciclo menstrual?',
        summaryLabel: 'Ciclo Menstrual',
        whyAsk: 'Alterações no ciclo podem indicar desequilíbrios hormonais ou outras condições ginecológicas.',
        options: [
            { label: 'Regular (todo mês)', value: 'regular', nextStepId: 'menstruation_flow' },
            { label: 'Irregular', value: 'irregular', nextStepId: 'menstruation_flow' },
            { label: 'Nunca menstruei / Menopausa', value: 'none', nextStepId: 'pregnancy_check' },
        ]
    },
    'menstruation_flow': {
        id: 'menstruation_flow',
        type: 'question',
        inputType: 'choice',
        question: 'Como você descreveria a quantidade de fluxo?',
        summaryLabel: 'Fluxo Menstrual',
        options: [
            { label: 'Normal', value: 'normal', nextStepId: 'pregnancy_check' },
            { label: 'Intenso (mais que a maioria)', value: 'heavy', nextStepId: 'pregnancy_check' },
        ]
    },
    'pregnancy_check': {
        id: 'pregnancy_check',
        type: 'question',
        inputType: 'choice',
        question: 'Existe possibilidade de estar grávida no momento?',
        summaryLabel: 'Possibilidade de Gravidez',
        whyAsk: 'A gravidez altera condutas médicas e contraindica certos exames e medicamentos.',
        options: [
            { label: 'Sim', value: 'yes', nextStepId: 'current_symptoms' },
            { label: 'Não', value: 'no', nextStepId: 'current_symptoms' },
            { label: 'Não sei', value: 'unknown', nextStepId: 'current_symptoms' },
        ]
    },

    // === Current Symptoms ===
    'current_symptoms': {
        id: 'current_symptoms',
        type: 'question',
        inputType: 'choice',
        question: 'Você está sentindo algum sintoma ou desconforto no momento?',
        summaryLabel: 'Sintomas Atuais',
        options: [
            { label: 'Sim, tenho sintomas', value: 'yes', nextStepId: 'symptoms_start' },
            { label: 'Não, vim para check-up/preventivo', value: 'no', nextStepId: 'end_consultation_prep' },
        ]
    },
    'symptoms_start': {
        id: 'symptoms_start',
        type: 'question',
        inputType: 'choice',
        question: 'O que você está sentindo?',
        summaryLabel: 'Sintoma Principal',
        options: [
            { label: 'Dor de cabeça', value: 'headache', nextStepId: 'symptom_duration' },
            { label: 'Febre', value: 'fever', nextStepId: 'symptom_duration' },
            { label: 'Dor abdominal', value: 'abdominal_pain', nextStepId: 'symptom_duration' },
            { label: 'Tosse', value: 'cough', nextStepId: 'symptom_duration' },
            { label: 'Outro sintoma', value: 'other', nextStepId: 'symptom_duration' },
        ]
    },
    'symptom_duration': {
        id: 'symptom_duration',
        type: 'question',
        inputType: 'choice',
        question: 'Há quanto tempo você sente isso?',
        summaryLabel: 'Duração do Sintoma',
        options: [
            { label: 'Começou hoje', value: 'today', nextStepId: 'symptom_severity' },
            { label: 'Alguns dias', value: 'days', nextStepId: 'symptom_severity' },
            { label: 'Semanas', value: 'weeks', nextStepId: 'symptom_severity' },
        ]
    },
    'symptom_severity': {
        id: 'symptom_severity',
        type: 'question',
        inputType: 'choice',
        question: 'De 0 a 10, qual a intensidade do desconforto?',
        summaryLabel: 'Intensidade',
        options: [
            { label: 'Leve (1-3)', value: 'mild', nextStepId: 'end_consultation_prep' },
            { label: 'Moderado (4-7)', value: 'moderate', nextStepId: 'end_consultation_prep' },
            { label: 'Intenso (8-10)', value: 'severe', nextStepId: 'end_consultation_prep' },
        ]
    },

    'end_consultation_prep': {
        id: 'end_consultation_prep',
        type: 'end',
        question: 'Obrigado pelas informações. Seu histórico foi registrado para auxiliar na sua consulta.',
        summaryLabel: 'Fim da Preparação',
    }
};
