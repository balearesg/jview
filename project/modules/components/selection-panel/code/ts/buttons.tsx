import React from 'react';
import { Button } from 'pragmate-ui/components';
import { usePanelContext } from './context';

export function Buttons(): JSX.Element {
	const { states, setShow, init, setValues, setStates } = usePanelContext();

	const close = (): void => {
		setValues({ ...init });
		setShow(false);
		setStates({ ...states, items: states.originalItems });
	};

	return (
		<div className="selection-buttons">
			<Button variant="secondary" label="Cancelar" onClick={close} />
			<Button variant="primary" label="Aceptar" type="submit" />
		</div>
	);
}
