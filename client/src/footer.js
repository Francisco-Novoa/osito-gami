import React from "react"
import { Grid, makeStyles, Typography } from "@material-ui/core"
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai"
import { FaWhatsapp, FaRegEnvelope } from "react-icons/fa"
import { primary, iconSize } from "./styles"


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: primary,
        marginTop: theme.spacing(4),
        height: "100%",
        padding: theme.spacing(2)
    },
    title: {
        color: "white",
        fontWeight: 600,
    },
    subtitle: {
        color: "white",
    },
    column: {
        marginTop: theme.spacing(2)
    },
    iconsContact:{
        paddingLeft:theme.spacing(1)
    }
}))

export default function Footer() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} justify="space-around">

            <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={3}
                className={classes.column}>
                <Grid item container justify="center">
                    <img src="https://via.placeholder.com/150" alt="" />
                </Grid>

                <Grid item container justify="center">
                    <Grid item>
                        <AiFillFacebook size={iconSize} color={"white"} />
                    </Grid>
                    <Grid item>
                        <AiFillInstagram size={iconSize} color={"white"} />
                    </Grid>
                </Grid>
            </Grid>

            <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={3}
                alignContent="center"
                className={classes.column}>
                <Typography variant="h5" className={classes.title}>
                    NOSOTROS
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Quienes Somos
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Contactos
                </Typography>
            </Grid>

            <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={3}
                alignContent="center"
                className={classes.column}>
                <Typography variant="h5" className={classes.title}>
                    INFORMACIÓN
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Buscar
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Envios
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Cambios y Devolucions
                </Typography>
                <Typography variant="h6" className={classes.subtitle}>
                    Terminos y Condiciones
                </Typography>
            </Grid>

            <Grid
                item
                container
                direction="column"
                xs={12}
                sm={6}
                md={3}
                alignContent="space-around"
                className={classes.column}>
                <Grid container alignContent="center" justify="center">
                    <Typography variant="h5" className={classes.title}>
                        CONTACTO
                    </Typography>
                </Grid>
                <Grid container alignContent="center" justify="center">
                    <Grid item xs={4} container justify="flex-end" >
                        <FaWhatsapp size={iconSize} color={"white"} />
                    </Grid>
                    <Grid item xs={8} container justify="flex-start" className={classes.iconsContact}>
                        <Typography variant="h6" className={classes.subtitle}>
                            : +569 77419498
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignContent="center" justify="center">
                    <Grid item xs={4} container justify="flex-end">
                        <FaRegEnvelope size={iconSize} color={"white"} />
                    </Grid>
                    <Grid item xs={8} container justify="flex-start" className={classes.iconsContact}>
                        <Typography variant="h6" className={classes.subtitle}>
                            : osito.gami.cl@gmail.com
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>

        </Grid>
    )
} 