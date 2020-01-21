import React from 'react';
import {useParams} from 'react-router-dom';
import Header from "../Components/Header";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import capitalize from "../Utils/Capitalize";

const useStyles = makeStyles(theme => ({
    cardContainer: {
        marginTop: '10%',
        paddingX: 'auto',
    },
    root: {
        paddingLeft: 'auto',
        paddingRight: 'auto',
    },
    textContainer: {
        textAlign: 'center',
    },
    container: {
        marginTop: '5%',
    }
}));

export default function ServiceView(props) {
    let {name} = useParams();
    const classes = useStyles();

    name = capitalize(name);
    return (
        <div>
            <Header />
            <Grid className={classes.root} container justify={"center"}>
                <Grid item xs={12} md={8} className={classes.textContainer}>
                    <Typography variant={"h2"}>
                        {name} service
                    </Typography>
                </Grid>
                <Grid className={classes.container} container direction={"row"} justify={"space-evenly"}>
                    <p>Toto</p>
                    <p>Toto</p>
                </Grid>
            </Grid>
        </div>
    )
}
