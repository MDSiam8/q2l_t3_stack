# Quest2Learn: 3D Visualization Lab

## Introduction

Quest2Learn, utilizing the 3D Visualization Lab, is an innovative project built on the T3 Stack with `create-t3-app`. This project is revolutionizing educational experiences through augmented reality and immersive 3D environments, aiming to enhance experiential learning for students in lab science education.

## Project Overview

Quest2Learn's 3D Visualization Lab is an interactive platform that integrates augmented reality and 3D modeling to create virtual lab environments. This initiative allows students to engage with 3D models and simulations, providing hands-on interaction with scientific apparatus and experiments in a rich, immersive learning context.

### Key Technologies

- **React3Fiber**: For rendering 3D graphics within a React framework. [Learn more about React3Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction).
- **Next.js**: A framework for building server-side rendering and static web applications. [Next.js Documentation](https://nextjs.org).
- **NextAuth.js**: Authentication in Next.js apps. [NextAuth.js Documentation](https://next-auth.js.org).
- **Prisma**: An open-source database toolkit. [Prisma Documentation](https://prisma.io).
- **Tailwind CSS**: A utility-first CSS framework. [Tailwind CSS Documentation](https://tailwindcss.com).
- **tRPC**: End-to-end typesafe APIs made easy. [tRPC Documentation](https://trpc.io).

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Getting Started

To get started with the Quest2Learn: 3D Visualization Lab, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MDSiam8/q2l_t3_stack.git
   ```
2. **Navigate to the Project Directory**
   ```bash
   cd q2l_t3_stack
   ```
3. **Setup Environment Variables**
- Copy the `.env.example` file to a new file named `.env`.
- Modify the `.env` file to include your specific environment variables. 

4. **Run the Application**
   ```bash
   npm run dev
   ```

These steps will set up your local development environment. Be sure to replace the values in the `.env` file with your own settings.

## Important Note for Contributors

Before creating a pull request to the `main` branch, please follow these important steps:

1. **Build the Project**
   - Run the following command to build the project:
     ```bash
     npm run build
     ```
   - This step is crucial to ensure that the project compiles without errors.

2. **Verify Error-Free Build**
   - After running the build, verify that there are no compilation errors.

