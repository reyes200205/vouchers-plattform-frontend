# Nuxt Dashboard Template

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Get started with the Nuxt dashboard template with multiple pages, collapsible sidebar, keyboard shortcuts, light & dark mode, command palette and more, powered by [Nuxt UI](https://ui.nuxt.com).

- [Live demo](https://dashboard-template.nuxt.dev/)
- [Documentation](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

<a href="https://dashboard-template.nuxt.dev/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ui.nuxt.com/assets/templates/nuxt/dashboard-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png">
    <img alt="Nuxt Dashboard Template" src="https://ui.nuxt.com/assets/templates/nuxt/dashboard-light.png">
  </picture>
</a>

> The dashboard template for Vue is on https://github.com/nuxt-ui-templates/dashboard-vue.

## Quick Start

```bash [Terminal]
npm create nuxt@latest -- -t ui/dashboard
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=dashboard&repository-url=https%3A%2F%2Fgithub.com%2Fnuxt-ui-templates%2Fdashboard&demo-image=https%3A%2F%2Fui.nuxt.com%2Fassets%2Ftemplates%2Fnuxt%2Fdashboard-dark.png&demo-url=https%3A%2F%2Fdashboard-template.nuxt.dev%2F&demo-title=Nuxt%20Dashboard%20Template&demo-description=A%20dashboard%20template%20with%20multi-column%20layout%20for%20building%20sophisticated%20admin%20interfaces.)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.

---

## Arquitectura Multirrol (Layouts y Rutas Dinámicas)

Este proyecto está configurado para servir como una aplicación integrada con **tres portales/layouts independientes** según la ruta activa. La distribución y redirección de layouts se gestiona automáticamente mediante el middleware global [`layout.global.ts`](file:///c:/Users/jorge/Desktop/8to%20custrimestre/Desarrollo-Software/nuxt-app/app/middleware/layout.global.ts).

### Estructura de Roles y Mapeo de Rutas

1. **Administración General (Gerente)**
   - **Ruta principal**: `/` (junto con rutas generales como `/customers`, `/inbox`, `/settings`)
   - **Layout utilizado**: [`default.vue`](file:///c:/Users/jorge/Desktop/8to%20custrimestre/Desarrollo-Software/nuxt-app/app/layouts/default.vue)
   - **Propósito**: Panel administrativo central para gerentes generales.

2. **Registro de Distribuidores (Coordinador)**
   - **Ruta principal**: `/register-distributors` (y cualquier subruta `/register-distributors/**`)
   - **Layout utilizado**: [`register-distributors.vue`](file:///c:/Users/jorge/Desktop/8to%20custrimestre/Desarrollo-Software/nuxt-app/app/layouts/register-distributors.vue)
   - **Propósito**: Panel para coordinadores destinado al registro y control de distribuidores en la plataforma.

3. **Portal del Distribuidor (Cliente/Distribuidor)**
   - **Ruta principal**: `/distributor-portal` (y cualquier subruta `/distributor-portal/**`)
   - **Layout utilizado**: [`distributor-portal.vue`](file:///c:/Users/jorge/Desktop/8to%20custrimestre/Desarrollo-Software/nuxt-app/app/layouts/distributor-portal.vue)
   - **Propósito**: Portal enfocado en el cliente para el seguimiento de pedidos, catálogo y consulta de clientes asociados.

### Creación de Nuevas Páginas de Rol
Cualquier nueva página creada dentro del directorio `app/pages/register-distributors/` o `app/pages/distributor-portal/` adoptará automáticamente su layout correspondiente gracias al middleware global.

