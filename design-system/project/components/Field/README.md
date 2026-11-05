# Field

Campo de formulario recto con etiqueta condensada en mayúsculas encima y borde `ink` de 1,5px.

- **Provee:** `label` con `for`, `id` estable, `autocomplete` y `required` donde aplique. Tipos: texto, correo, `select` y `textarea` (150px mínimo).
- Error: `data-invalid` en el contenedor (borde `error` de 2px) y un `p.pn-field-error` que diga cómo corregir ("Revisa el correo: parece incompleto"). Foco: `focus-ring`.
- Sin placeholders como etiqueta. Dos campos por fila como máximo (uno bajo `bp-sm`).
