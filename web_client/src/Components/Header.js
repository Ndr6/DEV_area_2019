import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    appBar: {
        backgroundColor: '#292929'
    },
    title: {
        flexGrow: 1,
        fontWeight: '800',
        letterSpacing: '2px',
        color: 'white',
    },
    links: {
        fontWeight: '800',
        letterSpacing: '2px',
        color: 'white',
        padding: '10px',
    }
});

function Header() {
    const classes = styles();

    return(
        <div className={classes.root}>
            <AppBar position="static" classes={{root: classes.appBar}}>
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" />
                    <Typography variant="h6" className={classes.title}>
                        AREA
                    </Typography>
                    <Typography variant="h6" className={classes.links}>
                        SIGN IN
                    </Typography>
                    <Typography variant="h6" className={classes.links}>
                        SIGN UP
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;