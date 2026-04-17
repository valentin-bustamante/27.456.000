# Ñetflix - Gestor de películas y series

## Integrantes
- Valentín Bustamante
- Fabrizio Broll
- Lucas Ortiz
- Gastón Berhau

## Descripción del proyecto
Ñetflix es una aplicación en React para gestionar películas y series personales. Permite:
- agregar nuevas películas o series
- marcar como vistas o por ver
- editar datos
- eliminar con confirmación
- filtrar por título, director, género y tipo
- ordenar por año y rating, ascendente o descendente
- mostrar dos listas separadas: "Por ver" y "Vistos"
- guardar todos los datos en `localStorage` para mantenerlos después de recargar la página

## Estructura principal del proyecto
- `src/main.jsx`: punto de entrada de la aplicación (equivalente al `index.js` de un proyecto React tradicional).
- `src/App.jsx`: componente raíz que renderiza `Home`.
- `src/index.css`: estilos globales y variables de diseño.
- `package.json`: dependencias del proyecto y comandos disponibles.
- `src/pages/home/home.jsx`: página principal de la app con la lógica de CRUD, filtros, búsqueda y conteos.
- `src/components/`: componentes reutilizables como `SearchBar`, `FilterMovie`, `CounterStats`, `MovieForm`, `ConfirmDialog`, `ListSection`, `Cards` y más.

## Cómo ejecutar el proyecto
### Requisitos
- Node.js instalado
- Navegador moderno

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/valentin-bustamante/27.456.000.git
   ```
2. Entrar en la carpeta del proyecto:
   ```bash
   cd 27456000
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```
4. Iniciar la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```
5. Abrir el navegador en la dirección que muestra Vite (`localhost:5173` por defecto).

## Funcionalidades implementadas
- Agregar, editar y eliminar películas/series.
- Marcar ítems como vistos o por ver.
- Buscar por título o director.
- Filtrar por género y por tipo (película/serie), con opción "Todos".
- Ordenar resultados por año o rating, en orden ascendente o descendente.
- Contadores de total, vistos, por ver y por género.
- Dos listas separadas: contenido por ver y contenido visto.
- Mensaje cuando una lista está vacía o no hay resultados tras aplicar filtros.
- Persistencia de datos en `localStorage`.

## Archivos importantes
- `src/main.jsx`: inicializa React y monta el componente `App`.
- `src/App.jsx`: renderiza la página `Home`.
- `src/pages/home/home.jsx`: incluye el estado principal de la aplicación, los filtros, el formulario y la lógica de guardado en `localStorage`.
- `src/components/Form/Form.jsx`: formulario reutilizable para agregar o editar películas/series.
- `src/components/FilterMovie/FilterMovie.jsx`: opciones de filtro y ordenamiento.
- `src/components/CounterStats/CounterStats.jsx`: visualiza los contadores principales y los totales por género.

## Nota sobre la consigna
Este proyecto usa Vite con archivos `.jsx`; aunque la consigna menciona `index.js`, en este repo el equivalente es `src/main.jsx`.

## Tablero Trello
- https://trello.com/b/29cyiWse/27456000

## Contacto docente
- Agustín: guillermo.chiarotto@est.fi.uncoma.edu.ar
- Lucas: lucas.margni@est.fi.uncoma.edu.ar
