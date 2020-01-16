import React from "react";
import Header from "../Components/Header";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    title: {
        fontWeight: 800,
        fontFamily: "Roboto",
        letterSpacing: '7px',
        margin: 'auto',
    },
});

export default function HomeView() {
    const classes = useStyles();

    return (
        <div>
            <Header/>
            <Grid container>
                <Typography variant="h1" className={classes.title}>
                    Explore
                </Typography>
            </Grid>
        </div>
    );
}