import { useState, useEffect } from 'react';
import { CurrentTexts } from "@beyond-js/kernel/texts";

type UseText<T> = [
    ready: boolean,
    texts?: T
]

/**
 * It returns a boolean and an object. The boolean is true when the object is ready.
 * The object is a collection of strings.
 * @param {string} moduleId - string - the module id of the texts you want to use
 * @returns An array of two elements. The first element is a boolean, the second element is an object.
 */
export /*bundle*/
    function useTexts<T>(moduleId: string): UseText<T> {

    const [ready, setReady] = useState<boolean>(false);

    const [texts, setTexts] = useState<T>();

    useEffect((): () => void => {

        const modelTexts: CurrentTexts<unknown> = new CurrentTexts(moduleId);

        const triggerEvent: () => void = (): void => {
            setReady(modelTexts.ready);
            const texts: T = <T>modelTexts.value
            setTexts(texts)
        };
        modelTexts.bind('change', triggerEvent);
        triggerEvent();
        return (): void => { modelTexts.unbind('change', triggerEvent) };
    }, []);

    const isReady: boolean = ready && !!texts;

    return [isReady, texts];
};
