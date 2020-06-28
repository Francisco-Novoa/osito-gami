import React, { useState } from "react"
import { Grid, Typography, Button, makeStyles, FormControl, Select, MenuItem } from "@material-ui/core"
import { FaPlus, FaMinus } from "react-icons/fa"
import { primary, money, secondary } from "../styles"

const smallSize = 85
const largeSize = 500

const useStyles = makeStyles((theme) => ({
    codigo: {
        color: money,
        fontFamily: "roboto",
        fontWeight: "bolder",

    },
    nombre: {
        color: primary,
        fontWeight: "bold",
        fontFamily: "roboto",
    },
    buttons: {
        backgroundColor: secondary,
        color: "white",
        width: "100%",
    },
    ammount: {
        borderColor: secondary,
        borderStyle: "solid",
        borderWidth: 1,
        width: "95%",
        height: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    mLeft: {
        marginLeft: theme.spacing(1),
    },
    comprarSpacing: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    littlePadding: {
        paddingRight: theme.spacing(0.5),
    },
    links: {
        color: primary,
        fontSize: "1.25rem",
        fontWeight: "bold",
        fontFamily: "roboto"
    },
    linkshover: {
        color: primary,
        fontSize: "1.25rem",
        fontWeight: "bold",
        fontFamily: "roboto",
        textDecoration: "underline"
    },
    imgMargin: {
        padding: theme.spacing(0.25),
    }
}))

export default function Display() {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={false} sm={1} ></Grid>
            <Grid item container xs={12} sm={5} justify="center">
                <Grid item xs={11} container direction="column">
                    <Grid
                        item
                        container
                        justify="center"
                        className={classes.imgMargin}>
                        <img
                            src={`https://via.placeholder.com/${largeSize}`}
                            alt="placeholder"
                            width="100%" />
                    </Grid>
                    <Grid
                        item
                        container
                        justify="space-around"
                        alignContent="space-around">
                        <Image source="https://via.placeholder.com" />
                        <Image source="https://via.placeholder.com" />
                        <Image source="https://via.placeholder.com" />
                        <Image source="https://via.placeholder.com" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} sm={5}
                justify="center"
                alignContent="space-around"
                className={classes.mLeft}>
                <Grid item xs={3} sm={12}>
                    <Typography variant="h5" className={classes.codigo}>
                        codigo
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={12} >
                    <Typography variant="h5" className={classes.nombre}>
                        Nombre
                    </Typography>
                </Grid>
                <Grid item xs={3} sm={12}>
                    <Typography variant="h5" className={classes.nombre}>
                        Valor
                    </Typography>
                </Grid>
                <ComprarAction />
            </Grid>
            <Grid item xs={false} sm={1} ></Grid>
        </Grid>

    )
}

function ComprarAction() {
    const [cantidad, setCantidad] = useState(0)
    const classes = useStyles()
    const Plus = () => {
        setCantidad(cantidad + 1)
    }
    const Minus = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1)
        }
    }
    return (
        <Grid container item direction="column" justify="center" xs={12} >
            <Grid item container>
                <Typography className={classes.codigo}>
                    Cantidad
                </Typography>
            </Grid>
            <Grid item container className={classes.noMargin}>
                <Grid item container xs={4} justify="flex-end">
                    <Button
                        className={classes.buttons}
                        onClick={Minus}>
                        <FaMinus />

                    </Button>
                </Grid>
                <Grid item container xs={4} justify="center">
                    <div className={classes.ammount}>
                        {cantidad}
                    </div>
                </Grid>
                <Grid item container xs={4} justify="flex-start">
                    <Button
                        className={classes.buttons}
                        onClick={Plus}>
                        <FaPlus />
                    </Button>
                </Grid>
            </Grid>
            <Grid item container justify="space-between" className={classes.comprarSpacing}>
                <Grid item xs={6} className={classes.littlePadding}>
                    <Button className={classes.buttons}>
                        Añadir al carro
                    </Button>
                </Grid>
                <Grid item xs={6} >
                    <Button className={classes.buttons}>
                        Comprar ahora
                    </Button>
                </Grid>
            </Grid>
            <LinkCompras/>
        </Grid>
    )
}

function Image({ source }) {
    const classes = useStyles()
    return (
        <Grid item container xs={6} sm={6} md={3} className={classes.imgMargin}>
            <img
                src={`${source}/${smallSize}`}
                alt="placeholder"
                width="100%" />
        </Grid>
    )
}

function DropdownEnvio (){
    const classes = useStyles()
    return (
        <FormControl>
        <Select>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    )
}

function LinkCompras({ description}) {
    const [selected, setSelected] = useState(1)
    const classes = useStyles()
    return (
        <>
            {
                selected === 1 ?
                    <Grid item container justify="space-around" >
                        <Button
                            className={classes.linkshover}>
                            Descripcion
                        </Button>
                        <Button
                            className={classes.links}
                            onClick={()=>setSelected(2)}>
                            Envio
                        </Button>
                        <Button
                            className={classes.links}
                            onClick={()=>setSelected(3)}>
                            Medio de Pago
                        </Button>
                    </Grid>
                    : selected === 2 ?
                        <Grid item container justify="space-around" >
                            <Button
                                className={classes.links}
                                onClick={()=>setSelected(1)}>
                                Descripcion
                            </Button>
                            <Button
                                className={classes.linkshover}>
                                Envio
                            </Button>
                            <Button
                                className={classes.links}
                                onClick={()=>setSelected(3)}>
                                Medio de Pago
                            </Button>
                        </Grid>
                        :
                        <Grid item container justify="space-around" >
                            <Button
                                className={classes.links}
                                onClick={()=>setSelected(1)}>
                                Descripcion
                            </Button>
                            <Button
                                className={classes.links}
                                onClick={()=>setSelected(2)}>
                                Envio
                            </Button>
                            <Button
                                className={classes.linkshover}>
                                Medio de Pago
                            </Button>
                        </Grid>
            }
            {
                selected===1?
                "description"
                :selected===2?
                <DropdownEnvio/>
                : "Imagen Medio De Pago"
            }
        </>

    )
}