import { createStyles } from '@material-ui/core';
import { RadioTheme } from 'Themes';

export const styles = ({ palette, spacing }: RadioTheme) =>
  createStyles({
    container: {
      // width: '100vw',
      // overflowX: 'hidden'
    },
    backgroundContainer: {
      background: palette.secondary.dark,
      height: '100vh'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'opacity(0.4)'
    },
    pageInfoContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      color: palette.common.white
    },
    homeBio: {
      textAlign: 'center',
      marginBottom: spacing.hugeUnit
    },
    stationCreator: {
      display: 'flex',
      flexDirection: 'column'
    },
    stationsList: {
      display: 'flex',
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      height: '184px',
      overflowX: 'auto',
      overflowY: 'hidden'
    },
    stationContainer: {
      width: '20%'
    },
    stationImg: {
      height: '100%',
      objectFit: 'contain',
      display: 'block',
      margin: 'auto',
      position: 'relative'
    },
    onlineNumber: {
      display: 'flex',
      position: 'absolute',
      bottom: 0,
      background: 'rgba(0,0,0,0.4)'
    }
  });
