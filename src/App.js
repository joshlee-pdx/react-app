import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
      persons: [
        { id: 'ehtpoj1', name: 'Josh', age:30},
        { id: 'gs3ojpm',name: 'Kouki', age:31},
        { id: 'hgio3d',name: 'Jessica', age:26}
      ],
      otherState: 'some other value',
      showPersons: false
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
    // Allows for a more efficient view toggle 
    let persons = null;
    let btnClass = '';

    if(this.state.showPersons) {
      persons = (
        <div /* Wrapping data in div allows to show/hide more easily 
        Also common practice to make lists is to map arrays into arrays of jsx objects
        like the following*/>
          {this.state.persons.map((person, index) => {
            
            //Setting key to unique id allows react to compare current dom with previous 
            //dom to see which elements changed so that it only needs to re-render 
            //the elements that changed vs entire list 
            return <ErrorBoundary key={person.id}><Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}

            changed={(event)=>this.nameChangedHandler(event,person.id)}/> </ErrorBoundary>
          })}
        </div> 
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <=1){
      assignedClasses.push(classes.bold);
    }

    return (

        <div className={classes.App}>
          <h1>Hi, I'm a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          {/* IF switchNameHandler was a function and not a const, we could use {() => this.switchNameHandler('Joshua')} NOTE: it can be inefficient */}
          <button
            className={btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>

    );
    // Insides get translated to this
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
  };


export default App;




