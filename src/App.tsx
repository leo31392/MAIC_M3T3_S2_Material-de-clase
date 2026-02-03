//? App.tsx - definicion
/* Es la pagina web que teniamos antes pero ahora escrita en React 
Se copia el HTML original usando JSX /TSX para interactuar con el DOM

Se añaden className(React) en vez de class(en HTML eran class) */

//! IMPORTS
// Se importan los estilos globales
import './styles/global.css'
// Se importa el Viewer componente que crea el visor 3D y el motor BIM
import Viewer from './components/bim/ui-templates/Viewer'
// Se importa el LoadButton para cargar archivos IFC
import LoadIfcButton from './components/ui/LoadIfcButton'
// Se importa useState React para manejar estado
import { useState } from 'react'
// That Open Engine
import * as OBC from '@thatopen/components'
// Se importa el panel de propriedades
import ItemsDataPanel from './components/ui/ItemsDataPanel'

//! CODIGO
export default function App() {
  // Estado que guardará el sistema de componentes del motor BIM
  // Empieza en null porque el visor aún no está creado
  const [components, setComponents] = useState<OBC.Components | null>(null)

  return (
    <div className='app'>
      <aside className='sidebar' id='sidebar'>
        <img
          className='sidebar_logo'
          src='/assets/ZIGURAT_LOGO.png'
          alt='logo zigurat'
        />

        <nav>
          <ul className='sidebar_nav'>
            <li>
              <a href='#'>NOMBRE GRUPO</a>
            </li>
            <li>
              <a href='#'>USUARIO1</a>
            </li>
            <li>
              <a href='#'>ACERCA DE</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Zona principal de contenido */}
      <main className='content' id='content'>
        {/* Cabecera superior */}
        <header className='header'>
          <h2 className='title' id='title'>
            ZIGURAT PROYECTO CLASE
          </h2>

          {/* Solo mostramos el botón si el visor ya existe */}
          {components && <LoadIfcButton components={components} />}
        </header>

        {/* Contenedor del visor y paneles BIM */}
        <div className='viewer-placeholder'>
          {/* Viewer crea el motor BIM y nos lo devuelve mediante setComponents */}
          <Viewer onComponentsReady={setComponents} />
          {/* Panel de propiedades recibe el mismo motor para leer la selección */}
          <ItemsDataPanel components={components} />
        </div>
      </main>
    </div>
  )
}
