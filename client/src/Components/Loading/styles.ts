import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ zIndex }: Theme) =>
  createStyles({
    container: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fullScreen: {
      position: 'fixed',
      zIndex: zIndex.fullScreenLoading
    }
  });
