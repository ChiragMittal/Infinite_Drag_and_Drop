import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {v4 as uuid} from 'uuid';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { deleteList } from '../actions/index'
import { connect } from 'react-redux'


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    localStorage.setItem('hello',result)

    return result;
    
};

const Content = styled.div`
display:flex;
    margin-right: 200px;
`;

const Item = styled.div`
   
   display:flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'dashed #000' : 'solid #ddd')};
`;

const Clone = styled(Item)`
    ~ div {
        transform: none !important;
    }
`;

const Handle = styled.div`
    
    align-items: center;
    align-content: center;
    user-select: none;
    margin: -0.5rem 0.5rem -0.5rem -0.5rem;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 3px 0 0 3px;
    background: #fff;
    border-right: 1px solid #ddd;
    color: #000;
`;

const List = styled.div`

    border: 1px
        ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;

const Kiosk = styled(List)`
    
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    float :left;
`;

const Container = styled(List)`

    margin: 0.5rem 0.5rem 1.5rem;
`;


const ITEMS = [
    {
        id: uuid(),
        content: 'R1'
    },
    {
        id: uuid(),
        content: 'R2'
    },
    {
        id: uuid(),
        content: 'R3'
    },
    {
        id: uuid(),
        content: 'R4'
    },
    {
        id: uuid(),
        content: 'R5'
    }
];

class App extends Component {
    state = {
        [uuid()]: [],
        [uuid()]: [],
        [uuid()]: [],
        [uuid()]: [],
        [uuid()]: []
    };
    onDragEnd = result => {
        const { source, destination } = result;

    
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                this.setState({
                    [destination.droppableId]: reorder(
                        this.state[source.droppableId],
                        source.index,
                        destination.index
                    )
                });
                break;
            case 'ITEMS':
                this.setState({
                    [destination.droppableId]: copy(
                        ITEMS,
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
                this.setState(
                    move(
                        this.state[source.droppableId],
                        this.state[destination.droppableId],
                        source,
                        destination
                    )
                );
                break;
        }

        
    };

    removeItem = (val,id) => {
      console.log(this.state)
      console.log(id)
      console.log(val[id])

      val.splice(id,1)

      
     // this.state.splice(id, 1)
    }

    render() {

      var hello =   <DragDropContext onDragEnd={this.onDragEnd}>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
          {(provided, snapshot) => (
              <Kiosk
                  innerRef={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}>
                  {ITEMS.map((item, index) => (
                      <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}>
                          {(provided, snapshot) => (
                              <React.Fragment>
                                  <Item
                                      innerRef={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      isDragging={snapshot.isDragging}
                                      style={
                                          provided.draggableProps
                                              .style
                                      }>
                                      {item.content}
                                  </Item>
                                  {snapshot.isDragging && (
                                      <Clone>{item.content}</Clone>
                                  )}
                              </React.Fragment>
                          )}
                      </Draggable>
                  ))}
              </Kiosk>
          )}
      </Droppable>
      <Content>

             
          {Object.keys(this.state).map((list, i) => (

        
              <Droppable key={list} droppableId={list} >
                  {(provided, snapshot) => (
                      <Container 
                          innerRef={provided.innerRef}
                          isDraggingOver={snapshot.isDraggingOver}>
                          {this.state[list].length
                              ? this.state[list].map(
                                    (item, index) => (
                                        <Draggable 
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided) => (
                                              
                                                <Item   
                                                    innerRef={
                                                        provided.innerRef
                                                    }
                                                    {...provided.draggableProps}
                                                    
                                                   >
                                                     
                                                    <Handle style={this.state[list] ? {} : { display: 'none' }}
                                                        {...provided.dragHandleProps}>
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24">
                                                            <path
                                                                fill="currentColor"
                                                                d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                                            />
                                                        </svg>
                                                    </Handle>
                                                    <div >
                                                      {item.content}
                                                      <button onClick={() => this.removeItem(this.state[list],index)} >X</button>
                                                    </div>
                                                </Item>
                                            )}
                                        </Draggable>
                                    )
                                )
                              : !provided.placeholder && (
                                <div>
                                 <p>Drop items here</p>
                                
                                </div>
                                    
                                )}
                          {provided.placeholder}
                      </Container>
                      
                  )}
              </Droppable>
             
          ))}
      </Content>
  </DragDropContext>
      
        return (
           
  <div>
   {hello}
  </div>

        );
    }
};


const mapDispatchToProps = dispatch => ({
  
  deleteListHandler: (id) => {
    dispatch( deleteList(id) )
  }
   

});

export default connect(undefined, mapDispatchToProps)(App);


