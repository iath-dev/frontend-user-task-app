This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# User Task Manager

Aplicación para gestión de usuarios y tareas desarrollada con Next.js, TypeScript y Sass.

## Características

- Listado de usuarios con detalles
- Visualización de tareas por usuario
- Diseño responsive para móviles y tablets
- Estado global con Zustand

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/inetum/user-task-manager.git
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno
   Crear archivo `.env.local` basado en `.env.example`

4. Iniciar servidor de desarrollo

```bash
npm run dev
```

Acceder a [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del proyecto

- `src/app`: Páginas y layout principal
- `src/components`: Componentes reutilizables
- `src/hooks`: Custom hooks
- `src/styles`: Estilos globales y por componente
- `src/store`: Gestión de estado global

## Variables SCSS

El proyecto utiliza variables Sass para colores, tamaños y breakpoints definidos en `src/styles/_variables.scss`.

## Despliegue

El despliegue más sencillo es mediante [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
