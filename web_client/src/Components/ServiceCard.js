import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CardActions} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {ArrowForward} from "@material-ui/icons";

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
    },
    heart: {
        marginRight: 'auto',
    },
    actionContainer: {
        justifyContent: 'flex-end',
    }
});

export default function ServiceCard(props) {
    const classes = styles();

    const [isSubscribed, setSubscribed] = useState(false);

    const subscribe = () => {
        //TODO: Api request
        setSubscribed(!isSubscribed);
    };

    return (
        <Grid item className={classes.cardContainer} xs={12} sm={8} md={5}>
            <Card elevation={5} className={classes.card}>
                <CardContent>
                    <Typography variant={"h6"}>
                        {props.name}
                    </Typography>
                    <Typography variant={"p"}>
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actionContainer}>
                    <IconButton className={classes.heart} onClick={subscribe} aria-label="Subscribe">
                        <FavoriteIcon color={isSubscribed ? 'secondary' : 'disabled'}/>
                    </IconButton>
                    <IconButton aria-label="Go to service">
                        <ArrowForward />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}