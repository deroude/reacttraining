/*
 * (c)Mindit 2018
 * Last modified: Friday, 22nd June 2018 2:23:09 pm
 * Author: Valentin Raduti (valentin.raduti@mindit.io>)
 */
import React from 'react';

import { connect } from 'react-redux';
import { actions as navActions, getPages, getSelectedPage, getAppTitle } from '../../ducks/navigation';
import { isLoading, getError } from '../../ducks/progress';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import withRoot from '../withRoot';


const styles = theme => ({
    toolbar: {
        background: grey[900],
        height: '4rem',
        '&>a': {
            textTransform: 'none'
        }
    }
});

class MainMenu extends React.Component {

    componentWillMount() {
        if (!this.props.pages || this.props.pages.length <= 0)
            this.props.loadPages();
    }

    getSlug(fullPath) {
        return fullPath.substring(fullPath.lastIndexOf("/")+1);
    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    {
                        this.props.pages ?
                            this.props.pages.map(p => <Button color="inherit" key={this.getSlug(p.name)} component={Link} to={"/page/" + this.getSlug(p.name)}>{p.fields.title.stringValue}</Button>)
                            : null
                    }
                </Toolbar>
                <LinearProgress value={0} variant={this.props.loading ? "indeterminate" : "determinate"} />
            </AppBar>
        );
    }
}

MainMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        pages: getPages(state),
        selectedPage: getSelectedPage(state),
        loading: isLoading(state),
        loadError: getError(state),
        appTitle: getAppTitle(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadPages: () => dispatch(navActions.loadAllPages()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(MainMenu)));