'use client';

import { useRive, Layout, Fit, Alignment, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';

interface AnimatedCharacterProps {
  // Animation states
  isTyping: boolean;
  hasError: boolean;
  comboCount: number;
  // Animation file path
  animationFile: string;
}

export default function AnimatedCharacter({
  isTyping,
  hasError,
  comboCount,
  animationFile,
}: AnimatedCharacterProps) {
  const [currentState, setCurrentState] = useState<string>('idle');
  const { RiveComponent, rive } = useRive({
    src: animationFile,
    stateMachines: 'StateMachine',
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  // Get the state input directly using the hook
  const stateInput = useStateMachineInput(rive, 'StateMachine', 'State');

  useEffect(() => {
    // Handle different states based on props
    if (hasError) {
      setCurrentState('error');
    } else if (comboCount >= 5) {
      setCurrentState('excited');
    } else if (isTyping) {
      setCurrentState('typing');
    } else {
      setCurrentState('idle');
    }
  }, [isTyping, hasError, comboCount]);

  useEffect(() => {
    if (!stateInput) {
      console.log('State input not available yet');
      return;
    }

    // Map states to numeric values
    const stateMap: Record<string, number> = {
      'idle': 0,
      'typing': 1,
      'error': 2,
      'excited': 3
    };
    const numericValue = stateMap[currentState] || 0;

    try {
      // Set the state value using the hook-provided input
      stateInput.value = numericValue;
      console.log(`Set state value to ${numericValue} for state ${currentState}`);
    } catch (error) {
      console.error('Error setting Rive animation state:', error);
    }
  }, [stateInput, currentState]);

  return (
    <div className="w-64 h-64 mx-auto">
      <RiveComponent />
    </div>
  );
} 