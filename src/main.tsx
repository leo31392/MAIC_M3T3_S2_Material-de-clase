//? main.tsx - definicion
/* Archivo de arranque que inicializa React y el sistema de Web Components de That Open, y monta la aplicación principal dentro del HTML.
1. Donde poner la app (#root)
2. Qué app poner */

//! IMPORTS
// Se importa  ReactDOM para pintar en el navehador
import ReactDOM from 'react-dom/client'
// Se importa el componente principal de la aplicación
import App from './App'
// Se importa Web Components de That Open Engine
import * as BUI from '@thatopen/ui'
// Inicializa el gestor de componentes UI de That Open
// Esto es necesario para que <bim-*> funcione correctamente
BUI.Manager.init()

//! CODIGO
/* 
1. ReactDOM.createRoot - donde va a localizar React
2. document.getElementById('root')! - en el root
3. .render - que va a dibujar (la App) 
4. StrictMode es un apoyo
*/
// Monta la aplicación React dentro del div #root del HTML
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
