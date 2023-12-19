# **_`JView`_** 📊

### _**Introducción 📃**_

El componente `JView` es el componente de listado y tablas dinámicas que se encarga de visualizar datos de manera
estructurada. Su importancia radica en su capacidad para gestionar y mostrar conjuntos de datos complejos en un formato
de listado y tablas, permitiendo una visualización estructurada y personalizable.

El `JView` Ofrece capacidades como paginación, búsqueda, configuración de columnas y manipulación de datos, lo que
resulta fundamental en aplicaciones con gran cantidad de información.

### _**Instalacion del JView ☁️**_

1. Clonaremos el repositorio del JView en nuestra maquina, exactamente :

```
git clone https://github.com/balearesg/jview.git
```

2. Una vez clonado, procederemos a hacer el siguiente comando de git :

```
git fetch
```

3. Luego accederemos en el paquete **library** con el comando :

```
cd project
```

y haremos el siguiente comando :

```
npm install
```

4. Para disponibilizar el **JView** en nuestro proyecto, en el archivo **`packages.json`** de nuestro proyecto
   agregaremos la ruta relativa de donde esta el package.json del **jview** en nuestra estructura de carpetas.

5. Luego en el `**package.json**` del paquete donde incluiremos el **jview** agregaremos la siguiente entrada para
   disponibilizar el `jview` :

```
"libraries": {
	"imports": [
		"jview",
	]
}
```

De esta manera ya instalariamos y disponibilizariamos el componente **JView**.

### _**Importacion 💴**_

```tsx
import { JView } from '@bgroup/jview/jview';
```

### _**Implementacion basica ✒️**_

```jsx
const head = [
    { label: 'Nombre', id: 'name' },
    { label: 'Nombre del negocio', id: 'businessName' },
];

const items = [{ id: 1, name: 'John Doe', businessName: 'ABC Company' }];
export function Table() {
    const value = {
        dataHead: head,
        entries: items,
        keys: head.map((item) => item.id),
        rows: 5,
        total: 150,
        currentPage: 1,
        pagerNext: true,
        title: 'Listado de productos',
        isSearch: true,
    };

    return (
        <div className='table'>
            <JView {...value} />
        </div>
    );
}
```

![Image preview of jview](jview-preview.png)

### _**Funcionalidades clave 🔨**_

-   **Paginación avanzada :** Permite dividir grandes conjuntos de datos en páginas manejables, mejorando la usabilidad
    para el usuario final.
-   **Capacidad de búsqueda :** Facilita la localización rápida de datos específicos dentro de listado o tabla.
    **Personalización de columnas :** Posibilita la configuración de las columnas a mostrar, permitiendo una
    visualización adaptada a las necesidades del usuario.
-   **Interacciones personalizadas :** Ofrece la capacidad de definir acciones específicas, como crear, editar, eliminar
    y otras interacciones, para una gestión avanzada de datos.

### _**Propiedades 📝**_

Esta es una lista de propiedades y sus tipos que se utilizan en el componente :

| Propiedad     | Descripción                                   | Requerido   |
| ------------- | --------------------------------------------- | ----------- |
| `rows`        | Establece el número de filas por página.      | Obligatorio |
| `total`       | Indica el total de elementos en la colección. | Obligatorio |
| `loading`     | Estado de carga de datos.                     | Opcional    |
| `entries`     | Datos a mostrar en la tabla.                  | Obligatorio |
| `row`         | Elemento de fila personalizado.               | Opcional    |
| `header`      | Elemento de encabezado personalizado.         | Opcional    |
| `rowProps`    | Propiedades adicionales para la fila.         | Opcional    |
| `fetching`    | Estado de obtención de datos.                 | Opcional    |
| `pagerNext`   | Elemento de paginación siguiente.             | Opcional    |
| `title`       | Título mostrado sobre la tabla.               | Opcional    |
| `isSearch`    | Habilita la funcionalidad de búsqueda.        | Opcional    |
| `search`      | Configuración y lógica para la búsqueda.      | Opcional    |
| `onPrev`      | Función para retroceder a la página anterior. | Opcional    |
| `onNext`      | Función para avanzar a la siguiente página.   | Opcional    |
| `currentPage` | Página actual.                                | Opcional    |

### _**Propiedades adicionales (Opcionales) **_

#### _**Actions :**_

Permite disponibilizar varias acciones en el listado o tablas (soportar, edit, delete, create, status, export, order)
cada uno de ellos es un objeto.

```jsx
actions: {
	create: {
		label: "Crear item",
		onClick: () => { },
	},
	delete: {
        onClick: () => { },
    },
	edit: {
        url: "your ulr for edit item"
    },
	status: {
        onClick: () => { },
    },
	export: {
        onClick: () => { },
    },
	order: {
        onClick: () => { },
    },
}
```

