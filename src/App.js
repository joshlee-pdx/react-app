import React, { useState } from 'react';
import { render } from 'react-dom';
import './App.css';
import Person from './Person/Person';

class App extends Component{
  state = {
      persons: [
        {name: 'Josh', age:30},
        {name: 'Kouki', age:31},
        {name: 'Jessica', age:26}
      ],
      otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    //console.log('Was Clicked!');
    // DONT DO THIS -> this.state.persons[0].name='Joshua';
    setPersonsState({   
      persons: [
        {name: newName, age:30},
        {name: 'Kouki', age:31},
        {name: 'Jessica', age:27}
      ],
    });
  }
  
  nameChangedHandler = (event) => {
    //console.log('Was Clicked!');
    // DONT DO THIS -> this.state.persons[0].name='Joshua';
    setPersonsState({   
      persons: [
        {name: 'Josh', age:30},
        {name: event.target.value, age:31},
        {name: 'Jessica', age:26}
      ]
    } )
  }

  render() {
    const style ={
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        {/* IF switchNameHandler was a function and not a const, we could use {() => this.switchNameHandler('Joshua')} NOTE: it can be inefficient */}
        <button style={style}
          onClick={switchNameHandler.bind(this,'Joshua')}>Switch Name</button>
          <div>
            <Person 
              name={personsState.persons[0].name} 
              age={personsState.persons[0].age}/>
            <Person 
              name={personsState.persons[1].name} 
              age={personsState.persons[1].age}
              //Passing a method by reference to person as a prop 
              click={switchNameHandler.bind(this,'Josh!')}
              changed={nameChangedHandler}>My Hobbies: Racing </Person>
            <Person 
              name={personsState.persons[2].name} 
              age={personsState.persons[2].age}/>
          </div>
      </div>
    );
    // Insides get translated to this
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
  };


export default app;




