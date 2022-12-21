import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  ResponderProvided,
  DropResult,
} from "react-beautiful-dnd";

export const EventCreator = () => {
  const [dragDropList, setDragDropList] = useState<any[]>([]);
  const onDragComplete = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) return;

    const items = Array.from(dragDropList);

    //Changing the position of Array element
    const [removed] = items.splice(result.source.index, 1);
    // put it back in the right place
    items.splice(result.destination.index, 0, removed);

    //Updating the list
    setDragDropList(items);

    console.log("123456", provided);
  };
  return (
    <DragDropContext onDragEnd={onDragComplete}>
      <Droppable droppableId="drag-drop-list" direction="horizontal">
        {provided => (
          <div
            className="drag-drop-list-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {dragDropList.map((item, index) => (
              <Draggable key={item.id} draggableId={item.label} index={index}>
                {_provided => (
                  <div
                    className="item-card"
                    ref={_provided.innerRef}
                    {..._provided.draggableProps}
                    {..._provided.dragHandleProps}
                  >
                    <span className="material-symbols-outlined">drag_indicator</span>
                    <div className="char-avatar">{item.label.charAt(0)}</div>
                    <p className="label">{item.label}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
