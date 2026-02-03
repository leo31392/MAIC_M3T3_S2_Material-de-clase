//? fragments-manager - definicion
/* Configura el sistema de fragments de That Open Engine, que optimiza la visualización de modelos IFC usando culling y LOD para mejorar el rendimiento 3D.
 */

//! IMPORTS
// Motor principal de That Open
import * as OBC from '@thatopen/components'

//! EXPORTS
// Función que prepara el sistema de fragments
export const setupFragmentsManager = (
  // Contenedor principal del motor
  components: OBC.Components,
  // Mundo 3D (escena + cámara + renderer)
  world: OBC.SimpleWorld<
    OBC.SimpleScene,
    OBC.OrthoPerspectiveCamera,
    OBC.SimpleRenderer
  >
) => {
  // Obtenemos el gestor de fragments (optimización de geometría)
  const fragments = components.get(OBC.FragmentsManager)
  // Inicializamos el sistema indicando dónde está el Web Worker
  // El worker se encarga de procesar geometría en segundo plano (mejor rendimiento)
  fragments.init('/node_modules/@thatopen/fragments/dist/Worker/worker.mjs')

  // Evento que se ejecuta cuando se añade un modelo nuevo al sistema de fragments
  fragments.list.onItemSet.add(async ({ value: model }) => {
    // Limpiamos la caché de búsquedas de elementos
    // Así futuras búsquedas incluirán también este nuevo modelo
    const finder = components.get(OBC.ItemsFinder)
    for (const [, query] of finder.list) {
      query.clearCache()
    }

    // Asociamos la cámara al modelo
    // Esto permite que el modelo sepa qué partes debe mostrar o ocultar (culling)
    model.useCamera(world.camera.three)

    // Añadimos el objeto 3D del modelo a la escena del mundo
    world.scene.three.add(model.object)

    // Muy importante: actualizamos el sistema de fragmentos
    // Esto recalcula qué partes del modelo deben renderizarse
    await fragments.core.update(true)
  })

  // Evento que se dispara cuando el usuario deja de mover la cámara
  world.camera.controls.addEventListener('rest', async () => {
    // Al parar la cámara, se recalculan culling y niveles de detalle (LOD)
    await fragments.core.update(true)
  })
}
