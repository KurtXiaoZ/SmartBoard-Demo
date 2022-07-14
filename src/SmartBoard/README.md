# SmartBoard Reusable Component

A React Component for building a low-code platform
```js
<SmartBoard>
    <Item>
        <div>smartboard</div>
    </Item>
</SmartBoard>
```

[Demo](http://react-grid-layout.github.io/react-draggable/example/)

### Installing
```
git clone with SSH: git clone git@github.com:KurtXiaoZ/SmartBoard.git
git clone with HTTPS: git clone https://github.com/KurtXiaoZ/SmartBoard.git
```

### Exports

```js
import { SmartBoard, Item } from '<relative path>/SmartBoard'
```

## `<SmartBoard>`
A `<SmartBoard>` component provides a canvas for the platform. `<Item>` components within `<SmartBoard>` can be dragged and resized.

`<SmartBoard>` is essentially a `<div>` with `position: relative`. 

### `<SmartBoard>` props:
```js
className: PropTypes.string, // class name of the SmartBoard component; targets <div>

style: PropTypes.object, // style of the SmartBoard component; CSS position applied will be over written

autoAlignDistance: PropTypes.number, // custom distance for auto-alignment of <Item> withinSmartBoard
```

## `<Item>`
A `<Item>` component wraps your custom component and makes it draggable and resizable.

`<Item>` must be placed within `<SmartBoard>`.

`<Item>` must only have one child.

`<Item>` essentially wraps your component with a `<div>` with `position: absolute`.


### `<Item>` props:
```js
// 'left' value of the position of the item
left: PropTypes.number,

// 'top' value of the position of the item
top: PropTypes.number,

// unique itemId for the item
itemId: PropTypes.string.isRequired,

// zIndex of the item
zIndex: PropTypes.number,

// className of the item container
className: PropTypes.string,

// style of the item container
// position, left, top, width, height, border, zIndex are overwritten
// these styles can be set on the child component of <Item>
style: PropTypes.object,

// bounds of the item when it's being dragged orresized; if not specified, bounds equal the SmartBoard
bounds: PropTypes.exact({
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    bottom: PropTypes.number,
}),

// set the visiblity of four resize handlers
handlerPositions: PropTypes.exact({
    topLeft: PropTypes.bool,
    topRight: PropTypes.bool,
    bottomLeft: PropTypes.bool,
    bottomRight: PropTypes.bool,
}),

// set other items that will be moving synchronously with this item
syncItems: PropTypes.arrayOf(PropTypes.string),

// called whenever the user mouses down on Item
// (event: Event) => void
onMouseDownItem: PropTypes.func,

// called whenever the user mouses down on resize handler 
// (event: Event, data: {handler: string}) => void
// handler can be topLeft || topRight || bottomLeft || bottomRight
onMouseDownResizeHanlder: PropTypes.func,

// called when dragging starts
// (event: Event, data: {x: number, y: number}) => void
onDragStart: PropTypes.func,

// called when dragging
// (event: Event, data: {x: number, y: number}) => void
onDrag: PropTypes.func,

// called when dragging ends
// (event: Event, data: {x: number, y: number}) => void
onDragEnd: PropTypes.func,

// called when resizing starts
// (event: Event, data: {x: number, y: number, width: number, height: number,handler: string}) => void
onResizeStart: PropTypes.func,

// called when resizing
// (event: Event, data: {x: number, y: number, width: number, height: number,handler: string}) => void
onResize: PropTypes.func,

// called when resizing ends
// (event: Event, data: {x: number, y: number, width: number, height: number,handler: string}) => void
onResizeEnd: PropTypes.func,

// Item must have a single child component
children: PropTypes.element.isRequired,
```
