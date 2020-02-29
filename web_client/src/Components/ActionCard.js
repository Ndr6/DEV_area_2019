import React from 'react';
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = makeStyles({
    card: {
        width: '256px',
        height: '256px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        backgroundBlendMode: 'color',
        backgroundSize: 'contain',
        transition: '0.3s',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)',
            transform: 'scale(1.03)',
            cursor: 'pointer',
        }
    },
    text: {
        textShadow: '2px 4px 3px rgba(0,0,0,0.3);',
        color: 'white',
        paddingBottom: '20px',
    },
    textContainer: {
        textAlign: 'center'
    },
    buttonContainer: {
        paddingTop: '20px',
    },
});


export default function ActionCard({action, image}) {
    const classes = styles();

    return (
        <Card elevation={3} className={classes.card} style={{backgroundImage: `url("${image}")`}}>
            <CardContent>
                <Grid container justify="center" alignItems="flex-end">
                    <Grid className={classes.textContainer} item>
                        <Typography variant="h4" className={classes.text}>
                            {action.title}
                        </Typography>
                    </Grid>
                    <Grid className={classes.textContainer} item>
                        <Typography variant="body1" className={classes.text}>
                            {action.description}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.buttonContainer}>
                        <Button className={classes.button} variant={"contained"}>
                            Configure
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
