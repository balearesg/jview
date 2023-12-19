import React from 'react';
import { useSearchContext } from '../context';
import { Input } from '@bgroup/jview/input';

export function Dates(): JSX.Element {
    const { state, texts, handleChange, date } = useSearchContext();
    if (!date) return null
    const getCurrentDate: () => string = (): string =>
        new Date().toLocaleDateString("en-CA", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }).split("/").reverse().join("-");
    return (
        <div className="fields-date">
            <div className="fieldset">

                <Input
                    type="date"
                    name="startDate"
                    value={state.startDate}
                    max={getCurrentDate()}
                    onChange={handleChange}
                    label={texts.from}
                />
            </div>
            <div className="fieldset">

                <Input
                    type="date"
                    name="endDate"
                    value={state.endDate}
                    max={getCurrentDate()}
                    onChange={handleChange}
                    label={texts.to}
                />
            </div>
        </div>
    );
};
