import React from 'react';

import { connect } from 'react-redux';
import { getPages, getSelectedPage, getAppTitle } from '../../ducks/navigation';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        // maxWidth: 345,
    }
});

class Page extends React.Component {
    render() {
        const { classes } = this.props;
        if (this.props.pages) {
            console.log(this.props.pages,this.props.match.params.page);
            const page = this.props.pages.find(p => p.name.endsWith("/"+ this.props.match.params.page));
            if(page)
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {page.fields.title.stringValue}
                        </Typography>
                        <Typography component="p">
                            {page.fields.text.stringValue}
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
        return null;
    }
}


Page.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        pages: getPages(state),
        selectedPage: getSelectedPage(state),
        appTitle: getAppTitle(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Page)));