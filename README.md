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

## Enter Redux

## Material UI