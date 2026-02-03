//? ifc-loader - definicion
/* Configura el cargador IFC de That Open Engine, indicando manualmente dónde debe obtener el motor WebAssembly (web-ifc) que interpreta los archivos IFC.
 */

//! IMPORTS
// Motor principal de That Open
import * as OBC from '@thatopen/components'

//! EXPORTS
// Función que prepara el sistema de carga de archivos IFC
export const setupIfcLoader = (components: OBC.Components) => {
  // Obtenemos el cargador IFC desde el contenedor de componentes
  const ifcLoader = components.get(OBC.IfcLoader)

  // Esto indica que vamos a definir manualmente de dónde se carga el motor IFC
  ifcLoader.settings.autoSetWasm = false

  // Configuramos la ubicación del motor web-ifc (el parser de archivos IFC)

  ifcLoader.settings.wasm = {
    absolute: true,
    path: 'https://unpkg.com/web-ifc@0.0.71/'
  } // it sets the path from which the base web-ifc code is going to be taken
}
