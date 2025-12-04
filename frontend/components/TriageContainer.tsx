'use client';

import { useState, useEffect, useCallback } from 'react';
import { Step } from '@/lib/triageData';
import QuestionCard from './QuestionCard';
import Breadcrumbs from './Breadcrumbs';

export default function TriageContainer() {
    const [currentStep, setCurrentStep] = useState<Step | null>(null);
    const [history, setHistory] = useState<{ id: string; question: string; answer: string; label?: string }[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNextStep = useCallback(async (currentStepId: string, answer: string | null | undefined) => {
        setLoading(true);
        try {
            const res = await fetch('/api/triage/next', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentStepId, answer }),
            });

            if (!res.ok) throw new Error('Failed to fetch step');

            const data = await res.json();
            const nextStep = data.nextStep;
            setCurrentStep(nextStep);

            // Use functional update to avoid dependency on currentStep
            if (currentStepId !== 'start' && answer !== undefined) {
                setHistory(prev => {
                    // Get the current step from the API response, not from state
                    let readableAnswer = answer || '';
                    if (nextStep && answer) {
                        // We need to look at the PREVIOUS step's options to get the label
                        // But we don't have it here. Let's just use the answer value
                        readableAnswer = answer;
                    }

                    return [...prev, {
                        id: currentStepId,
                        question: nextStep?.question || '',
                        answer: readableAnswer,
                        label: nextStep?.summaryLabel || nextStep?.question || ''
                    }];
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies!

    useEffect(() => {
        // Load state from localStorage
        const savedHistory = localStorage.getItem('ilumino_history');
        const savedStepId = localStorage.getItem('ilumino_currentStepId');

        if (savedHistory && savedStepId) {
            try {
                setHistory(JSON.parse(savedHistory));
                // Fetch the saved step definition
                fetchNextStep(savedStepId, undefined);
            } catch (e) {
                console.error("Failed to load saved state", e);
                fetchNextStep('start', null);
            }
        } else {
            // Initial load - start step
            fetchNextStep('start', null);
        }
    }, [fetchNextStep]);

    // Save history to localStorage whenever it changes
    useEffect(() => {
        if (history.length > 0) {
            localStorage.setItem('ilumino_history', JSON.stringify(history));
        }
    }, [history]);

    // Save current step ID whenever it changes
    useEffect(() => {
        if (currentStep) {
            localStorage.setItem('ilumino_currentStepId', currentStep.id);
        }
    }, [currentStep]);

    const handleAnswer = (answer: string | null) => {
        if (currentStep) {
            fetchNextStep(currentStep.id, answer);
        }
    };

    const handleBack = () => {
        if (history.length === 0) return;

        const newHistory = [...history];
        const lastStep = newHistory.pop();

        if (lastStep) {
            setHistory(newHistory);
            // Fetch the step definition for the last step in history to "go back" to it
            fetchNextStep(lastStep.id, undefined);
        } else {
            // If history is empty, go to start
            fetchNextStep('start', null);
        }
    };

    const handleRestart = () => {
        localStorage.removeItem('ilumino_history');
        localStorage.removeItem('ilumino_currentStepId');
        setHistory([]);
        fetchNextStep('start', null);
    };

    if (loading && !currentStep) {
        return <div className="flex justify-center items-center h-screen">Carregando...</div>;
    }

    if (!currentStep) {
        return <div>Erro ao carregar.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <QuestionCard
                step={currentStep}
                onAnswer={handleAnswer}
                loading={loading}
                history={history}
                onBack={history.length > 0 ? handleBack : undefined}
                onRestart={handleRestart}
            />
            <Breadcrumbs history={history} />
        </div>
    );
}
