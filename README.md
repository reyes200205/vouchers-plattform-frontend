# Vouchers Platform Frontend

Plataforma de administración y portal multirrol construida con **Nuxt 4** y **Nuxt UI**.

---

## Arquitectura Multirrol (Layouts y Rutas Dinámicas)

El proyecto está estructurado como una aplicación unificada con **tres secciones y layouts independientes** según la ruta del usuario. La carga y cambio de layouts se gestiona automáticamente mediante el middleware global [`layout.global.ts`](./app/middleware/layout.global.ts).

### Estructura de Carpetas, Archivos y Rutas

#### 1. Administración General (Gerencia)
- **Ruta**: `/general` (con subrutas como `/general/customers`, `/general/inbox`, `/general/settings`)
- **Layout**: [`general.vue`](./app/layouts/general.vue)
- **Páginas**: Ubicadas en el directorio `app/pages/general/`
- **Propósito**: Panel de administración central para gerencia general.

#### 2. Registro de Distribuidores (Coordinador)
- **Ruta**: `/register-distributors` (y cualquier subruta `/register-distributors/**`)
- **Layout**: [`register-distributors.vue`](./app/layouts/register-distributors.vue)
- **Páginas**: Ubicadas en el directorio `app/pages/register-distributors/`
- **Propósito**: Panel utilizado por los coordinadores para el registro y gestión de distribuidores.

#### 3. Portal del Distribuidor (Clientes)
- **Ruta**: `/distributor-portal` (y cualquier subruta `/distributor-portal/**`)
- **Layout**: [`distributor-portal.vue`](./app/layouts/distributor-portal.vue)
- **Páginas**: Ubicadas en el directorio `app/pages/distributor-portal/`
- **Propósito**: Portal orientado al distribuidor/cliente para control de pedidos, catálogos e información asociada.

---

### Redirección Automática en la Raíz
El archivo de página principal [`index.vue`](./app/pages/index.vue) incluye un middleware inline que redirige inmediatamente al usuario de la raíz `/` a la sección de administración `/general`.

### Creación de Nuevas Páginas de Rol
Cualquier archivo de página `.vue` nuevo que agregues dentro de las carpetas correspondientes de `app/pages/` heredará automáticamente su respectivo layout gracias al middleware:
- Un archivo en `app/pages/general/nuevo.vue` usará el layout de Gerencia.
- Un archivo en `app/pages/register-distributors/nuevo.vue` usará el layout de Coordinador.
- Un archivo en `app/pages/distributor-portal/nuevo.vue` usará el layout de Distribuidor.

---

## Configuración y Desarrollo

### Instalar dependencias
```bash
pnpm install
```

### Iniciar Servidor de Desarrollo
Para iniciar la aplicación localmente en `http://localhost:3000`:
```bash
pnpm dev
```

### Compilar para Producción
Para compilar el proyecto optimizado:
```bash
pnpm build
```

Para previsualizar la compilación de producción localmente:
```bash
pnpm preview
```
