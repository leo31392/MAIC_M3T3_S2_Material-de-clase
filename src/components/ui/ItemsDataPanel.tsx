//? ItemsDataPanel.ts - definicion
/* Componente de React que crea e inserta manualmente un panel BIM dentro del DOM de React para mostrar las propiedades de los elementos seleccionados en el visor. */

//! IMPORTS
// Hooks de React para ciclo de vida y referencias DOM
import { useEffect, useRef } from 'react'
// Núcleo del motor BIM
import * as OBC from '@thatopen/components'
// Componentes de interacción (Highlighter)
import * as OBF from '@thatopen/components-front'
// Tablas de propiedades BIM ya preparadas
import * as CUI from '@thatopen/ui-obc'

//! INTERFAZ
interface Props {
  // Motor BIM (puede ser null mientras carga)
  components: OBC.Components | null
}

//! EXPORTS
export default function ItemsDataPanel({ components }: Props) {
  // Referencia a un div real del DOM donde vamos a incrustar el panel BIM
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Si aún no tenemos motor o el div no está montado, no hacemos nada
    if (!components || !containerRef.current) return

    // Obtenemos el sistema que controla la selección de elementos en el visor
    const highlighter = components.get(OBF.Highlighter)

    // Creamos un contenedor UI de That Open (NO es JSX, es un Web Component real)
    const section = document.createElement('bim-panel-section')
    section.setAttribute('label', 'Selection Data') // Título del panel
    section.setAttribute('fixed', '') // Hace que el panel sea fijo

    /* Creamos la tabla oficial de propiedades BIM
    propsTable → elemento visual
    updatePropsTable → función para actualizar qué elementos muestra */
    const [propsTable, updatePropsTable] = CUI.tables.itemsData({
      components,
      // Comienza vacía (sin selección)
      modelIdMap: {}
    })

    // Insertamos la tabla dentro del panel
    section.appendChild(propsTable)

    // React inserta este panel BIM dentro de su propio div
    containerRef.current.appendChild(section)

    // Función que actualiza la tabla cuando cambia la selección
    const refresh = () => {
      const selection = highlighter.selection.select
      if (OBC.ModelIdMapUtils.isEmpty(selection)) return
      updatePropsTable({ modelIdMap: selection })
    }

    // Cuando el usuario selecciona algo en el visor → actualizamos tabla
    highlighter.events.select.onHighlight.add(refresh)
    highlighter.events.select.onClear.add(() =>
      updatePropsTable({ modelIdMap: {} })
    )

    // Limpieza cuando el componente se desmonta o cambian los components
    return () => {
      section.remove()
      highlighter.events.select.onHighlight.remove(refresh)
    }
  }, [components]) // Se ejecuta cuando el motor BIM está listo o cambia

  // React solo pinta este div vacío; dentro metemos el panel BIM manualmente
  return <div ref={containerRef} className='properties-panel' />
}
