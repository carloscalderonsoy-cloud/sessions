# Lumo Entretenimiento - Landing Page PRD

## Original Problem Statement
Diseñar una landing page profesional y dinámica para Lumo Entretenimiento, una agencia integral de producción musical, distribución y desarrollo artístico. El objetivo principal es establecer a Lumo como el socio estratégico definitivo para artistas que buscan profesionalizar su carrera.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn/UI
- **Backend**: FastAPI + MongoDB
- **Design System**: Dark Mode (Carbono #0A0A0A, Verde Neón #CCFF00, Blanco)
- **Typography**: Archivo Black (headings), Inter (body)

## User Personas
1. **Artistas Emergentes**: Músicos nuevos que buscan lanzar su primera música profesionalmente
2. **Artistas Establecidos**: Músicos con experiencia que buscan el siguiente nivel
3. **Bandas/Grupos**: Colectivos musicales buscando producción y management

## Core Requirements
- Hero Section con video de fondo
- Sección de servicios (Producción, Distribución, Marketing, Desarrollo)
- Paquetes de precios comparativos
- Sección de artistas/casos de éxito
- Formulario de contacto funcional
- Diseño responsive (mobile-first)
- Integración con redes sociales
- Botón flotante de WhatsApp

## What's Been Implemented

### Phase 1 - MVP (COMPLETADO)
- Hero Section con video de fondo cinematográfico (mp4 loop)
- Navegación fija con scroll suave y menú móvil
- Sección "Quiénes Somos" con estadísticas (+200, +50, +1M)
- Sección de 4 servicios integrales (Producción, Distribución, Marketing, Desarrollo)
- Sección de infraestructura y alianza con Buffalo Azul Studios
- 3 paquetes de precios (Emergentes $22K, Establecidos $35K, Completo $55K)
- Tabla comparativa de ahorro vs modelo tradicional
- Sección de artistas (Costel, Tenampa Brass Band + 6 más)
- Formulario de contacto funcional (modal + footer)
- Backend API para almacenar contactos en MongoDB
- Diseño Dark Mode con paleta Carbono/Verde Neón/Blanco
- Responsive design completo
- Botón flotante de WhatsApp
- Links a redes sociales (Instagram, YouTube, TikTok, Facebook)

### Phase 2 - Fixes (Apr 2026, COMPLETADO)
- Corregido: Video de fondo no mostraba (CSS faltante para hero-section, hero-video-container, hero-overlay)
- Corregido: Estadísticas vacías restauradas (+200, +50, +1M)
- Corregido: CSS faltantes (nav-fixed, services-grid, pricing-grid, comparison-table, social-icon)
- Corregido: Bug del modal overlay que impedía clicks en botón enviar
- Agregado: Botón flotante de WhatsApp
- Corregido: Accesibilidad del diálogo (DialogDescription)
- Corregido: Lista de Buffalo Azul (orden checkmark/texto)

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/contact` - Crear contacto/aplicación
- `GET /api/contacts` - Listar contactos (admin)

## Prioritized Backlog

### P1 (Next)
- Dashboard de administración para ver/gestionar contactos
- Integración con email (notificaciones de nuevas aplicaciones)
- Galería de videos/trabajos realizados

### P2 (Future)
- Sistema de citas/agenda
- Portal de artistas (login)
- Integración con Spotify/Apple Music para mostrar estadísticas
- Blog/noticias de la industria
- Analytics para tracking de conversiones