¡Claro! Aquí está la porción del `readme.md` convertida a una tabla:

| Acción   | Descripción                                                                                                                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `edit`   | recibe la propiedad `url` la cual define la url a la cual se navegará internamente se concadena con el id del item `${your-url}/${item.id}`                                                               |
| `delete` | Configura la acción de eliminación. Si esta propiedad está presente, mostrará un botón con el ícono de eliminar para el elemento correspondiente en la tabla. Se maneja a través de la función `onClick`. |
| `status` | Habilita una acción de cambio de estado. Si está presente, se muestra un interruptor para cambiar el estado del elemento.                                                                                 |
| `export` | Disponibiliza un botón de exportación en el JView.                                                                                                                                                        |
| `order`  | Activa unos botones de orden en el JView para cambios en las filas.                                                                                                                                       |

#### _**`Panel :`**_

Esta propiedad genera un panel arriba en la tabla el cual nosotros podemos ajustar en base a la siguiente estructura,
Ejemplo:

```tsx
panel: {
	tables: head,
	entity: `jview`,
	max: 2,
	isMax: true,
	save: tables => (manager.heads = tables),
},
```

| Propiedad   | Descripción                                                                   | Requerido   | Tipo             |
| ----------- | ----------------------------------------------------------------------------- | ----------- | ---------------- |
| `tables`    | Array de objetos con propiedades label y id representando tablas disponibles. | Obligatorio | Array de objetos |
| `save`      | Función para guardar nueva configuración de tablas.                           | Obligatorio | Función          |
| `max`       | Número máximo permitido de elementos.                                         | Opcional    | Número           |
| `isMax`     | Indicador de si se alcanzó el límite máximo de elementos.                     | Opcional    | Booleano         |
| `selectAll` | Indicador de selección de todos los elementos.                                | Opcional    | Booleano         |
| `entity`    | Nombre o identificador de la entidad relacionada.                             | Obligatorio | Cadena de texto  |

#### _**Search :**_

Esta propiedad configura la lógica para la búsqueda, permitiendo buscar y filtrar elementos.

```tsx
search: {
	onSearch: search,
	onClear: load,
	searchableList: true,
	filter
},
```

| Propiedad        | Descripción                                                                           | Tipo               |
| ---------------- | ------------------------------------------------------------------------------------- | ------------------ |
| `onSearch`       | Función invocada para realizar la búsqueda utilizando la lógica definida en `search`. | Función            |
| `onClear`        | Función para limpiar la búsqueda                                                      | Función            |
| `searchableList` | Booleano que indica si la lista es buscable.                                          | Booleano           |
| `filter`         | Arreglo de objetos que son las opciones de búsqueda.                                  | Arreglo de objetos |

### _**Implementacion 🚀**_

Se definen las propiedades necesarias para configurar el comportamiento y la apariencia de JView. Estas propiedades
pueden incluir datos, acciones y configuraciones de visualización.

#### _**Casos de ejemplo :**_

1. `Configuracion para Buscador :`

```jsx
const head = [
    { label: 'Nombre', id: 'name' },
    { label: 'Nombre del negocio', id: 'businessName' },
];

const items = [
    { id: 1, name: 'John Doe', businessName: 'ABC Company' },
    { id: 2, name: 'Jane Smith', businessName: 'XYZ Corporation' },
];

function handleSearch(params) {
    const { search /* your other properties */ } = params;

    return searchResults;
}

export function Table({ manager }) {
    const value = {
        dataHead: head,
        entries: items,
        keys: head.map((item) => item.id),
        rows: 5,
        total: 150,
        currentPage: 1,
        pagerNext: true,
        title: 'Listado de productos',
        isSearch: true,
        search: {
            onSearch: search,
            searchableList: true,
            filter,
        },
    };

    return (
        <div className='table'>
            <JView {...value} />
        </div>
    );
}
```

En este caso se configuro en el `JView` un buscador que incluye la función onSearch para realizar la búsqueda, la
capacidad de ser buscable (searchableList) y la opcion de agrear un filtro opcinal. A la propiedad **onSearch** se le
puede pasar una funcion personalizable para cubrir los casos de busquedas, en este ejemplo se le paso una funcion
**handleSearch**; Esta función handleSearch recibe un término de búsqueda (searchTerm) y una lista de elementos
(itemList) y devuelve los elementos que coinciden con el término de búsqueda en los campos name o businessName.

2. `Configuracion para Panel :`

```jsx
const head = [
    { label: 'Nombre', id: 'name' },
    { label: 'Nombre del negocio', id: 'businessName' },
];

const items = [
    { id: 1, name: 'John Doe', businessName: 'ABC Company' },
    { id: 2, name: 'Jane Smith', businessName: 'XYZ Corporation' },
];

export function Table() {
    const value = {
        dataHead: heads,
        entries: items,
        keys: head.map((item) => item.id),
        rows: 8,
        total: 100,
        currentPage: 1,
        pagerNext: true,
        title: 'Listado de productos',
        panel: {
            tables: head,
            entity: `jview`,
            max: 2,
            isMax: true,
            save: (tables) => (heads = tables),
        },
    };

    return (
        <div className='table'>
            <JView {...value} />
        </div>
    );
}
```

