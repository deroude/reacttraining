import React from 'react';
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
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Welcome to Mindit
                    </Typography>
                    <Typography component="p">
                        Nulla interdum lacus vel felis porttitor, eget euismod velit sagittis. In hac habitasse platea dictumst. Pellentesque nec pharetra augue. Fusce non accumsan erat. Sed vitae blandit felis. Phasellus tempor orci et neque auctor, eget ullamcorper ante cursus. Pellentesque malesuada nisl et ligula viverra, eu vehicula mauris aliquam. Proin nulla massa, tempus accumsan imperdiet at, feugiat placerat eros. Duis diam tortor, hendrerit ac suscipit quis, bibendum sed est. Fusce tincidunt metus vitae erat imperdiet fringilla. Duis ultrices libero nec quam consectetur imperdiet.
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}


Page.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Page));