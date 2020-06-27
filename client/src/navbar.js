import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import { FaShoppingCart } from "react-icons/fa"
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai"
import { primary, secondary, iconSize } from "./styles"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: primary,
        marginTop: theme.spacing(4),
        height: theme.spacing(10),
    },
    Grid: {
        height: "100%",
    },
    socialMedia: {
        paddingLeft: theme.spacing(3),
    },
    shoppingCart: {
        paddingRight: theme.spacing(3),
    },
    colorPrimary: {
        backgroundColor: primary
    },
    Navbar: {
        borderTopWidth: theme.spacing(0.75),
        borderBottomWidth: theme.spacing(0.75),
        borderColor: secondary,
        marginBottom:theme.spacing(1),
        borderStyle: "solid",
    },
    navElement: {
        textAlign:"center",
        color: primary,
        fontWeight: 725,
        fontSize: "2.5rem",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    margins: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
    }
}))


export default function Navbar() {
    const classes = useStyles();
    return (
        <div>
            <Grid container justify="space-between" className={classes.root} position="static" alignContent="center">
                <Grid item className={classes.socialMedia}>
                    <Button className={classes.colorPrimary} variant="contained" disableElevation>
                        <AiFillFacebook size={iconSize} color={"white"} />
                    </Button>
                    <Button className={classes.colorPrimary} variant="contained" disableElevation>
                        <AiFillInstagram size={iconSize} color={"white"} />
                    </Button>
                </Grid>
                <Grid item className={classes.shoppingCart} >
                    <Button className={classes.colorPrimary} variant="contained" disableElevation>
                        <FaShoppingCart size={iconSize} color={"white"} />
                    </Button>
                </Grid>
            </Grid>
            <Grid container className={classes.margins} justify="center" alignContent="center">
                <Grid item>
                    <img src="https://via.placeholder.com/150" alt="" />
                </Grid>
            </Grid>
            <Grid container className={classes.Navbar} justify="space-around">
                <Grid item xs={12} sm={12} md={4}>
                    <Typography variant="h4" className={classes.navElement}>
                        Accesorios
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Typography variant="h4" className={classes.navElement}>
                        Decoracion
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Typography variant="h4" className={classes.navElement}>
                        Personalizado
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}