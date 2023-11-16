export function Texts(language) {

    const texts = {
        es: {
            "empty": "No hay elementos asociados a este listado",
            "showing": "Mostrando del",
            "to": "al",
            "of": "de",
            "items": "elementos",
            "show": "Mostrar",
            "rows": "filas",
            "export": "Exportar",
            "search": {
                "Search": "Buscar",
                "from": "Desde",
                "to": "Hasta",
                "accept": "Aceptar",
                "filter": "Filtros"
            }
        },
        en: {
            "empty": "There are no items associated with this listing",
            "showing": "Showing ",
            "to": "to",
            "of": "of",
            "items": "items",
            "show": "Show",
            "rows": "rows",
            "export": "Export",
            "search": {
                "search": "Search",
                "from": "From",
                "to": "To",
                "filter": "Filters",
                "accept": "Aceptar"
            }
        }
    };

    return texts[language];

}