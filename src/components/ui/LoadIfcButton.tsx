//? LoadIfcButton.tsx - definicion
/* Botón de React que permite al usuario seleccionar un archivo IFC desde su equipo y cargarlo en el visor utilizando el IfcLoader del motor de That Open Engine */

//! IMPORTS
// Nucleo del motor BIM (IfcLoader vive aquí)
import * as OBC from '@thatopen/components'

//! INTERFAZ
// Contenedor principal del motor
interface Props {
  components: OBC.Components
}

//! CODIGO
// Función que se ejecuta al pulsar el botón
export default function LoadIfcButton({ components }: Props) {
  const handleLoadIfc = async () => {
    // Creamos un input de tipo archivo no visible en pantalla
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.ifc'

    // Evento que se dispara cuando el usuario selecciona un archivo
    input.addEventListener('change', async () => {
      // Tomamos el primer archivo seleccionado
      const file = input.files?.[0]
      if (!file) return

      // Leemos el archivo en memoria como ArrayBuffer (binario)
      const buffer = await file.arrayBuffer()
      // Convertimos a Uint8Array (formato que usa el loader)
      const bytes = new Uint8Array(buffer)

      // Obtenemos el IfcLoader desde el contenedor de componentes del motor
      const ifcLoader = components.get(OBC.IfcLoader)
      /* Cargamos el modelo IFC en el visor
      bytes → datos del archivo
      true → generar fragmentos optimizados
      nombre → nombre del modelo dentro del visor */
      await ifcLoader.load(bytes, true, file.name.replace('.ifc', ''))
    })

    // Simulamos un clic para abrir el explorador de archivos del sistema
    input.click()
  }

  return (
    // Botón que el usuario ve en pantalla
    <button className='button-ifc' onClick={handleLoadIfc}>
      Cargar IFC
    </button>
  )
}
