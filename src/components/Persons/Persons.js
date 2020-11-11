import React from 'react';
import Person from './Person/Person';

const persons = (props) => {
      console.log('[Persons.js] rendering...');
      
      return props.persons.map((person, index) => {
        return (<Person 
            click={() => props.clicked(index)}
            name={person.name}
            age={person.age}
            //Setting key to unique id allows react to compare current dom with previous 
            //dom to see which elements changed so that it only needs to re-render 
            //the elements that changed vs entire list 
            key={person.id} 
            changed={(event)=>props.changed(event,person.id)}/>);
      });
};

export default persons;