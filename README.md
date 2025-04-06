# NewsTyper
![header](./docs/Header.png)
A modern web application that combines touch typing practice with news reading. Practice your typing skills while staying informed with the latest news articles.

## Features

- Interactive typing practice interface
- Real-time news article display
- Single-paragraph articles optimized for typing practice
- Modern, responsive UI built with Tailwind CSS
- TypeScript support for better development experience
- Elegant dark theme design for reduced eye strain
- PostgreSQL database for article storage and management
- Animated typing character with Rive animations
- Combo counter and typing streak tracking
- Error state visualization
- Custom Zodiak font integration
- Fixed navigation for better UX

## Tech Stack

- **Frontend:**
  - Next.js 15.2
  - React 19
  - Tailwind CSS
  - TypeScript
  - Rive Animations
  - Custom Fonts (Zodiak)

- **Backend:**
  - PostgreSQL database
  - Prisma ORM
  - RESTful API endpoints
  - TypeScript

- **Development Tools:**
  - ESLint
  - PostCSS
  - TypeScript

## Design

The application features a carefully crafted dark theme designed for optimal readability and reduced eye strain:
- Very dark background (close to black) for the main interface
- Slightly lighter background for the typing area
- High contrast white text for better visibility
- Red highlighting for incorrect typing
- Clean, minimalist button design with hover effects
- Animated character feedback for typing states
- Custom Zodiak font for improved readability

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

- `/src` - Source code
  - `/app` - Next.js app router and API routes
  - `/components` - React components
    - `/type-writer` - Typing interface components
    - `/animated-character` - Rive animation components
  - `/styles` - CSS styles
    - `/theme` - Theme variables and colors
    - `/components` - Component-specific styles
  - `/data` - Data models and database schemas
  - `/types` - TypeScript type definitions
- `/public` - Static assets
  - `/fonts` - Custom fonts
  - `/animations` - Rive animation files
- `/docs` - Project documentation
- `/prisma` - Database schema and migrations

## Development

The project is structured into three main components:

1. **Frontend**
   - Web interface for typing practice
   - Article display with dark theme
   - User interaction

2. **Backend**
   - PostgreSQL database for article storage
   - Prisma ORM for database management
   - RESTful API endpoints for article retrieval
   - Type-safe database operations

3. **Server-side** (Planned)
   - News article fetching
   - AI-powered article transformation
   - Advanced database management

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
