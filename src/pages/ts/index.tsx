import { ServerStatus } from "./server-status";
import { ProxyStatus } from './proxy-status';

export const Index = () => {

    return (
        <>
            <ServerStatus />
            <br/>
            <ProxyStatus />
        </>
    );
}