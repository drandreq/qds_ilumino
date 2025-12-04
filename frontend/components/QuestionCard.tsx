'use client';

import { useState } from 'react';
import { Step } from '@/lib/triageData';
import { motion } from 'framer-motion';

interface QuestionCardProps {
    step: Step;
    onAnswer: (answer: string | null) => void;
    loading: boolean;
    history?: { id: string; question: string; answer: string; label?: string }[];
    onBack?: () => void;
    onRestart?: () => void;
}

export default function QuestionCard({ step, onAnswer, loading, history, onBack, onRestart }: QuestionCardProps) {
    const [textAnswer, setTextAnswer] = useState('');
    const [error, setError] = useState('');
    const [speaking, setSpeaking] = useState(false);
    const [showWhy, setShowWhy] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            if (speaking) {
                window.speechSynthesis.cancel();
                setSpeaking(false);
            } else {
                const utterance = new SpeechSynthesisUtterance(step.question);
                utterance.lang = 'pt-BR';
                utterance.onend = () => setSpeaking(false);
                window.speechSynthesis.speak(utterance);
                setSpeaking(true);
            }
        } else {
            alert('Seu navegador não suporta leitura de texto.');
        }
    };

    const handleSubmit = () => {
        if (step.inputType === 'text') {
            if (step.validationRegex) {
                const regex = new RegExp(step.validationRegex);
                if (!regex.test(textAnswer)) {
                    setError('Por favor, insira uma resposta válida.');
                    return;
                }
            }
            if (!textAnswer.trim()) {
                setError('Por favor, preencha o campo.');
                return;
            }
            onAnswer(textAnswer);
            setTextAnswer('');
            setError('');
        }
    };

    const handleOptionClick = (value: string) => {
        onAnswer(value);
    };

    const handleCopy = () => {
        if (!history) return;

        const text = `Resumo da Orientação - Ilumino Health\n\n` +
            history.map(item => `# ${item.label || item.question}: ${item.answer}`).join('\n');

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white shadow-lg rounded-lg p-6 relative"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3 pr-8">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                            title="Voltar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}
                    <h2 className="text-xl font-semibold text-gray-800">{step.question}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSpeak}
                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${speaking ? 'text-blue-600' : 'text-gray-500'}`}
                        title="Ouvir pergunta"
                        aria-label="Ouvir pergunta"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                    </button>
                    {onRestart && (
                        <button
                            onClick={() => {
                                if (confirm('Tem certeza que deseja reiniciar? Todo o progresso será perdido.')) {
                                    onRestart();
                                }
                            }}
                            className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                            title="Reiniciar do zero"
                            aria-label="Reiniciar formulário"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {step.whyAsk && (
                <div className="mb-6">
                    <button
                        onClick={() => setShowWhy(!showWhy)}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="16" x2="12" y2="12"></line>
                            <line x1="12" y1="8" x2="12.01" y2="8"></line>
                        </svg>
                        Por que perguntamos?
                    </button>
                    {showWhy && (
                        <div className="mt-2 p-3 bg-blue-50 text-blue-800 text-sm rounded-md border border-blue-100 animate-fade-in">
                            {step.whyAsk}
                        </div>
                    )}
                </div>
            )}

            {step.type === 'question' && (
                <div className="space-y-4">
                    {step.inputType === 'text' && (
                        <div>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={4}
                                value={textAnswer}
                                onChange={(e) => setTextAnswer(e.target.value)}
                                placeholder="Digite sua resposta..."
                                disabled={loading}
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Processando...' : 'Próximo'}
                            </button>
                        </div>
                    )}

                    {step.inputType === 'choice' && (
                        <div className="grid gap-3">
                            {step.options?.map((option) => (
                                <motion.button
                                    key={option.value}
                                    onClick={() => {
                                        handleOptionClick(option.value);
                                        if (navigator.vibrate) navigator.vibrate(10);
                                    }}
                                    disabled={loading}
                                    className="w-full text-left p-4 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg min-h-[60px] flex items-center"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {option.label}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {step.type === 'info' && (
                <button
                    onClick={() => onAnswer(null)} // Info steps just proceed
                    disabled={loading}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Entendi, continuar
                </button>
            )}

            {step.type === 'end' && (
                <div className="mt-6">
                    <div className="p-4 bg-green-50 rounded-md border border-green-200 mb-6">
                        <p className="text-green-800 font-medium text-lg">{step.question}</p>
                    </div>

                    {/* Explicit Restart Button at Top */}
                    <button
                        onClick={onRestart || (() => window.location.reload())}
                        className="w-full mb-6 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors font-medium text-lg flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                        </svg>
                        Reiniciar do Zero
                    </button>

                    {history && history.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-gray-700 text-lg">Resumo da Orientação</h3>
                                <button
                                    onClick={handleCopy}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                >
                                    {copied ? 'Copiado!' : 'Copiar Resumo'}
                                </button>
                            </div>
                            <ul className="space-y-3">
                                {history.map((item, index) => (
                                    <li key={index} className="border-b border-gray-200 pb-2 last:border-0">
                                        <p className="text-sm text-gray-500">{item.label || item.question}</p>
                                        <p className="font-medium text-gray-800">{item.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-yellow-800 text-sm">
                            💡 <strong>Dica:</strong> Reúna seus exames antigos para que o médico possa ver a evolução do seu quadro.
                        </p>
                    </div>

                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                        <h4 className="text-blue-900 font-bold mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            Perguntas Sugeridas para o Médico
                        </h4>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li>• Quais exames devo fazer regularmente considerando meu histórico?</li>
                            <li>• Há alguma vacina que eu deva atualizar?</li>
                            <li>• Como posso prevenir problemas relacionados ao meu histórico familiar?</li>
                            <li>• Meus sintomas atuais podem estar relacionados aos medicamentos que uso?</li>
                            <li>• Há mudanças no estilo de vida que podem melhorar minha condição?</li>
                        </ul>
                    </div>

                    <button
                        onClick={onRestart || (() => window.location.reload())}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
                    >
                        Começar novamente
                    </button>
                </div>
            )}
        </motion.div>
    );
}
