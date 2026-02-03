//? highlighter - definicion
/* Configura el sistema de selección y resaltado de elementos en el visor 3D, permitiendo que el usuario haga clic en objetos del modelo BIM y estos se destaquen visualmente.
 */

//! IMPORTS
// Núcleo del motor BIM
import * as OBC from '@thatopen/components'
// Componentes de interacción (Highlighter vive aquí)
import * as OBF from '@thatopen/components-front'

//! EXPORTS
export const setupHighlighter = (
  // Recibe el sistema principal del motor
  components: OBC.Components,
  // Recibe el mundo 3D (escena + cámara + renderer)
  world: OBC.World
) => {
  // Obtenemos el sistema de resaltado y selección
  const highlighter = components.get(OBF.Highlighter)
  /* Lo conectamos al mundo 3D para que pueda:
      Detectar clics del usuario
      Saber qué objeto está bajo el ratón
      Aplicar efectos visuales de selección */
  highlighter.setup({ world })
}
