'use client';

import { useRive, Layout, Fit, Alignment, useStateMachineInput } from '@rive-app/react-webgl2';
import { useEffect, useState } from 'react';

interface AnimatedCharacterProps {
  // Animation states
  isTyping: boolean;
  hasError: boolean;
  typingSpeed: number; // WPM (words per minute)
  isSleeping: boolean; // Whether the character is sleeping
  // Animation file path
  animationFile: string;
}

export default function AnimatedCharacter({
  isTyping,
  hasError,
  typingSpeed,
  isSleeping,
  animationFile,
}: AnimatedCharacterProps) {
  const [currentState, setCurrentState] = useState<string>('idle');
  const { RiveComponent, rive } = useRive({
    src: animationFile,
    stateMachines: 'StateMachine',
    autoplay: true,
    useOffscreenRenderer: true,
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
    } else if (isSleeping) {
      setCurrentState('sleeping');
    } else if (!isTyping) {
      setCurrentState('idle');
    } else {
      // Determine typing speed state
      if (typingSpeed <= 20) {
        setCurrentState('speed1');
      } else if (typingSpeed <= 40) {
        setCurrentState('speed2');
      } else if (typingSpeed <= 60) {
        setCurrentState('speed3');
      } else {
        setCurrentState('speed4');
      }
    }
  }, [isTyping, hasError, typingSpeed, isSleeping]);

  useEffect(() => {
    if (!stateInput) {
      console.log('State input not available yet');
      return;
    }

    // Map states to numeric values according to rive_states.md
    const stateMap: Record<string, number> = {
      'sleeping': 0,
      'idle': 1,
      'speed1': 2,
      'speed2': 3,
      'speed3': 4,
      'speed4': 5,
      'error': 6
    };
    
    // Get the numeric value for the current state
    const numericValue = stateMap[currentState] ?? 1; // Default to idle (1) if state not found
    
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