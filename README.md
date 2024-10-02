# **_`JView`_** 📊

### _**Introduction 📃**_

The `JView` component is a dynamic listing and table component designed to visualize data in a structured manner. Its
importance lies in its ability to manage and display complex datasets in a listing and table format, allowing for
structured and customizable visualization.

The `JView` offers capabilities such as pagination, searching, column configuration, and data manipulation, which are
essential in applications with large amounts of information.

### _**Installation of JView ☁️**_

1. We will clone the `JView` repository to our machine as follows:

```
git clone https://github.com/balearesg/jview.git
```

2. Once cloned, we will proceed to run the following git command:

```
git fetch
```

3. Next, we will navigate to the **library** package with the command:

```
cd project
```

and run the following command:

```
npm install
```

4. To make **JView** available in our project, in the **`package.json`** file of our project, we will add the relative
   path to where the `package.json` of **jview** is located in our folder structure.

5. Then, in the `**package.json**` of the package where we will include **jview**, we will add the following entry to
   make `jview` available:

```
"libraries": {
	"imports": [
		"jview",
	]
}
```

This way, we will have installed and made the **JView** component available.

### _**Import 💴**_

```tsx
import { JView } from '@bgroup/jview/jview';
```

### _**Basic Implementation ✒️**_

```jsx
const head = [
	{ label: 'Name', id: 'name' },
	{ label: 'Business Name', id: 'businessName' },
];

const items = [{ id: 1, name: 'John Doe', businessName: 'ABC Company' }];
export function Table() {
	const value = {
		dataHead: head,
		entries: items,
		keys: head.map(item => item.id),
		rows: 5,
		total: 150,
		currentPage: 1,
		pagerNext: true,
		title: 'Product Listing',
		isSearch: true,
	};

	return (
		<div className="table">
			<JView {...value} />
		</div>
	);
}
```

![Image preview of jview](jview-preview.png)

### _**Key Features 🔨**_

-   **Advanced Pagination:** Allows for breaking large datasets into manageable pages, improving usability for the end
    user.
-   **Search Capability:** Facilitates quick location of specific data within a listing or table.
-   **Column Customization:** Enables configuration of which columns to display, allowing for a view tailored to user
    needs.
-   **Custom Interactions:** Provides the ability to define specific actions such as create, edit, delete, and other
    interactions for advanced data management.

### _**Properties 📝**_

Here is a list of properties and their types used in the component:

| Property      | Description                                            | Required |
| ------------- | ------------------------------------------------------ | -------- |
| `rows`        | Sets the number of rows per page.                      | Required |
| `total`       | Indicates the total number of items in the collection. | Required |
| `loading`     | Data loading state.                                    | Optional |
| `entries`     | Data to display in the table.                          | Required |
| `row`         | Custom row element.                                    | Optional |
| `header`      | Custom header element.                                 | Optional |
| `rowProps`    | Additional properties for the row.                     | Optional |
| `fetching`    | Data fetching state.                                   | Optional |
| `pagerNext`   | Next pagination element.                               | Optional |
| `title`       | Title displayed above the table.                       | Optional |
| `isSearch`    | Enables search functionality.                          | Optional |
| `search`      | Configuration and logic for searching.                 | Optional |
| `onPrev`      | Function to go back to the previous page.              | Optional |
| `onNext`      | Function to advance to the next page.                  | Optional |
| `currentPage` | Current page.                                          | Optional |

### _**Additional Properties (Optional)**_

#### _**Actions:**_

Allows for the provision of various actions in the listing or tables (support, edit, delete, create, status, export,
order); each is an object.

```jsx
actions: {
	create: {
		label: "Create Item",
		onClick: () => { },
	},
	delete: {
        onClick: () => { },
    },
	edit: {
        url: "your url for edit item"
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

#### _**Panel:**_

This property generates a panel above the table that we can adjust based on the following structure. Example:

```tsx
panel: {
	tables: head,
	entity: `jview`,
	max: 2,
	isMax: true,
	save: tables => (manager.heads = tables),
},
```

| Property    | Description                                                                  | Required | Type             |
| ----------- | ---------------------------------------------------------------------------- | -------- | ---------------- |
| `tables`    | Array of objects with label and id properties representing available tables. | Required | Array of objects |
| `save`      | Function to save new table configuration.                                    | Required | Function         |
| `max`       | Maximum number of allowed items.                                             | Optional | Number           |
| `isMax`     | Indicator of whether the maximum limit of items has been reached.            | Optional | Boolean          |
| `selectAll` | Indicator for selecting all items.                                           | Optional | Boolean          |
| `entity`    | Name or identifier of the related entity.                                    | Required | String           |

#### _**Search:**_

This property configures the logic for searching, allowing for element search and filtering.

```tsx
search: {
	onSearch: search,
	onClear: load,
	searchableList: true,
	filter
},
```

| Property         | Description                                                                 | Type             |
| ---------------- | --------------------------------------------------------------------------- | ---------------- |
| `onSearch`       | Function invoked to perform the search using the logic defined in `search`. | Function         |
| `onClear`        | Function to clear the search                                                | Function         |
| `searchableList` | Boolean indicating if the list is searchable.                               | Boolean          |
| `filter`         | Array of objects that are the search options.                               | Array of objects |

### _**Implementation 🚀**_

The necessary properties are defined to configure the behavior and appearance of JView. These properties may include
data, actions, and visualization configurations.

#### _**Example Cases:**_

1. **Configuration for Searcher:**

```jsx
const head = [
	{ label: 'Name', id: 'name' },
	{ label: 'Business Name', id: 'businessName' },
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
		keys: head.map(item => item.id),
		rows: 5,
		total: 150,
		currentPage: 1,
		pagerNext: true,
		title: 'Product Listing',
		isSearch: true,
		search: {
			onSearch: search,
			searchableList: true,
			filter,
		},
	};

	return (
		<div className="table">
			<JView {...value} />
		</div>
	);
}
```

In this case, a search function is configured in the `JView`, including the `onSearch` function to perform the search,
the ability to be searchable (`searchableList`), and the option to add an optional filter. The **onSearch** property can
be passed a customizable function to handle search cases. In this example, a function **handleSearch** is provided; this
function receives a search term and a list of items and returns the items that match the search term in the fields
`name` or `businessName`.

2. **Configuration for Panel:**

```jsx
const head = [
	{ label: 'Name', id: 'name' },
	{ label: 'Business Name', id: 'businessName' },
];

const items = [
	{ id: 1, name: 'John Doe', businessName: 'ABC Company' },
	{ id: 2, name: 'Jane Smith', businessName: 'XYZ Corporation' },
];

export function Table() {
	const value = {
		dataHead: heads,
		entries: items,
		keys: head.map(item => item.id),
		rows: 8,
		total: 100,
		currentPage: 1,
		pagerNext: true,
		title: 'Product Listing',
		panel: {
			tables: head,
			entity: `jview`,
			max: 2,
			isMax: true,
			save: tables => (manager.heads = tables),
		},
	};

	return (
		<div className="table">
			<JView {...value} />
		</div>
	);
}
```

This case adds a configuration for a panel using the property `panel`. In this case, we defined the configuration to
allow a maximum of two columns to be displayed in the listing or table with the option to save the configured columns
through the `save` property.

### _**Conclusion 🌐**_

`JView` is a powerful component that significantly improves the way data is presented, making it easier for users to
navigate and manage complex datasets. By leveraging its features like pagination, search, and customizable actions,
developers can create intuitive interfaces that enhance user experience.

For any questions or support regarding the implementation of **JView**, please refer to the project's documentation or
open an issue on the repository.
