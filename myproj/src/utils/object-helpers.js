export const updateObjectInArray = (items, objProp, itemId, ...newObjects) => {
    return items.map(item => {
        if(items[objProp] === itemId) {
            return [...item, ...newObjects]
        }
        return item
    })
}