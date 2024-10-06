## Node.js Express TypeScript API Starter

## Summary
- **Framework**: [Express.js](https://expressjs.com) and Language: [TypeScript](https://www.typescriptlang.org)
- **ORM**: object relational mapping  using [TypeORM](https://typeorm.io/)
- **Authentication**: using [passport](http://www.passportjs.org) and [JWT](https://jwt.io) 
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **HTTP request logger**: using [morgan](https://github.com/expressjs/morgan)
- **Docker support**


## Project Structure

```
src\
 |--common\          # Common utilities like enums and types shared across the project
     |--enums\       # Enum definitions used throughout the application
     |--types\       # Custom TypeScript types for typing the application
 |--configs\         # Configuration files (database connection)
 |--libs\swagger\# Swagger configuration and API documentation
 |--errors\      # Centralized error handling definitions
 |--middleware\      # Custom middleware functions for Express.js
 |--modules\         # Feature-specific modules (e.g., auth, users)
     |--auth\        # Authentication logic and routes (e.g., login, register)
     |--users\       # User-related logic and routes
 |--orm\             # TypeORM-related files (entities, migrations, seeders)
     |--entities\    # Database entities mapped to tables using TypeORM
     |--migrations\  # Database migrations to manage schema changes
     |--seeders\     # Seed data for initializing the database
 |--routes\          # API route definitions, organized by version
     |--v1.route.ts  # Version 1 of the API route definitions
 |--uploads\         # Directory for handling file uploads (e.g., images, documents)
 |--utils\           # Utility functions and helper classes
 |--app.ts           # Main Express application setup and configuration
 |--env.ts           # Environment variable configuration handling

```