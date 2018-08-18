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

const move = (source, destination, droppableSource, droppableDestination) => {
  debugger;
  const sourceClone = Array.from (source);
  const destClone = Array.from (destination);
  const [removed] = sourceClone.splice (droppableSource.index, 1);

  destClone.splice (droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from (list);
  const [removed] = result.splice (startIndex, 1);
  result.splice (endIndex, 0, removed);

  return result;
};
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
  id2List = {
    todo: 'todo',
    inprogress: 'inprogress',
    done: 'done',
  };
  getList = id => {
    console.log ('this.state[this.id2List[id]]', this.state[this.id2List[id]]);
    return this.state[this.id2List[id]];
  };

  onDragEnd = result => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      debugger;
      const items = reorder (
        this.getList (source.droppableId),
        source.index,
        destination.index
      );

      let state = {todo: items};

      if (source.droppableId === 'inprogress') {
        state = {inprogress: items};
      }

      if (source.droppableId === 'done') {
        state = {done: items};
      }

      this.setState (state);
    } else {
      debugger;
      const result = move (
        this.getList (source.droppableId),
        this.getList (destination.droppableId),
        source,
        destination
      );
      console.log ('result s====', result);
      this.setState ({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
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
