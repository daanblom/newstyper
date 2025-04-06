# Rive Animation for Typing Character

This directory should contain a Rive animation file named `typing-character.riv` that implements an animated character that reacts to typing events.

## Required Animation States

The animation should have a state machine named "StateMachine" with the following states:

1. **idle** - Default state when not typing
2. **typing** - When actively typing
3. **error** - When a typing error occurs
4. **excited** - When achieving a combo of 5 or more

## Input Configuration

The state machine should have an input named "State" that accepts numeric values:

- 0: idle
- 1: typing
- 2: error
- 3: excited

## Animation Guidelines

- The character should be visually engaging and responsive
- Transitions between states should be smooth
- The character should clearly indicate the current typing state
- The animation should be lightweight to avoid performance issues

## File Location

Place your `.riv` file in this directory with the name `typing-character.riv`. 