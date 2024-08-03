import { ServerStatus } from "./server-status";
import { ProxyStatus } from './proxy-status';

export const Index = () => {

    return (
        <div className="index">
            <div className="left">
                <ServerStatus />
            </div>

            <div className="right">
                <div className="separator" />
                <ProxyStatus />
            </div>
        </div>
    );
}