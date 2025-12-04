import { Step } from '../triageData';

export const examsFlow: Record<string, Step> = {
    'exams_start': {
        id: 'exams_start',
        type: 'question',
        inputType: 'choice',
        question: 'Para qual exame você gostaria de ver as orientações de preparo?',
        options: [
            { label: 'Exame de Sangue (Glicemia/Diabetes)', value: 'glucose', nextStepId: 'exam_glucose_prep' },
            { label: 'Ressonância Magnética', value: 'mri', nextStepId: 'exams_body_part' },
            { label: 'Tomografia Computadorizada', value: 'ct_scan', nextStepId: 'exams_body_part' },
            { label: 'Outros', value: 'other', nextStepId: 'exams_body_part' },
        ]
    },
    // Glucose Specific Flow
    'exam_glucose_prep': {
        id: 'exam_glucose_prep',
        type: 'info',
        question: 'PREPARO: Para o exame de Glicemia, é necessário jejum de 8 horas. Você pode beber água normalmente, pois a água ajuda a deixar o sangue mais fluido, facilitando a coleta.',
        nextStepId: 'exam_history'
    },
    // Generic Exam Flow (reused parts)
    'exams_body_part': {
        id: 'exams_body_part',
        type: 'question',
        inputType: 'choice',
        question: 'Qual parte do corpo será examinada?',
        options: [
            { label: 'Cabeça/Crânio', value: 'head', nextStepId: 'exam_history' },
            { label: 'Tórax/Abdômen', value: 'body', nextStepId: 'exam_history' },
            { label: 'Membros', value: 'limbs', nextStepId: 'exam_history' },
        ]
    },
    'exam_history': {
        id: 'exam_history',
        type: 'question',
        inputType: 'choice',
        question: 'Você já realizou este exame anteriormente?',
        options: [
            { label: 'Sim', value: 'yes', nextStepId: 'exam_questions' },
            { label: 'Não', value: 'no', nextStepId: 'exam_questions' },
        ]
    },
    'exam_questions': {
        id: 'exam_questions',
        type: 'question',
        inputType: 'choice',
        question: 'Ficou com alguma dúvida sobre o preparo ou o exame?',
        options: [
            { label: 'Sim, tenho dúvidas', value: 'yes', nextStepId: 'exam_faq_select' },
            { label: 'Não, tudo certo', value: 'no', nextStepId: 'end_exam' },
        ]
    },
    'exam_faq_select': {
        id: 'exam_faq_select',
        type: 'question',
        inputType: 'choice',
        question: 'Sobre o que é sua dúvida?',
        options: [
            { label: 'Jejum e Alimentação', value: 'fasting', nextStepId: 'exam_faq_fasting' },
            { label: 'Duração', value: 'duration', nextStepId: 'exam_faq_duration' },
            { label: 'Outra dúvida', value: 'other', nextStepId: 'exam_ask_new' },
        ]
    },
    'exam_faq_fasting': {
        id: 'exam_faq_fasting',
        type: 'info',
        question: 'O jejum é essencial para resultados precisos. Água pura é permitida e recomendada. Evite café, chás ou sucos.',
        nextStepId: 'end_exam'
    },
    'exam_faq_duration': {
        id: 'exam_faq_duration',
        type: 'info',
        question: 'A coleta de sangue é rápida, levando poucos minutos. Exames de imagem podem levar de 15 a 40 minutos.',
        nextStepId: 'end_exam'
    },
    'exam_ask_new': {
        id: 'exam_ask_new',
        type: 'question',
        inputType: 'text',
        question: 'Por favor, digite sua dúvida:',
        nextStepId: 'end_exam_question_received'
    },
    'end_exam': {
        id: 'end_exam',
        type: 'end',
        question: 'Ótimo! Você está preparado para seu exame. Lembre-se de levar documento com foto e pedido médico.',
    },
    'end_exam_question_received': {
        id: 'end_exam_question_received',
        type: 'end',
        question: 'Recebemos sua dúvida. Nossa equipe entrará em contato para esclarecer.',
    }
};
