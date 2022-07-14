import { items, itemsReducer } from './reducers/itemsReducer';
import { useReducer, useState } from "react";
import { contexts } from './contexts';
import { syncMov, syncMovReducer } from './reducers/syncMovReducer';

export function StateManager({ children }) {
    const { ItemsContext, MovementContext, SelectionContext, SyncMovContext } = contexts;
    const [itemStates, dispatchItems] = useReducer(itemsReducer, items);
    const [syncMovStates, dispatchSyncMov] = useReducer(syncMovReducer, syncMov);
    const [moving, setMoving] = useState(false);
    const [selected, setSelected] = useState("");
    return <ItemsContext.Provider value={{ itemStates, dispatchItems }} >
        <MovementContext.Provider value={{ moving, setMoving }}>
            <SelectionContext.Provider value={{ selected, setSelected }}>
                <SyncMovContext.Provider value={{ syncMovStates, dispatchSyncMov }} >
                    { children }
                </SyncMovContext.Provider>
            </SelectionContext.Provider>
        </MovementContext.Provider>
    </ItemsContext.Provider>;
}