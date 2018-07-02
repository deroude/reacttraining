# React, Redux and Material UI Introduction

## Project startup

We'll use the `create-react-app` archetype:

```
npx create-react-app [APP NAME]
npm install
npm start
```

The latter will invoke `react-scripts` to create a development build, watch files for changes, as well as start a server on port 3000, which you can check out in your browsers.

## Project structure

The following files are of interest in the initial project structure:

### package.json

As with any node managed project, `package.json` is where you will put all your dependencies and build scripts.

### src/index.js

This is the root of the project, the file invoked to start the project. 

```
ReactDOM.render(<App />, document.getElementById('root'));
```

This line renders the `App` component in the element called `root` of the initial DOM, which you can inspect at `public/index.html`. Notice that file is outside the `src` folder, so the expectation would be not to change it unless absolutely necessary.

### src/App.js

This is a [component](https://reactjs.org/docs/react-component.html). It extends `React.Component` and must implement the `render` method.

The following methods can also be implemented to control the component's lifecycle:

- `componentDidMount` - will trigger after the component was inserted into the DOM; typically all asynchronous processing should be started here
- `componentDidUpdate` - will trigger after the component has been redrawn due to change detection; 
- `componentWillUnmount` - will trigger before the component's DOM presence is removed; typically any cleaning needed should be placed here
- `componentDidCatch` - will trigger when an uncaught error is thrown by this component; all components should implement this with an appropriate error handler

The component also has a class member `props` that contains all attributes passed to the component. 

The component can have a regular stylesheet attached, simply by importing it.

## JSX

The content returned by the `render` method in `App.js` is somewhat unusual. 

Indeed, that's not regular javascript, nor is it regular HTML. That's React's templating language, called [JSX](https://reactjs.org/docs/introducing-jsx.html).

This language makes it easy to compose the DOM depending on the business logic, by using all the normal javascript control structures and language aids, but manipulating objects instead of strings.

What React does so far is help us manipulate templates and box components to be easily (re)usable. 

## Enter Redux

The philosophy of Redux is "single source of truth".

You can view the application as a state machine. 

A classical application is represented by a number of components collaborating in the sens of sharing information via parameters and services.
A few usual features:

- child components receive essential business arguments from parent components or from DI (e.g. access to services)
- child components emit events to parent components, who are responsible to handle them
- each component needs to be tested in an environment, or context

This is an example of such behavior:

![No Redux](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/deroude/reacttraining/uml/no_redux.puml)

Redux brings in a different philosophy:

- The state of all application features (e.g. components) is maintained in a single, immutable, structure ("single source of truth") called __state__
- Since the state is immutable, it cannot be altered, it can only be replaced, which guarantees there is no ambiguity as to the order of operations.
- To move to the next state, we need to __dispatch__ an __action__, which is characterized by an action type and a set of arguments
- A __reducer__ is a [pure function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
  - Given the same input, will always return the same output
  - Produces no side effects

A call to an API, for example, is __not__ a pure function, because it fails both conditions: two calls to the same API may very well return a different response, even if we made them synchronous, which we don't; also, the very reason why we send a POST request for example is to produce side effect.

However, the condition applies strictly to the reducer function, this doesn't mean that Ajax calls cannot be made using Redux. For example, if the call to the API is one reducer and the response from the API is another reducer, then we are fine, both are pure functions. However, we need to connect them. For this, there are a number of implementations that come to the rescue: in this example we use `redux-thunk` which simply allows the reducer to return a function instead of a value (which still abides by the pure function law).

![Redux](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/deroude/reacttraining/uml/redux.puml)

## Material UI

