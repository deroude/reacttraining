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

## Routing

Four steps to enable routing:

First, create the routes:

```javascript
export default [    
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/page/:page",
        component: Page,
        exact: true,
    }
]
```

Then, wrap the entry point component in the `BrowserRouter`:

```javascript
import { BrowserRouter as Router } from "react-router-dom";

...

        <Router>
            <App />
        </Router>
```

In the entry point component, render the route outlet:

```javascript
import { Route, Switch } from 'react-router-dom';
import routes from "../../routes";
    ...
    
    <Switch>
          {routes.map(route => <Route key={route.path} {...route} />)}
    </Switch>

```

When we want to navigate to a path:

```javascript 
import { Link } from 'react-router-dom';

...

    <Link to={'/my/path'}>My Link</Link>
```

If we want to get the route parameters, we can find them inside the React Component class, in `this.props.match.params.myParam`.

## JSX

The content returned by the `render` method in `App.js` is somewhat unusual. 

Indeed, that's not regular javascript, nor is it regular HTML. That's React's templating language, called [JSX](https://reactjs.org/docs/introducing-jsx.html).

This language makes it easy to compose the DOM depending on the business logic, by using all the normal javascript control structures and language aids, but manipulating objects instead of strings.

What React does so far is help us manipulate templates and box components to be easily (re)usable. 

## Enter Redux

### Why Redux?

The philosophy of Redux is "single source of truth".

You can view the application as a state machine. 

A classical application is represented by a number of components collaborating in the sens of sharing information via parameters and services.
A few usual features:

- child components receive essential business arguments from parent components or from DI (e.g. access to services)
- child components emit events to parent components, who are responsible to handle them
- each component needs to be tested in an environment, or context

This is an example of such behavior:

![No Redux](http://www.plantuml.com/plantuml/proxy?src=https://raw.github.com/deroude/reacttraining/master/uml/no_redux.puml)

Redux brings in a different philosophy:

- The state of all application features (e.g. components) is maintained in a single, immutable, structure ("single source of truth") called __state__
- Since the state is immutable, it cannot be altered, it can only be replaced, which guarantees there is no ambiguity as to the order of operations.
- To move to the next state, we need to __dispatch__ an __action__, which is characterized by an action type and a set of arguments
- A __reducer__ is a [pure function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
  - Given the same input, will always return the same output
  - Produces no side effects

A call to an API, for example, is __not__ a pure function, because it fails both conditions: two calls to the same API may very well return a different response, even if we made them synchronous, which we don't; also, the very reason why we send a POST request for example is to produce side effect.

However, the condition applies strictly to the reducer function, this doesn't mean that Ajax calls cannot be made using Redux. For example, if the call to the API is one reducer and the response from the API is another reducer, then we are fine, both are pure functions. However, we need to connect them. For this, there are a number of implementations that come to the rescue: in this example we use `redux-thunk` which simply allows the reducer to return a function instead of a value (which still abides by the pure function law).

![Redux](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.github.com/deroude/reacttraining/master/uml/redux.puml)

### Writing Redux

While some Redux implementations are very opinionated (e.g. NgRx for Angular), React Redux is rather loose in its recommendations of code structure.

So, the current arrangement is based more on [related literature](https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5) than on concrete guidelines from the creators.

The main principles are:

- put everything related to a business feature in a single file (called __duck__), including:
  - action types (prefix them with the feature name: `LOADING: 'PROGRESS/LOADING'`)
  - initial state
  - reducers, in fact a single reducer function taking as arguments the current state and the action dispatched; the individual reducer operations should be branches of a `switch` on the action type
  - action constructors: the point is to hide as much of Redux as possible from the rest of the application; so, instead of dispatching the actual action object, it's more elegant to build the action by using an exposed function.
  - getters: again, the point is to hide Redux from the world; instead of always accessing the state object and navigating to the correct attribute, we can expose the attribute directly through getters.

But wait, we said there is ONLY ONE state -- yet all these "ducks" have their own state. To comply with the Redux principle, we need to `combine` them in one state:

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import myDuck1 from './myDuck1';
import myDuck2 from './myDuck2';


export default (initialState) =>
    createStore(combineReducers(
        {
            myDuck1,
            myDuck2
        }
    ), initialState, applyMiddleware(thunk));
```

And finally, the createStore(state) method will be used at the start of our application (the entry point):

```javascript
import { Provider as ReduxProvider } from "react-redux";
import createStore from './ducks';

const store = createStore(window.REDUX_DATA);

const jsx = (
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>
);
```

### Using Redux

Components can be divided into "dumb" and "smart", or "components" and "containers", where "dumb" components simply render the exact same way each time when they are invoked with the same parameters, whereas containers perform some data fetching before completing their rendering, which means their final composition may vary -- seems remarkably easy to compare with the pure function concept we discussed earlier.

With Redux, "smart" components will likely need to be connected to the application state, to dispatch actions and to receive updates from the state stream. To do that, React needs us to `connect` them:

```javascript
import { connect } from 'react-redux';
import { actions as myDuckActions, myDuckItemGetter } from '../ducks/myduck';

...

const mapStateToProps = (state) => {
    return {
        myDuckItem:myDuckItemGetter(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        myDuckAction: () => dispatch(myDuckActions.action()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

What these do is:

- import the action constructors and the getters from the respective duck
- inject the state and the dispatch method -- this is in fact split into two steps
  - the first is to create a convenient pair of methods that expose to the Component the state items and the Redux actions; we call those `mapStateToProps` and `mapDispatchToProps`, because we commonly call `props` the parameters that every (dumb) component receives, such as title, text, or width.
  - the second step is where the injection takes place: our React Component no longer exports its own class -- instead, it exports the result of the React Redux function call (or closure) `connect`.

## Material UI

The thing React is best at is boxing UI functionality into reusable components. What more can we want? 
Well, two things actually:

- Theming: React is not so good at working with styles -- for one thing, Create React App doesn't come with a CSS prepreprocessor, like LESS or SASS, and since without ejecting we have no access to Webpack (and Babel), we also cannot roll our own solution easily. So, we would like to have a way to encapsulate and reuse styles across components.
- Also, we'd like some basic components ready to go at the start of the development (layout grid, button, dialog, menu bar, drawer, progress bar) - the more, the merrier

This is where any one of the competing component frameworks come into play. It appears that the most popular right now is [Material UI](https://material-ui.com/getting-started/installation/).

We'll just add it to the dependency list. To complete the dependency summary, we need to import the font into the root stylesheet, `index.css`.

```css
@import url('https://fonts.googleapis.com/css?family=PT+Sans');
```

That makes sure the `PT Sans` familiy (or any other you choose) will be available to the entire project.

The next step is create the baseline, that will be extended by every component.
That's `withRoot.js`.

First, we [create a theme](https://material-ui.com/customization/themes/), by extending the main theme with custom features:

```javascript
const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[300],
      main: grey[700],
      dark: grey[900],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  typography:{
    fontFamily:['PT Sans']
  }
});
```

Then we create the theme injector that will wrap all of our Components:

```javascript
function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}
```

And then we use it in the Components:

```javascript
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

...

MyComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(MyComponent));
```

`PropTypes` is just a way to check a type for required attributes (in our case `classes`) - a poor man's typing.

`withStyles` links a style sheet to the component, by adding the `classes` property.

`withRoot` adds the previously created baseline theme to the Component.

A few additional notes on Material UI:

- You need to import every component you want to use separately
- You need to import every icon you use separately -- you can find them [here](https://material.io/tools/icons/?style=baseline)
- Material components you want to use often:
  - Button
  - Typography
  - Card
  - Grid