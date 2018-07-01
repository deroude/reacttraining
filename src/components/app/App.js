import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import routes from "../../routes";
import MainMenu from "../main-menu";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    content:{
        flexGrow:1,
        marginTop:".6rem"
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
});

class Layout extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <MainMenu />
                <div className={this.props.classes.content}>
                    <Switch>
                        {routes.map(route => <Route key={route.path} {...route} />)}
                    </Switch>
                </div>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Layout));