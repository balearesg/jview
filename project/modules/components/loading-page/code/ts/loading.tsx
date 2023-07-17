import * as React from "react";
import { Spinner } from "pragmate-ui/spinner";
type properties = {
    loading?: boolean;
    content?: boolean;
};
export /*bundle*/
    function LoadingPage({ loading, content }: properties): JSX.Element {
        let cls: string  = loading ? 'loading-page loading-proses' : 'loading-page main-loading';
        cls+= content ? " loading-content" : "";
    return (
        <div className={cls}><Spinner /></div>
    );
};
