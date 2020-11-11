import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  // Constructor to initialize/setup state
  // Not safe to cause side-effects here
  // Side-effects include sending http requests or running analytics
  constructor(props){
    super(props);
    console.log('[App.js] Constructor');
  }

  state = {
      persons: [
        { id: 'ehtpoj1', name: 'Josh', age:30},
        { id: 'gs3ojpm',name: 'Kouki', age:31},
        { id: 'hgio3d',name: 'Jessica', age:26}
      ],
      otherState: 'some other value',
      showPersons: false
  }

  // This lifecycle component is ran before rendering
  // Purpose is for syncing state to props they change (niche circumstances)
  // But safe to cause side-effects here
  static getDerivedStateFromProps(props,state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // Last component lifecycle to run
  // Safe to cause side-effects in
  // Don't update state here
  componentDidMount(){
    console.log('[App.js] componenetDidMount');
  }

  nameChangedHandler = (event,id) => {
    // DONT DO THIS -> this.state.persons[0].name='Joshua';

    // Find index of person using their id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // To avoid mutating js objects (which are reference types) we must copy
    // its data into a new person object by doing the following:
    const person = {
      ...this.state.persons[personIndex]
    };

    // Alternative to copy object
    // const person = Object.assign({}, this.state.persons[personsIndex]);

    // Change name to user input
    person.name = event.target.value;

    // Update a copy of array of persons at the newly changed index
    const persons = [...this.state.persons];
    persons[personIndex] = person;
  
    // Update state to new copy of array
    this.setState({persons: persons})
  }

  // Delete a person from array of persons by getting their index and splicing
  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons})
  }

  // Allows the ability to toggle view of persons objects
  // Using arrow function makes sure this keyword always returns to this class
  togglePersonsHandler= () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    console.log('[App.js] render');

    // Allows for a more efficient view toggle 
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>;
    }


    return (

        <div className={classes.App}>
          <Cockpit 
            title={this.props.appTitle}
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}/>
          {persons}
        </div>

    );
    // Insides get translated to this
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
  };


export default App;




