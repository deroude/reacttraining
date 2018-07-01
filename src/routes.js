import Home from './components/home';
import Page from './components/page';

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