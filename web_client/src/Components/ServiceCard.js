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
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";

const styles = makeStyles({
    card: {
        backgroundColor: 'white',
    },
    cardContainer: {
        width: '100%',
        margin: '15px',
        transition: '0.4s',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.03)'
        }
    },
    heart: {
        marginRight: 'auto',
    },
    actionContainer: {
        justifyContent: 'flex-end',
    },
    cardHeader: {
        position: 'relative',
        textAlign: 'center'
    },
    headerIcon: {
        position: 'absolute',
        left: '0px',
    },
    cardMedia: {
        width: '32px',
        height: '32px',
        position: 'absolute',
        left: '0px',
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
        <Grid item className={classes.cardContainer} xs={10} sm={8} md={5}>
            <Card elevation={5} className={classes.card}>
                <CardContent>
                    <Box pb={2}>
                        <Grid className={classes.cardHeader}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={props.imageUrl}
                                title={"Logo"}
                            />
                            <Typography variant={"h6"}>
                                {props.name}
                            </Typography>
                        </Grid>
                    </Box>
                    <Grid item>
                        <Typography variant={"p"}>
                            {props.description}
                        </Typography>
                    </Grid>
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