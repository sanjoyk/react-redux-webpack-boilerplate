import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const getItems = (count, offset = 0) =>
  Array.from ({length: count}, (v, k) => k).map (k => ({
    id: `item_${k + offset}`,
    content: `item_${k + offset}`,
  }));
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
  display: 'inline-block',
});

class DroppableContainer extends Component {
  render () {
    const {droppableId, items} = this.props;
    return (
      <Droppable droppableId={droppableId} style={{display: 'flex'}}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle (snapshot.isDraggingOver)}
          >
            {items.map ((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle (
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}
class TodoPage extends Component {
  state = {
    todo: getItems (10),
    inprogress: getItems (5, 10),
    done: getItems (5, 15),
  };
  render () {
    const {todo, inprogress, done} = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <DroppableContainer
          key={1}
          items={todo}
          droppableId="todo"
          style={{padding: '20px'}}
        />
        <DroppableContainer
          key={2}
          items={inprogress}
          droppableId="inprogress"
          style={{padding: '20px'}}
        />
        <DroppableContainer
          key={3}
          items={done}
          droppableId="done"
          style={{padding: '20px'}}
        />
      </DragDropContext>
    );
  }
}
export default TodoPage;
