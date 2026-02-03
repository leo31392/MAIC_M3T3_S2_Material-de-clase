//? custom-ements.d.ts - definicion
/* Informacion para TypeScript
"Oye React y Typescript estas etiquetas existen y son validas"
 */

export {} //convierte el archivo en un módulo

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Acepta cualquier tipo de dato no nos complicamos
      'bim-viewport': any
      'bim-grid': any
    }
  }
}
