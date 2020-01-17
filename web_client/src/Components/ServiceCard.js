import React from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles({
    card: {
        backgroundColor: 'white',
    },
    cardContainer: {
        width: '100%',
        margin: 'auto',
        transition: '0.4s',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1)'
        }
    }
});

export default function serviceCard(props) {
    const classes = styles();

    return (
        <Grid item className={classes.cardContainer} xs={12} sm={8} md={5}>
            <Card elevation={5} className={classes.card}>
                <CardContent>
                    <Typography variant={"h6"}>
                        {props.name}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}