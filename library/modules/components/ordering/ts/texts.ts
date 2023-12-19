export function Texts(language) {

    const texts = {
        es: {
            "title": "Ordenar elementos",
            "orderBy": "Ordenar por",
            "descendant": "Descendiente",
            "ancestry": "Ascendiente",
            "addColumn": "Agregar otra columna de ordenación",
            "order": "Ordenar",
            "cancel": "Cancelar"
        },
        en: {
            "title": "Sort elements",
            "orderBy": "Sort by",
            "descendant": "Descendant",
            "ancestry": "Ancestry",
            "addColumn": "Add another sort column",
            "order": "Order",
            "cancel": "Cancel"
        }
    };

    return texts[language];

}