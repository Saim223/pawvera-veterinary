# Pawvera — Veterinary Care Platform (Frontend)

A frontend concept for a veterinary healthcare platform connecting pet owners with
veterinary doctors and hospitals: doctor discovery, appointment booking, online video
consultation, pet health records, and an emergency care finder. Built as a design/demo
frontend with realistic mock data — there is no backend.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first theme in `src/index.css`)
- Framer Motion for animation (scroll reveals, the hero's 3D carousel, counters, charts)
- React Router for client-side routing
- Lucide React for icons

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build (runs tsc -b then vite build)
```

## Project structure

```
src/
  components/
    ui/          reusable primitives (Button, Reveal, TiltCard, PersonMark, ...)
    layout/      Navbar, Footer, page Layout, scroll management
    hero/        hero 3D image carousel + floating appointment widget
    doctors/     doctor directory, filters, doctor card
    charts/      small SVG chart primitives (line, bar, circular progress)
    sections/    one file per homepage section
    appointments/
  data/          typed mock data (doctors, testimonials, health topics, dashboard demo data)
  pages/         routed pages (Doctors, DoctorProfile, Appointments, Consultation, ...)
  lib/           small hooks and utilities (count-up, icon map)
```

## Notes

- The three images in `pics/hero/` are used throughout the hero's rotating background;
  optimized WebP/JPEG variants are generated into `public/images/hero/`.
- Statistics presented as "illustrative" or "demo data" in the UI are explicitly not
  real-world verified figures.
- The previous single-clinic static site is preserved, unused, in `legacy-static-site/`.
