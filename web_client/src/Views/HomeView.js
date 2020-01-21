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
        margin: 'auto',
        marginTop: '3%',
    },
    serviceContainer: {
        marginTop: '3%',
    }
});

export default function HomeView() {
    const classes = useStyles();
    const services = [
        {name: 'Google', desc: 'Google description bla bla bla bla bla bla bla bla bla bla bla  bla bla bla bla bla  bla bla bla bla bla  bla bla bla bla bla ', imageUrl: 'https://initiatives.asso.fr/wp-content/uploads/2018/03/google-plus-logo-button.png'},
        {name: 'Facebook', desc: 'Facebook description bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla', imageUrl: 'https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png'},
        {name: 'Intra Epitech', desc: 'Intra Epitech description bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla', imageUrl: 'http://download.seaicons.com/icons/sonya/swarm/256/Poop-icon.png'},
        {name: 'Twitter', desc: 'Twitter description bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla', imageUrl: 'http://observatoire-reussite-educative.fr/fichiers-utiles/photos-logos/pictos/twitter.png/image_preview'}
        ];
    const servicesList = services.map(service => <ServiceCard name={service.name} key={service.name} description={service.desc} imageUrl={service.imageUrl} />);

    return (
        <div>
            <Header/>
            <Grid container>
                <Typography variant="h2" className={classes.title}>
                    Explore our services
                </Typography>
            </Grid>
            <Grid className={classes.serviceContainer} spacing={1} container direction={"column"} justify={"center"}>
                <Grid container direction={"row"} spacing={3} justify={"center"}>
                    {servicesList}
                </Grid>
            </Grid>
        </div>
    );
}