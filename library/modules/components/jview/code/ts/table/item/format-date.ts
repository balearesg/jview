export function formatDate(date) {

    // Opción 1: Ajusta la zona horaria a UTC
    const dateUTC = new Date(date);

    // Opción 2: Ajusta la zona horaria a tu zona horaria local
    const dateLocal = new Date(date);
    dateLocal.setMinutes(dateLocal.getMinutes() - dateLocal.getTimezoneOffset());

    // Formatea la fecha y hora según tu preferencia
    const options: any = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Habilita el formato de a.m. y p.m.
    };

    const dateFormatUTC = dateUTC.toLocaleString("es-ES", options); // Cambia "es-ES" a tu configuración de idioma y zona horaria
    const dateFormatLocal = dateLocal.toLocaleString("es-ES", options); // Cambia "es-ES" a tu configuración de idioma y zona horaria
    return dateFormatUTC
}