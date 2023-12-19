import * as React from 'react'
import { Modal } from 'pragmate-ui/modal';
import { usePanelContext } from '../context';
import { Input, Form } from 'pragmate-ui/form';
import { Button } from 'pragmate-ui/components';

export function New() {
    const { configList, handleModal, states, values, setConfigList, keyConf } = usePanelContext();
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState("")
    if (!configList.new) return null;
    const handleChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(currentTarget.value);
        setError("")
    }
    const close = () => {
        setValue("");
        setError("")
    }
    const save = () => {

        if (!value) {
            setError("Complete el campo")
            return
        };
        const items = states.items.map(item => {
            return {
                ...item,
                checked: values[item.id]
            }
        })
        const newConf = { name: value, items };
        let prevStorage: any = localStorage.getItem(keyConf);
        prevStorage = prevStorage ? JSON.parse(prevStorage) : null;
        const isInStorage = prevStorage ? prevStorage.some(item => item.name === newConf.name) : false;
        if (isInStorage) {
            setError("Ya existe una configuración con ese nombre");
            return
        }
        const newStorage = prevStorage ? prevStorage.concat([newConf]) : [newConf];
        const options = newStorage.map(item => {
            return {
                value: JSON.stringify(item.items),
                label: item.name ?? item.label
            }
        });
        localStorage.setItem(keyConf, JSON.stringify(newStorage))
        setConfigList({ ...configList, options, new: false });
        setValue("");
        setError("")
    };

    return (
        <Modal show className="new-config" onClose={handleModal}>
            <Form onSubmit={save}>
                <fieldset>
                    <legend>Configuración nueva</legend>
                    <Input type="text" label="Nombre" name="name" onChange={handleChange} />
                    {error && <span className='error-form'>{error}</span>}
                </fieldset>
                <Button disabled={!value} variant='primary' type='submit'>Guardar</Button>
            </Form>
        </Modal>
    );
}