# NewsTyper
![header](./docs/Header.png)
A modern web application that combines touch typing practice with news reading. Practice your typing skills while staying informed with the latest news articles.

## Features

- Interactive typing practice interface with real-time feedback
- Real-time news article display with difficulty ratings
- Single-paragraph articles optimized for typing practice
- Modern, responsive UI built with Tailwind CSS
- TypeScript support for better development experience
- Elegant dark theme design for reduced eye strain
- PostgreSQL database for article storage and management
- Real-time WPM (Words Per Minute) calculation
- Accuracy tracking with percentage display
- Combo system that rewards consistent typing
- Interactive animated character that reacts to typing events
- Visual cursor that follows your typing position
- Character-by-character highlighting (correct/incorrect/current)
- Article navigation system with previous/next controls
- Difficulty rating system (1-5 stars)
- Custom fonts (db-pixel and Zodiak) for optimal readability

## Typing Mechanics

The application features sophisticated typing mechanics:
- Real-time WPM calculation based on typing speed
- Accuracy tracking that updates with each keystroke
- Combo system that increases with correct typing and resets on errors
- Visual feedback with color-coded characters:
  - Green for correct typing
  - Red for incorrect typing
  - Highlighted current character
  - Dimmed upcoming text
- Backspace support for error correction
- Automatic focus management for seamless typing experience

## Animated Character

The application includes an interactive animated character powered by Rive animations:
- Four distinct animation states:
  - Idle: Default state when not typing
  - Typing: Active during typing
  - Error: Triggered by typing mistakes
  - Excited: Activated by achieving a combo of 5 or more
- Smooth transitions between animation states
- Responsive to user typing performance
- Optimized for performance with WebGL2 rendering

## Tech Stack

- **Frontend:**
  - Next.js 15.2
  - React 19
  - Tailwind CSS
  - TypeScript
  - Rive Animations (WebGL2)
  - Custom fonts (db-pixel, Zodiak)

- **Backend:**
  - PostgreSQL database
  - Prisma ORM
  - RESTful API endpoints
  - TypeScript
  - Article difficulty rating system
  - Article metadata management

- **Development Tools:**
  - ESLint
  - PostCSS
  - TypeScript
  - Prisma CLI
  - Database migration tools
  - Custom database seeding scripts

## Design

The application features a carefully crafted dark theme designed for optimal readability and reduced eye strain:
- Very dark background (close to black) for the main interface
- Slightly lighter background for the typing area
- High contrast white text for better visibility
- Red highlighting for incorrect typing
- Clean, minimalist button design with hover effects

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/daanblom/newstyper
   cd newstyper
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database:
   ```bash
   # Create a .env file with your database credentials
   DATABASE_URL="postgresql://username:password@localhost:5432/newstyper"
   
   # Run database migrations
   npx prisma migrate dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/src                  # Source code
├── /app              # Next.js app router and API routes
├── /components       # React components
│   ├── /animated-character  # Rive animation components
│   └── /type-writer        # Typing interface components
├── /data             # Data models and database schemas
├── /types            # TypeScript type definitions
└── /styles           # CSS and styling
    ├── /theme        # Theme configuration
    └── /components   # Component-specific styles

/public               # Static assets
├── /animations       # Rive animation files
└── /fonts           # Custom font files

/docs                 # Project documentation

/prisma               # Database schema and migrations
└── /scripts         # Database seeding and maintenance scripts
```

## Development

The project is structured into three main components:

1. **Frontend**
   - Web interface for typing practice
   - Article display with dark theme
   - Interactive typing mechanics
   - Real-time performance tracking
   - Animated character feedback
   - Article navigation system
   - Custom font integration
   - Responsive design with Tailwind CSS

2. **Backend**
   - PostgreSQL database for article storage
   - Prisma ORM for database management
   - RESTful API endpoints for article retrieval
   - Type-safe database operations
   - Article difficulty rating system
   - Article metadata management
   - Database seeding and maintenance

3. **Animation System**
   - Rive-powered animated character
   - State machine for animation control
   - WebGL2 rendering for performance
   - Responsive to typing events
   - Multiple animation states
   - Smooth state transitions

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma migrate dev` - Run database migrations
- `npx prisma studio` - Open Prisma database management UI

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
