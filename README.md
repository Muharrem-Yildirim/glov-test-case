# Description

This project is test case for glov. I have used TypeScript, Node.js, Next.js, Tailwind CSS, Docker and Socket.io in this project.

# How to deploy?

1. Install docker
2. Copy .env.example to .env in back and front folders
3. Fill up .env files
4. Run docker-compose up
5. Visit http://localhost:3000

# How to run tests?

```
cd front
npm run test # for unit
npm run test:e2e # for e2e
```

# Project Dependencies

## For Front-End:

| Package                    | Version  | Description                                                                  |
| -------------------------- | -------- | ---------------------------------------------------------------------------- |
| `@radix-ui/react-dialog`   | ^1.1.1   | Provides components for creating dialog (modal) windows.                     |
| `@radix-ui/react-popover`  | ^1.1.1   | Provides components for creating popovers.                                   |
| `@radix-ui/react-slot`     | ^1.1.0   | Allows for the composition of components with slots.                         |
| `class-variance-authority` | ^0.7.0   | A utility for managing conditional class names.                              |
| `clsx`                     | ^2.1.1   | A utility for conditionally joining class names.                             |
| `cmdk`                     | ^1.0.0   | A command menu component for React applications.                             |
| `lucide-react`             | ^0.429.0 | A collection of icons for React.                                             |
| `next`                     | 14.2.5   | The Next.js framework for server-side rendering and static site generation.  |
| `react`                    | ^18      | A library for building user interfaces.                                      |
| `react-dom`                | ^18      | The DOM-specific methods for React.                                          |
| `socket.io-client`         | ^4.7.5   | A client library for real-time, bidirectional communication with WebSockets. |
| `tailwind-merge`           | ^2.5.2   | A utility for merging Tailwind CSS classes.                                  |
| `tailwindcss-animate`      | ^1.0.7   | Provides animations for Tailwind CSS.                                        |

### Dev Dependencies

| Package              | Version | Description                                                       |
| -------------------- | ------- | ----------------------------------------------------------------- |
| `@types/node`        | ^20     | TypeScript definitions for Node.js.                               |
| `@types/react`       | ^18     | TypeScript definitions for React.                                 |
| `@types/react-dom`   | ^18     | TypeScript definitions for React DOM.                             |
| `eslint`             | ^8      | A tool for identifying and fixing problems in JavaScript code.    |
| `eslint-config-next` | 14.2.5  | ESLint configuration for Next.js projects.                        |
| `postcss`            | ^8      | A tool for transforming CSS with JavaScript plugins.              |
| `tailwindcss`        | ^3.4.1  | A utility-first CSS framework.                                    |
| `typescript`         | ^5      | A typed superset of JavaScript that compiles to plain JavaScript. |

## For Back-End:

| Package            | Version | Description                                                           |
| ------------------ | ------- | --------------------------------------------------------------------- |
| `@types/socket.io` | ^3.0.2  | TypeScript definitions for Socket.IO.                                 |
| `dotenv`           | ^16.4.5 | Loads environment variables from a `.env` file.                       |
| `express`          | ^4.19.2 | A web framework for Node.js.                                          |
| `socket.io`        | ^4.7.5  | A library for real-time, bidirectional communication with WebSockets. |

### Dev Dependencies

| Package                            | Version  | Description                                                                                 |
| ---------------------------------- | -------- | ------------------------------------------------------------------------------------------- |
| `@types/express`                   | ^4.17.21 | TypeScript definitions for Express.                                                         |
| `@typescript-eslint/eslint-plugin` | ^5.4.0   | ESLint plugin for TypeScript.                                                               |
| `@typescript-eslint/parser`        | ^5.4.0   | TypeScript parser for ESLint.                                                               |
| `eslint`                           | ^8.3.0   | A tool for identifying and fixing problems in JavaScript code.                              |
| `nodemon`                          | ^3.1.4   | A tool for automatically restarting the Node.js application when file changes are detected. |
| `ts-node`                          | ^10.9.2  | A TypeScript execution engine for Node.js.                                                  |
| `typescript`                       | ^4.5.2   | A typed superset of JavaScript that compiles to plain JavaScript.                           |
