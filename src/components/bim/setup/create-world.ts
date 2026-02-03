//? create-world - definicion
/* Es una funcion setup que construye el entorno 3D basico de That Open
1. crea un World (mundo)
2. crea una escena
3. crea una cámara
4. crea un renderer
5. crea un viewport (el elemento HTML donde se dibuja el 3D)
6. añade utilidades (raycaster y grid)
7. devuelve para usarlo en React
*/

//! IMPORTS
// OBC todo lo 3D
import * as OBC from '@thatopen/components'
// Componentes UI - bim-viewport
import * as BUI from '@thatopen/ui'

//! EXPORT
// Exportar funcion para usarla desde Viewer.ts
// Recibe components como argumento
export const createWorld = (components: OBC.Components) => {
  // Crear gestor de mundos  const worlds = components.get(OBC.Worlds)
  const worlds = components.get(OBC.Worlds)
  // Crear el world con 3 peizas tipo
  const world = worlds.create<
    OBC.SimpleScene,
    OBC.OrthoPerspectiveCamera,
    OBC.SimpleRenderer
  >()

  // Crear y configurar la escena
  world.scene = new OBC.SimpleScene(components)
  world.scene.setup() // configuraciones básicas (luces, entorno inicial…)
  world.scene.three.background = null // quitar fondo = transparente

  // Crear el viewport - donde se dibuja el 3D
  /*
  Se crea renderer motor que dibuja la escena y que lo pinte dentro del viewport
  Se crea camara para alternar entre perspectiva y orthogonal
  Resize - funcion para reajustar el visor cuando cambia de tamaño
    cuando hay  cambio resize - se ejecuta de nuevo
  Raycaster - objetos bajo el raton
  Grid - crear grid en espacio 3D
  Devuelve mundo y viewport
  */
  const viewport = BUI.Component.create<BUI.Viewport>(() => {
    return BUI.html`<bim-viewport></bim-viewport>`
  })

  world.renderer = new OBC.SimpleRenderer(components, viewport)

  world.camera = new OBC.OrthoPerspectiveCamera(components)

  const resizeWorld = () => {
    try {
      world.renderer?.resize()
      world.camera.updateAspect()
    } catch (error) {
      console.warn('Resizing the world was not possible')
    }
  }

  viewport.addEventListener('resize', resizeWorld)

  components.get(OBC.Raycasters).get(world)

  components.get(OBC.Grids).create(world)

  return { world, viewport }
}
