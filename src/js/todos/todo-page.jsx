import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const getItems = (count, offset = 0, content) =>
  Array.from ({length: count}, (v, k) => k).map (k => ({
    id: `item_${k + offset}`,
    content: content ? content : `item_${k + offset}`,
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
  minWidth: '30%',
  // width: 250,
  // display: 'inline-block',
});

const move = (source, destination, droppableSource, droppableDestination) => {
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
  state = {
    showAddItem: false,
  };

  addNote = () => {
    this.props.addNote (droppableId);
  };
  render () {
    const {showAddItem} = this.state;
    const {droppableId, items, deleteItem} = this.props;
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
                    <div>
                      {item.content}
                    </div>
                    <button
                      style={{
                        float: 'right',
                        position: 'relative',
                        marginBottom: '10px',
                        bottom: '4px',
                      }}
                      onClick={() =>
                        deleteItem ({
                          droppableId: droppableId,
                          index: index,
                        })}
                    >
                      delete
                    </button>

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
    totalTodos: 0,
  };
  id2List = {
    todo: 'todo',
    inprogress: 'inprogress',
    done: 'done',
  };
  getList = id => {
    return this.state[this.id2List[id]];
  };

  onDragEnd = result => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
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
      const result = move (
        this.getList (source.droppableId),
        this.getList (destination.droppableId),
        source,
        destination
      );
      this.setState ({
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId],
      });
    }
  };
  addTodo = ({content, type}) => {
    const {totalTodos} = this.state;
    const items = getItems (1, this.state.totalTodos, content);
    this.setState ({
      [type]: [...items, ...this.state[type]],
      totalTodos: this.state.totalTodos + 1,
    });
  };
  deleteItem = ({index, droppableId}) => {
    const items = this.state[droppableId];
    const itemsClone = Array.from (items);
    itemsClone.splice (index, 1);
    this.setState ({[droppableId]: itemsClone});
  };
  render () {
    const {todo, inprogress, done} = this.state;
    return (
      <div style={{minWidth: '100%'}}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <Task key="todo" type="todo" addTodo={this.addTodo} />
          <Task key="inprogress" type="inprogress" addTodo={this.addTodo} />
          <Task key="done" type="done" addTodo={this.addTodo} />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-around',
          }}
        >
          <DragDropContext onDragEnd={this.onDragEnd}>
            <DroppableContainer
              key={1}
              items={todo}
              deleteItem={this.deleteItem}
              droppableId="todo"
              style={{padding: '20px'}}
            />
            <DroppableContainer
              key={2}
              items={inprogress}
              deleteItem={this.deleteItem}
              droppableId="inprogress"
              style={{padding: '20px'}}
            />
            <DroppableContainer
              key={3}
              items={done}
              droppableId="done"
              deleteItem={this.deleteItem}
              style={{padding: '20px'}}
            />
          </DragDropContext>
        </div>

      </div>
    );
  }
}
export default TodoPage;

class Task extends Component {
  constructor (props) {
    super (props);
    this.inputRef = React.createRef ();
    this.state = {
      showAddItemForm: false,
    };
  }
  showAddItemForm = () => {
    this.setState ({showAddItemForm: true});
  };
  addNote = e => {
    e.preventDefault ();
    const {type, addTodo} = this.props;
    addTodo ({type, content: this.inputRef.current.value});
    this.setState ({showAddItemForm: false});
  };

  render () {
    const {showAddItemForm} = this.state;
    const {type} = this.props;
    return (
      <div>
        <h1>{type}</h1>
        <button type="button" text={'add'} onClick={this.showAddItemForm}>
          add
        </button>
        {showAddItemForm
          ? <form>
              <textarea ref={this.inputRef} />
              <input type="submit" value="add" onClick={this.addNote} />
            </form>
          : null}
      </div>
    );
  }
}
