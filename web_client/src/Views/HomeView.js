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
    const services = [
        {name: 'Google', desc: 'Google description bla bla bla bla bla bla bla bla bla bla bla  bla bla bla bla bla  bla bla bla bla bla  bla bla bla bla bla '},
        {name: 'Facebook', desc: 'Facebook description bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla'},
        {name: 'Intra Epitech', desc: 'Intra Epitech description bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla'},
        {name: 'Twitter', desc: 'Twitter description bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla'}
        ];
    const servicesList = services.map(service => <ServiceCard name={service.name} key={service.name} description={service.desc} />);

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