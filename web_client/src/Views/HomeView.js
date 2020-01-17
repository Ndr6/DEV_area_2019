import React from "react";
import Header from "../Components/Header";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import ServiceCard from "../Components/ServiceCard";

const useStyles = makeStyles({
    title: {
        fontWeight: 800,
        fontFamily: "Roboto",
        letterSpacing: '7px',
        margin: 'auto',
    },
    serviceContainer: {
        marginTop: '15px',
    }
});

export default function HomeView() {
    const classes = useStyles();
    const services = ['Google', 'Facebook', 'Intra Epitech', 'Twitter'];
    const servicesList = services.map(service => <ServiceCard name={service} key={service} />);

    return (
        <div>
            <Header/>
            <Grid container>
                <Typography variant="h2" className={classes.title}>
                    Explore services
                </Typography>
            </Grid>
            <Grid className={classes.serviceContainer} spacing={7} container direction={"column"} justify={"center"}>
                {servicesList}
            </Grid>
        </div>
    );
}