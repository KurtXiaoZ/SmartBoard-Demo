import { useContext } from "react";
import { contexts } from "./stateManagement/contexts";


/**
 * Get item state
 * @param {String} itemId       id of the item
 * @returns state of the item
 */
export function useItemState(itemId) {
    const { itemStates } = useContext(contexts['ItemsContext']);
    if(!itemStates) return null;
    return itemStates[itemId] || null;
}

/**
 * Get dispatcher of ItemsContext
 * @returns dispatcher of ItemsContext
 */
export function useItemsDispatcher() {
    const { dispatchItems } = useContext(contexts['ItemsContext']);
    return dispatchItems;
}