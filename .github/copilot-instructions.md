# EduVerse University Management System - AI Coding Guide

## Project Overview

A React-based university management system in early development (Phase 1). Currently implements a public-facing website with landing pages. Future phases will add Admin, Faculty, and Student portals with authentication.

**Current State**: Landing pages complete (Home, Programs, Faculty, About, Contact)  
**Next Phase**: Backend setup with MongoDB, JWT authentication, and role-based access control (see `roadmap.md`)

## Tech Stack

- **Frontend**: React 19, Vite, React Router v7, React Bootstrap 5.3, React Icons
- **Styling**: Bootstrap 5 + custom CSS with CSS variables for theming
- **Package Manager**: npm
- **Dev Server**: `npm run dev` (Vite dev server)
- **Build**: `npm run build` (outputs to `ums/dist/`)
- **Linting**: ESLint 9 with React hooks plugin

## Architecture & Component Structure

### Directory Organization

```
ums/src/
├── Components/
│   ├── Common/          # Shared components (Navbar, Footer)
│   │   └── Navbar/      # Navbar has its own folder with CSS
│   └── Home/            # Page-specific components (HeroSection, FAQ, etc.)
├── Pages/               # Route-level pages (Home.jsx, Programs.jsx, etc.)
├── App.jsx              # Router setup with BrowserRouter
└── main.jsx             # Entry point
```

### Component Patterns

**Pages are Composable**: Pages like `Home.jsx` are composed of multiple smaller components imported from `Components/Home/`. Each section (HeroSection, FAQ, EventsCalendar) is a standalone component.

**Colocation**: Components and their CSS files live together (e.g., `Navbar.jsx` + `Navbar.css`)

**State Management**: Local `useState` hooks only (no Redux yet, despite roadmap - add Redux when backend integration begins)

## Styling Conventions

### Bootstrap Integration

- **Always** import Bootstrap CSS in component files: `import "bootstrap/dist/css/bootstrap.min.css"`
- Use React Bootstrap components (`Container`, `Row`, `Col`, `Button`, `Card`, etc.)
- Prefer Bootstrap utility classes before custom CSS

### Custom Styling

- **Theme Variables**: Use CSS custom properties defined in `App.css`:
  ```css
  var(--university-primary)    // #1e3a8a (dark blue)
  var(--university-secondary)  // #3b82f6 (light blue)
  var(--university-accent)     // #f59e0b (amber)
  ```
- **Gradient Backgrounds**: Primary buttons use gradient: `linear-gradient(135deg, var(--university-primary), var(--university-secondary))`
- **Button Styling**: All buttons have `border-radius: 25px` and transform on hover
- **Cards**: Use `border-radius: 15px`, box-shadow on hover, and transform animations

### Responsive Design

- Mobile-first breakpoints: 576px, 768px, 1200px
- Always test components at mobile sizes
- Section padding reduces from `4rem` (desktop) to `2rem` (mobile)

## Component Documentation Pattern

Every component has **extensive JSX comments** explaining structure:

```jsx
/* 
====================================
SECTION NAME
====================================
Brief description of what this section contains
- Feature 1
- Feature 2
*/
```

**Continue this pattern** for new components - document purpose, props, and major sub-sections.

## Common Component Patterns

### Data Display Components (Programs, Faculty, FAQ)

1. Use `useState` for local data arrays (mock data currently)
2. Implement search/filter functionality with controlled inputs
3. Use `Card` components for list items with hover effects
4. Display "No results found" states with clear actions

### Form Handling

- Use React Bootstrap form components (`Form.Control`, `InputGroup`)
- Handle submission with `async` placeholder functions (e.g., `setTimeout` for demos)
- Show loading states during submission (`isSubmitting` state)

### Icons

- Import specific icons from `react-icons/fa` (Font Awesome)
- Common icons: `FaUniversity`, `FaGraduationCap`, `FaSearch`, `FaPhone`, `FaEnvelope`

## React Router Implementation

- **BrowserRouter** wraps the app in `App.jsx`
- Use `<Link>` from `react-router-dom` for internal navigation
- Use `as={Link}` with React Bootstrap Nav components: `<Nav.Link as={Link} to="/programs">`
- External/anchor links use standard `<a href="#">` tags

## Key Development Notes

### Mobile Menu Pattern

Navbar uses `expanded` state to control mobile collapse:

```jsx
const [expanded, setExpanded] = useState(false);
const handleNavClick = () => setExpanded(false); // Close menu on nav
```

### Smooth Scrolling

- Global `html { scroll-behavior: smooth; }` in `App.css`
- Anchor links to sections use `href="#section-id"`
- Can also scroll programmatically: `document.getElementById('id').scrollIntoView({ behavior: 'smooth' })`

### Preventing Horizontal Scroll

Critical CSS rules in `App.css`:

```css
html,
body {
	overflow-x: hidden;
	width: 100%;
}
*,
*::before,
*::after {
	max-width: 100%;
}
```

**Always** ensure new components don't introduce overflow.

## Future Backend Integration (Phase 2+)

When implementing authentication and backend:

1. Add Redux Toolkit (`@reduxjs/toolkit`) per roadmap
2. Create `services/` folder for API clients (Axios)
3. Add protected routes with role-based components
4. Backend will be Express + MongoDB (see `roadmap.md` for full structure)

## API Data Pattern (Future)

Currently using hardcoded arrays in components. When integrating backend:

```jsx
// Replace this pattern:
const [programs] = useState([hardcodedData]);

// With API calls in useEffect:
useEffect(() => {
	fetchPrograms().then(setPrograms);
}, []);
```

## Commands & Scripts

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## ESLint Rules

- `no-unused-vars`: Errors, but ignores uppercase vars (React component names)
- React Hooks rules enforced via `eslint-plugin-react-hooks`

## Files to Reference

- `roadmap.md` - Full 12-week development plan with feature phases
- `App.css` - Global styles, theme variables, responsive breakpoints
- `Components/Common/Navbar/Navbar.jsx` - Mobile menu pattern
- `Pages/Programs.jsx` - Example of search/filter implementation
- `Components/Home/FAQ.jsx` - Accordion pattern with category filtering
