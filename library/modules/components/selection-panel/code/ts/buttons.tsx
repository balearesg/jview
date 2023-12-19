import React from 'react';
import { Button } from 'pragmate-ui/components';
import { usePanelContext } from './context';

export function Buttons(): JSX.Element {
	const { handleModal, setValues, init, setShow, setStates, states, isSaveConf } = usePanelContext();

	const close = (): void => {
		setValues({ ...init });
		setShow(false);
		setStates({ ...states, items: states.originalItems });
	};

	const save = isSaveConf ? handleModal : close;
	const label = isSaveConf ? "Guardar" : "Cancelar"
	return (
		<div className="selection-buttons">
			<Button variant="secondary" label={label} onClick={save} />
			<Button variant="primary" label="Aceptar" type="submit" />
		</div>
	);
}
