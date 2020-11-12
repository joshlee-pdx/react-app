import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxilliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  // First creation lifecycle component to run to initialize/setup state
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
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
  }

  // This creation lifecycle component is ran before rendering
  // Purpose is for syncing state to props they change (niche circumstances)
  // But safe to cause side-effects here
  static getDerivedStateFromProps(props,state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // Last component creation lifecycle to run (very useful component)
  // Safe to cause side-effects in
  // Don't update state here
  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  // Used for performance improvements (very useful update lifecycle component)
  shouldComponentUpdate(nextProps,nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  // Used for fetching data (very useful update lifecycle component)
  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
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
    this.setState((prevState, props) => {
      // Return a new state that is based off of the old state
      return {
        persons: persons, 
        // This is the correct way to make changes based on the previous state
        // (by passing in the prevstate as arguments) because it is not guaranteed 
        // that using "changeCounter: this.state.changeCounter + 1" will be using the 
        // most current state since setState does not trigger an update of the state in a 
        // re-render cycle, rerendering is something that basically  happens on a schedule.
        changeCounter: prevState.changeCounter + 1
        };
      });
  };

  // Delete a person from array of persons by getting their index and splicing
  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons})
  };

  // Allows the ability to toggle view of persons objects
  // Using arrow function makes sure this keyword always returns to this class
  togglePersonsHandler= () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  // Lifecycle creation component that returns JSX
  render() {
    console.log('[App.js] render');

    // Allows for a more efficient view toggle 
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAuthenticated={this.state.authenticated}
            />;
    }


    return (

        <Aux>
          <button onClick={()=>{this.setState({showCockpit: false});}}>Remove Cockpit</button>
          <AuthContext.Provider value={{autheticated: this.state.authenticated, login: this.loginHandler}}>
            {this.state.showCockpit ? (
              <Cockpit 
                title={this.props.appTitle}
                showPersons={this.state.showPersons} 
                personsLength={this.state.persons.length}
                clicked={this.togglePersonsHandler}
              />
            ): null}
            {persons}
          </AuthContext.Provider>
        </Aux>

    );
    // Insides get translated to this
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
  };


export default withClass(App, classes.App);




