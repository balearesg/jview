import React from 'react'

export function Empty({ styles }) {
    return (
        <div style={styles} className="options options__empty">
            <div className="option">
                No hay opciones
            </div>
        </div>
    )
}
