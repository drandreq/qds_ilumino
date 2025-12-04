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

        let nextStepId = currentStep.nextStepId;

        // Logic to determine next step based on answer
        if (currentStep.options && answer) {
            const selectedOption = currentStep.options.find(opt => opt.value === answer);
            if (selectedOption && selectedOption.nextStepId) {
                nextStepId = selectedOption.nextStepId;
            }
        }

        // If it's an info step or text input (where nextStepId is static), nextStepId is already set from currentStep.nextStepId
        // The bug was that we were returning early if answer was undefined, but for 'info' steps answer is null/undefined but we want to proceed.
        // We handled "answer === undefined" above, but "answer === null" is also possible.
        // Actually, the frontend sends 'null' for info steps.

        if (!nextStepId) {
            // If no next step is defined (and it's not an end step), we might have an issue or it's the end of a branch
            if (currentStep.type !== 'end') {
                return NextResponse.json({ error: 'No next step found' }, { status: 500 });
            }
            // If it is an end step, we just return it again or handle as complete. 
            // For now, let's assume the frontend handles 'end' type.
            return NextResponse.json({ nextStep: currentStep }); // Or maybe null?
        }

        const nextStep = triageFlow[nextStepId];

        if (!nextStep) {
            return NextResponse.json({ error: 'Next step not found definition' }, { status: 500 });
        }

        return NextResponse.json({ nextStep });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
