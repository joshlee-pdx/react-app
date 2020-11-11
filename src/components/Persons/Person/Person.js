//this is the person component which can be considered a dumb or presentation component 
//because it has no logic and instead is just presenting something

import React from 'react';
import classes from './Person.css';

const person = (props) => {
    console.log('[Person.js] rendering...');
    return (
        <div className={classes.Person}>
            {/* Dynamically state name and age from passed attributes */}
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            {/* children is a reserved word that refers to any elements between opening and closing tag of component */}
            <p>{props.children}</p>

            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    )
};

export default person;