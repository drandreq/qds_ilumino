import { NextResponse } from 'next/server';
import { triageFlow } from '@/lib/triageData';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { currentStepId, answer } = body;

        const currentStep = triageFlow[currentStepId];

        if (!currentStep) {
            return NextResponse.json({ error: 'Invalid step ID' }, { status: 400 });
        }

        // If no answer provided, return the current step (useful for initial load)
        if (answer === undefined || answer === null) {
            return NextResponse.json({ nextStep: currentStep });
        }

        // Find next step
        let nextStepId = null;
        if (currentStep.type === 'info') {
            nextStepId = currentStep.nextStepId;
        } else if (currentStep.type === 'question') {
            if (currentStep.inputType === 'choice' && currentStep.options) {
                const selectedOption = currentStep.options.find(opt => opt.value === answer);
                if (selectedOption) {
                    nextStepId = selectedOption.nextStepId;
                }
            } else if (currentStep.inputType === 'text') {
                nextStepId = currentStep.nextStepId;
            }
        }

        if (!nextStepId) {
            return NextResponse.json({ error: 'No next step found' }, { status: 400 });
        }

        const nextStep = triageFlow[nextStepId];
        if (!nextStep) {
            return NextResponse.json({ error: 'Next step not found' }, { status: 404 });
        }

        return NextResponse.json({
            nextStep,
            currentStep // Send current step so frontend can get the label
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
