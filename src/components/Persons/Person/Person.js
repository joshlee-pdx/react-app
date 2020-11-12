//this is the person component which can be considered a dumb or presentation component 
//because it has no logic and instead is just presenting something

import React, {Component} from 'react';
import PropTypes from 'prop-types';

//Can import react fragment for built in aux component
import Aux from '../../../hoc/Auxilliary';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import AuthContext from '../../../context/auth-context';

class Person extends Component{
  constructor(props){
    // Always have to call super in your constructor
    super(props);
    // Alternate way to assign reference
    this.inputElementRef = React.createRef();
  }

  // Alternative way to use context API
  // Only available for class based components
  static contextType = AuthContext;

  componentDidMount(){
    //this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.autheticated);
  }

  render(){
    console.log('[Person.js] rendering...');

    return (
      <Aux>
        {/* <AuthContext.Consumer> Alternate way to use context API
          {(context) => context.autheticated ? <p>Authenticated!</p> : <p>Please Login!</p>}
        </AuthContext.Consumer> */}

        {this.context.autheticated ? <p>Authenticated!</p> : <p>Please Login!</p>}

        {/* Dynamically state name and age from passed attributes */}
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
        {/* children is a reserved word that refers to any elements between opening and closing tag of component */}
        <p>{this.props.children}</p>

        <input 
          type="text"
          //ref={(inputEl) => {this.inputElement = inputEl}} 
          ref={this.inputElementRef}
          onChange={this.props.changed} 
          value={this.props.name}
        />

      </Aux>
    )
    };
  }

// After component definition, can add another property (works for functional and class based components)
// that will cause React to give warning if passing incorrect props. Define here what props this component
// uses and which type of data each component should be of.
Person.propTypes = {
  click: PropTypes.func, // Expect to get a pointer to a function. Not a string, number, etc
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person,classes.Person);