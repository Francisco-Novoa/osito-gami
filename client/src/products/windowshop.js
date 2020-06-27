import React from "react"
import { Grid, Button, Typography, Card, CardActionArea, CardMedia, makeStyles, CardContent } from '@material-ui/core';
import { primary, money, secondary } from "../styles"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    media: {
        height: 140,
    },
    title: {
        color: secondary,
        textAlign: "center",
        fontWeight: 600,
        marginTop: theme.spacing(4),
    },
    precio: {
        color: money,
        textAlign: "center",
    },
    subtitle: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttons: {
        borderColor: secondary,
        color: primary,
        width: "100%",
    }
}))


function Product() {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://via.placeholder.com/250"
                        title="product title"
                    />
                    <CardContent >
                        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                            Joya #
                  </Typography>
                        <Typography className={classes.precio} gutterBottom variant="h5" component="h2">
                            Precio
                  </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    )
}

export default function WindowShop({ ...props }) {
    const classes = useStyles();
    return (
        <Grid container direction="column" xs={12}>
            <Grid item>
                <Typography variant="h2" className={classes.title}>
                    Nuevos
                </Typography>
            </Grid>
            <Grid item container xs={12} >
                <Grid item xs={0} sm={1}></Grid>
                <Grid container xs={12} sm={10}>
                    
                    <Grid item xs={12} container>
                        <Grid item xs={0} sm={9}></Grid>
                        <Grid
                            item
                            xs={12}
                            sm={3}
                            container
                            className={classes.subtitle}>
                            <Button
                                className={classes.buttons}
                                variant="outlined">
                                Destacados
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={3} className={classes.subtitle}>
                        <Button
                            className={classes.buttons}
                            variant="outlined">
                            Productos
                        </Button>
                    </Grid>

                    <Grid item container xs={12} sm={9}>
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </Grid>

                </Grid>
                <Grid item xs={0} sm={1}></Grid>
            </Grid>
        </Grid>
    )
} 