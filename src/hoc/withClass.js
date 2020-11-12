import React from 'react';

// const withClass = props => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );


// Passing props via the spread operator to the WrappedComponent like this allows for the 
// Spread operator to pull out all of the properties that are inside the props object
// and distribute them as new key value pairs on this wrappedcomponent
const withClass = (WrappedComponent, className) => {
  return props => (
      <div className={className}>
          <WrappedComponent {...props} />
      </div>
  );  
};

export default withClass;