import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import style from './HoverItem.module.scss';

const useStyles = makeStyles((theme) => ({
  paper: {

    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
}));

type HoverItemProps = {
    anchorEl: any,
    styles?: React.CSSProperties,

}

const HoverItem = ({ anchorEl, styles }: HoverItemProps): JSX.Element => {
  const classes = useStyles();
  const open = Boolean(anchorEl);

  const getStyles = () => {
    let elStyles: React.CSSProperties = {};
    if (styles) elStyles = { ...elStyles, ...styles };
    return elStyles;
  };

  return (
    <Popper open={open} anchorEl={anchorEl} transition style={getStyles()}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <div className={classes.paper}>
            <div className={style.header}>
              CN5606
            </div>
            <Grid container style={{ marginTop: 15 }} className={style.content}>
              <Grid item sm={6}>Loco Type:</Grid>
              <Grid item sm={6} style={{}}>
                HHP
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }} className={style.content}>
              <Grid item sm={6}>Make:</Grid>
              <Grid item sm={6} style={{}}>
                GE DASH 8
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }} className={style.content}>
              <Grid item sm={6}>Work Type:</Grid>
              <Grid item sm={6} style={{}}>
                OH, Engine, ...
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }} className={style.content}>
              <Grid item sm={6}>Last OH:</Grid>
              <Grid item sm={6} style={{}}>
                3/20/2015
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: 15 }} className={style.content}>
              <Grid item sm={6}>MW Hrs:</Grid>
              <Grid item sm={6} style={{}}>
                325
              </Grid>
            </Grid>
          </div>
        </Fade>
      )}
    </Popper>
  );
};

export default HoverItem;
