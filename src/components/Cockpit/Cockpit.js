import React, { useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';


const cockpit = (props) => {
  // React hook to set refs in functional components
  const toggleBtnRef = useRef(null);
  // React hook to use context in functional component
  const authContext = useContext(AuthContext);


  // Executes after every render cycle
  // useEffect combines use cases of all class based lifecycle hooks into one react hook
  // Useful because you cant otherwise use class based lifecycle hooks in functional components
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // can even do things like http request...
    // setTimeout(() => {
    //   alert('Saved data to cloud!');
    // }, 1000);
    // Runs before main useEffect function but AFTER first render cycle
    toggleBtnRef.current.click();
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  },[]); 
  // useEffect control: Passing in an array at the end lists it as a dependency which will cause useEffect to run when that dependency changes
  //,[props.person]); // Ending in this causes useEffect to only execute when person changes
  //,[]); // Ending in this causes useEffect to only execute once because its saying it has no dependencies 

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    // Runs before main useEffect function but AFTER first render cycle
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  }); 


    const assignedClasses = [];
    let btnClass = '';

    if(props.showPersons){
        btnClass = classes.Red;
    }

    if(props.personsLength <= 2){
      assignedClasses.push(classes.red);
    }
    if(props.personsLength <=1){
      assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            {/* IF switchNameHandler was a function and not a const, we could use {() => this.switchNameHandler('Joshua')} NOTE: it can be inefficient */}
            <button
              ref={toggleBtnRef}
              className={btnClass}
              onClick={props.clicked}>Toggle Persons
            </button>
            {/* <AuthContext.Consumer> Alternate way to use context
              {(context) => <button onClick={context.login}>Log In</button>}
            </AuthContext.Consumer> */}

            <button onClick={authContext.login}>Log In</button>
          </div>
    );

};

// Wrapping the export in memo will cause react to 
// store a snapshot of the component and only rerender it when its input is changed
// Very useful for optimazation on functional components and good idea to wrap components
// that might not need to update with every change in the parent component with it
export default React.memo(cockpit);