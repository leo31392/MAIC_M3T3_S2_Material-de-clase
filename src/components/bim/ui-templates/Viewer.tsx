//? Viewer.tsx - definicion
/* Componente React que crea, configura y monta el visor 3D de That Open Engine dentro de la aplicación, dejando el motor listo para cargar y visualizar modelos IFC.
1. Crear los componentes de That Open
2. Crear el wordl - (escena, camara, render)
3. Insertar el canvas WebGL dnetro del div componente
4. Inicializar el motor 3D
 */

//! IMPORTS
// Imports React
// useRef - referencia a elemento del DOM
// useEffect - ejecuta codigo cuando aparece el componente en pantalla
import { useEffect, useRef } from 'react'
// That Open Engine
import * as OBC from '@thatopen/components'
// Setup previo
import { createWorld } from '../setup/create-world'
import { setupIfcLoader } from '../setup/ifc-loader'
import { setupHighlighter } from '../setup/highlighter'
import { setupFragmentsManager } from '../setup/fragments-manager'
// Estilos Viewer
import '../../../styles/viewer.css'

//! INTERFAZ
// Avisara cuando el motor components este listo
interface ViewerProps {
  onComponentsReady: (components: OBC.Components) => void
}

//! CODIGO
export default function Viewer({ onComponentsReady }: ViewerProps) {
  // Referencia al div donde meteremos el visor
  const containerRef = useRef<HTMLDivElement | null>(null)
  // Ejecuta codigo cuando se monte el visor el pantalla
  useEffect(() => {
    if (!containerRef.current) return

    // Crear el contenedor principal de componentes de That Open
    // Desde aquí se gestionan todos los sistemas (loader, selección, fragments…)
    const components = new OBC.Components()
    // Crear el mundo (scene + camera + renderer + viewport)
    const { world, viewport } = createWorld(components)

    // Se introduce el setup de TOE
    setupFragmentsManager(components, world)
    setupIfcLoader(components)
    setupHighlighter(components, world)

    // Insertar el viewport (canvas WebGL) dentro del div de React
    containerRef.current.appendChild(viewport)
    // Inicializar componentes
    components.init()

    // Avisar al componente padre (App) de que el motor ya está listo
    onComponentsReady(components)

    // Función de limpieza cuando el componente se desmonta
    return () => {
      // Libera memoria gráfica (WebGL)
      world.renderer?.dispose()
      // Libera todos los módulos del motor
      components.dispose()
    }
  }, [])

  // React solo renderiza este div vacío; dentro metemos el visor manualmente
  return <div ref={containerRef} className='viewer-container' />
}
