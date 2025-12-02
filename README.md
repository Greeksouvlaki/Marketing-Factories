# Marketing Factories - Production Plan

This is an interactive 3D website built with React, Three.js, and Tailwind CSS.
It presents the production plan for the "Marketing Factories" podcast mission in Belgium.

## Features

- **3D Scrolling Interface**: Navigate through the dossier by scrolling.
- **Interactive Blueprints**: Drag and drop elements in the layout strategy section.
- **Responsive Design**: Adapts to different screen sizes (best viewed on desktop).
- **Atmospheric Visuals**: Gritty, detective-style aesthetic with 3D depth.

## Tech Stack

- **React**: UI Framework
- **Three.js / React Three Fiber**: 3D Rendering
- **React Three Drei**: 3D Helpers (ScrollControls, Html, Environment)
- **Framer Motion**: Animations and Drag Interactions
- **Tailwind CSS**: Styling

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

## Project Structure

- `src/App.jsx`: Main entry point, Canvas setup.
- `src/Scene.jsx`: 3D Scene configuration, lighting, and scroll logic.
- `src/components/`: Individual slide components (Title, Video, Audio, Layout, Summary).
- `src/index.css`: Global styles and Tailwind imports.