En este ejemplo configuro un panel para el JView, incluyendo las tablas disponibles, el límite máximo, si se alcanzó ese
límite y una función save para actualizar los encabezados de la tabla.

3. `Configuracion para mas acciones :`

```jsx
const head = [
    { label: 'Nombre', id: 'name' },
    { label: 'Nombre del negocio', id: 'businessName' },
];

const items = [{ label: 'Mi-negocion', id: 'name' }];

export function Table() {
    const value = {
        dataHead: head,
        entries: items,
        keys: head.map((item) => item.id),
        rows: 3,
        total: 70,
        currentPage: 1,
        pagerNext: true,
        title: 'Listado de productos',
        actions: {
            create: {
                //Disponibiliza un boton en el JVIew
                label: 'Crear item',
                onClick: () => {},
            },
            delete: {
                // Disponibiliza un boton de eliminacion en los items del JView
                onClick: () => {},
            },
            edit: {
                url: 'yuor url',
            },
            status: {
                // Disponibiliza un component switch de edicion en el JView
                onClick: () => {},
            },
            export: {
                // Disponibiliza un boton de exportcion en el JView
                onClick: () => {},
            },
            order: {
                // Activa unos botones de orden en el JView para cambios en las filas
                onClick: () => {},
            },
        },
    };

    return (
        <div className='table'>
            <JView {...value} />
        </div>
    );
}
```

Este código implementa el manejos de la propiedad **action** para mostrar una tabla con acciones adicionales
configuradas. Estas acciones permiten que en un objeto para cada accion individual
**`(create, delete, edit, status, export, order)`** podamos definir el funcionamiento de cada una, en este ejemplo
definimos una acción de creación con una etiqueta (label) "Crear item" y una función onClick vacía que el cual podemos
usar para agregar nuestro evento. delete, edit, status, export, order: Definen otras acciones que se pueden realizar en
la tabla.

4. `Configuracion completa de acciones :`

```jsx
export function Table({ manager }) {
    const value = {
        dataHead: manager.heads,
        entries: manager.collection.items,
        keys: manager.heads.map((item) => item.id),
        rows: 5,
        total: 150,
        currentPage: 1,
        pagerNext: true,
        onNext: manager.next,
        onPrev: manager.prev,
        title: 'Listado de productos',
        isSearch: true,
        search: {
            onSearch: manager.search,
            onClear: manager.load,
            searchableList: true,
            filter,
        },
        panel: {
            tables: head,
            entity: `jview`,
            max: 2,
            isMax: true,
            save: (tables) => (manager.heads = tables),
        },
        actions: {
            create: {
                label: 'Crear item',
                onClick: () => {},
            },
            delete: {},
            edit: {},
            status: {},
            export: {},
            order: {},
        },
    };

    return (
        <div className='table'>
            <JView {...value} />
        </div>
    );
}
```

En este ejemplo de implementacion, en el componente **Table** se le paso una _prop_ `manager` que es una instancia de
una clase la cual usamos como controlador principal y se utiliza en el componente Table para proporcionar los datos
necesarios al JView para su representación y funcionalidad. Este es un caso de uso opcional que podemos usar para usar
el `jview` por medio de un controlador y tener en orden nuestro codigo.

### _**`Conclusion`**_ 🏁

`JView` es un componente versátil que proporciona una interfaz interactiva para mostrar y manipular datos tabulares de
manera eficiente en aplicaciones React. Ofrece funcionalidades robustas para la visualización, paginación, búsqueda y
gestión de acciones en tablas y listado de datos.

Puede:

-   Mostrar datos de manera estructurada y amigable al usuario final.
-   Implementar acciones como crear, editar, eliminar y más, proporcionando una experiencia interactiva.
-   Utilizar funciones de búsqueda y filtrado para una navegación eficiente dentro de grandes conjuntos de datos.
-   Controlar la paginación y la visualización de elementos por página, mejorando la usabilidad en aplicaciones con
    grandes volúmenes de información.

Su flexibilidad y facilidad de uso lo convierten en una herramienta poderosa para la presentación de datos tabulares,
ofreciendo una experiencia intuitiva y personalizable para los usuarios finales y simplificando el desarrollo de
aplicaciones con funcionalidades de tabla dinámica.

### _**`CONTRIBUCION `**_ 💝

No dudes en contribuir al desarrollo del componente `JView`. Puede clonar el repositorio, crear una nueva rama para sus
características o correcciones, y enviar una solicitud de extracción.
