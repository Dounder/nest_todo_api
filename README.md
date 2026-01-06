<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Todo Offline App

A NestJS application for managing personal todos with offline capabilities. Built with PostgreSQL, Prisma ORM, and session-based authentication. This app allows users to create, read, update, and delete todos while maintaining data integrity and security.

## Features

- **User Authentication**: Secure login and session management using Passport.js and Iron Session
- **Todo Management**: Full CRUD operations for todos with user-specific data
- **Health Checks**: Built-in health endpoint for monitoring application status
- **Database**: PostgreSQL with Prisma ORM for type-safe database operations
- **Docker Support**: Containerized setup for easy deployment and development
- **Code Quality**: Biome for linting and formatting, Lefthook for Git hooks
- **Testing**: Jest for unit and e2e testing

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with Local Strategy and Iron Session
- **Validation**: Class Validator and Class Transformer
- **Linting/Formatting**: Biome
- **Testing**: Jest
- **Containerization**: Docker & Docker Compose

## Installation

1. Clone the repository
2. Copy the `.env.example` file to `.env` and fill in the required environment variables
3. Run `pnpm install` to install dependencies (this also installs Git hooks automatically)
4. Run `docker compose -f compose.yml up -d` to start PostgreSQL and pgAdmin
   - This will start a PostgreSQL instance and a pgAdmin instance for database management
   - To stop the instances, run `docker compose -f compose.yml down`
5. Run `pnpm run prisma:migrate` to apply database migrations (if needed)
6. Run `pnpm run prisma:seed` to seed the database with initial data (optional)
7. Run `pnpm run start:dev` to start the development server

## Environment Variables

The application requires the following environment variables (defined in `.env`):

- `PORT`: Server port (default: 3000)
- `STAGE`: Application stage (dev, prod)
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret key for session encryption
- `SESSION_COOKIE_NAME`: Name of the session cookie
- `SESSION_COOKIE_MAX_AGE`: Session cookie max age in seconds

## API Endpoints

### Authentication
- `POST /auth/login` - User login

### Todos
- `GET /todo` - Get all todos for authenticated user
- `POST /todo` - Create a new todo
- `GET /todo/:id` - Get a specific todo
- `PATCH /todo/:id` - Update a todo
- `DELETE /todo/:id` - Delete a todo

### Health
- `GET /health` - Application health check

## Git Hooks Setup

This project uses Lefthook for code quality. Hooks are installed automatically with `pnpm install`.

### What happens automatically:

**On commit:**

- Biome checks and fixes code issues
- Biome formats your code
- TypeScript checks for errors

**On push:**

- Runs all tests
- Checks code quality

### Commit message format:

```bash
git commit -m "feat: description"
git commit -m "fix: description"
```

### Manual commands:

```bash
pnpm run lint              # Fix code issues and format
pnpm run test              # Run tests
pnpm run prisma:studio     # Open Prisma Studio for database management
```

## Development

### Running the app
```bash
pnpm run start:dev    # Development mode with hot reload and Prisma Studio
pnpm run start:debug  # Debug mode
pnpm run start:prod   # Production mode
```

### Database
```bash
pnpm run prisma:migrate  # Apply migrations
pnpm run prisma:seed     # Seed database
pnpm run prisma:studio   # Open Prisma Studio
```

### Testing
```bash
pnpm run test         # Run unit tests
pnpm run test:e2e     # Run e2e tests
pnpm run test:cov     # Run tests with coverage
```

### Code Quality
```bash
pnpm run format       # Format code
pnpm run lint         # Lint and fix code
```

## Docker

### Development
```bash
docker compose -f compose.yml up -d
```

### Production
```bash
docker compose -f compose.prod.yml up -d
```

### Build
```bash
docker compose -f compose.build.yml up --build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Commit with conventional commit messages
6. Push to your fork
7. Create a pull request

## License

This project is licensed under the MIT License.
