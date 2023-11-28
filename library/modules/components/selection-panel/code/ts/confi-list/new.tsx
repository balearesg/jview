import * as React from 'react'
import { Modal } from 'pragmate-ui/modal';
import { usePanelContext } from '../context';
import { Input, Form } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';

export function New() {
    const { configList, handleModal, states, values, setConfigList, keyConf } = usePanelContext();
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState(false)
    if (!configList.new) return null;
    const handleChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(currentTarget.value);
        setError(false)
    }
    const save = () => {
        if (!value) {
            setError(true)
            return
        };
        const items = states.items.map(item => {
            return {
                ...item,
                checked: values[item.id]
            }
        })
        const newConf = { name: value, items };
        const prevStorage = localStorage.getItem(keyConf);
        const newStorage = prevStorage ? JSON.parse(prevStorage).concat([newConf]) : [newConf];
        const options = newStorage.map(item => {
            return {
                value: JSON.stringify(item.items),
                label: item.name
            }
        });
        localStorage.setItem(keyConf, JSON.stringify(newStorage))
        setConfigList({ ...configList, options, new: false });
        setValue("");

    };

    return (
        <Modal show className="new-config" onClose={handleModal}>
            <Form onSubmit={save}>
                <fieldset>
                    <legend>Configuración nueva</legend>
                    <Input hasError={error} errorMessage='Complete el campo' type="text" label="Nombre" name="name" onChange={handleChange} />
                </fieldset>
                <Button disabled={!value} variant='primary' type='submit'>Guardar</Button>
            </Form>
        </Modal>
    );
}