import React, {PureComponent} from 'react';
import Person from './Person/Person';

// Extending PureComponent is like a normal component that already implements shouldComponentUpdate
// with a complete props check. Useful if you're already checking all props for changes 
class Persons extends PureComponent{
  // static getDerivedStateFromProps(props,state){
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

// shouldComponentUpdate(nextProps,nextState){
//   console.log('[Persons.js] shouldComponentUpdate');

// Only update when current prop is different from next prop
//   if(nextProps.persons !== this.props.persons || 
//     nextProps.changed !== this.props.changed ||
//     nextProps.clicked !== this.props.clicked)
//       return true;
//   else
//     return false;
// }

// Runs right before component is removed
  componentWillUnmount(){
    console.log('[Persons.js] componentWillUnmount');
  }

// Returns a snapshot object that can be edited
// Useful for restoring cursor/scrolling positions 
  getSnapshotBeforeUpdate(prevProps,prevState){
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {message: 'Snapshot!'};
  }

// Safe to cause side-effects here, but don't update the state with setstate
// Useful to fetch new data from server
  componentDidUpdate(prevProps, prevState,snapshot){
    console.log('[Persons.js] componentDidUpdate');
    console.log({snapshot});
  }

  render(){
    console.log('[Persons.js] rendering...');
    
    return this.props.persons.map((person, index) => {
      return (
        <Person 
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          //Setting key to unique id allows react to compare current dom with previous 
          //dom to see which elements changed so that it only needs to re-render 
          //the elements that changed vs entire list 
          key={person.id} 
          changed={(event)=>this.props.changed(event,person.id)}
        />
      );
    });
  };

            
}

export default Persons;