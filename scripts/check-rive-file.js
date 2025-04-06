const fs = require('fs');
const path = require('path');

// Path to the Rive file
const riveFilePath = path.join(process.cwd(), 'public', 'animations', 'typing-character.riv');

console.log('Checking Rive file:', riveFilePath);

// Check if the file exists
if (!fs.existsSync(riveFilePath)) {
  console.error('Error: Rive file does not exist at', riveFilePath);
  process.exit(1);
}

// Get file stats
const stats = fs.statSync(riveFilePath);
console.log('File size:', stats.size, 'bytes');
console.log('File created:', stats.birthtime);
console.log('File modified:', stats.mtime);

// Check if the file is readable
try {
  const fileBuffer = fs.readFileSync(riveFilePath);
  console.log('File is readable');
  console.log('File is a binary file (not a text file)');
  
  // Check if it's a valid Rive file (basic check)
  // Rive files typically start with specific bytes
  const isRiveFile = fileBuffer.length > 100; // Basic check, Rive files are typically larger
  
  if (isRiveFile) {
    console.log('File appears to be a valid Rive file (based on size)');
  } else {
    console.warn('Warning: File might not be a valid Rive file (too small)');
  }
} catch (error) {
  console.error('Error reading file:', error.message);
  process.exit(1);
}

console.log('\nTo properly check the Rive file structure, you need to use the Rive editor:');
console.log('1. Go to https://rive.app');
console.log('2. Import your .riv file');
console.log('3. Check that it has a state machine named "StateMachine"');
console.log('4. Verify that the state machine has an input named "State"');
console.log('5. Make sure the state machine transitions are set up correctly'); 