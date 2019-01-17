import { Card, Icon, Tab, Tabs, Theme, Tooltip } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { Identifiable } from 'Common';
import { useWindowResizeEffect } from 'Hooks';
import { HistoryList, Playlist } from 'Modules';
import { RealTimeStationPlayerQueryVariables } from 'RadioGraphql';
import * as React from 'react';
import { MdFavorite as FavoriteIcon, MdHistory as HistoryIcon, MdQueueMusic as PlaylistIcon } from 'react-icons/md';
import { classnames, ThemeType } from 'Themes';
import { useTabWidth } from './hooks';
import { useStyles } from './styles';

const StationSongs: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const { params, id } = props;

  const [tabValue, setTabValue] = React.useState<number>(0);
  const onTabChanged = React.useCallback<(event: React.ChangeEvent<{}>, value: number) => void>(
    (event, value) => {
      event.preventDefault();
      setTabValue(value);
    },
    [tabValue]
  );

  const { setTabWidth, shouldRenderIcon } = useTabWidth();
  const tabsRef = React.useRef<{ tabsRef: HTMLElement }>(null);
  const updateTabWidthCallback = React.useCallback(
    () => {
      if (tabsRef.current) {
        if (!tabsRef.current.tabsRef) throw new Error('Can not find tabsRef. Please check');
        setTabWidth(tabsRef.current.tabsRef.clientWidth);
      }
    },
    [tabsRef]
  );
  // Execute callback when window resize event trigger
  useWindowResizeEffect(updateTabWidthCallback, [updateTabWidthCallback]);
  // Execute callback after render to set initial value for tab width
  React.useLayoutEffect(updateTabWidthCallback, [updateTabWidthCallback]);

  const iconWrapper = React.useCallback<(icon: React.ReactNode, tooltip: string) => React.ReactElement<any>>(
    (icon, tooltip) => {
      return (
        <Tooltip title={tooltip}>
          <Icon>{icon}</Icon>
        </Tooltip>
      );
    },
    []
  );

  const theme = useTheme<Theme>();
  const containerWrapper = React.useCallback<(tab?: React.ReactNode) => React.ReactNode>(
    tab => {
      let content: React.ReactNode = tab;
      if (!tab) {
        const bg = theme.palette.type === ThemeType.DARK ? theme.palette.grey['600'] : theme.palette.grey['300'];
        content = Array.from({ length: 20 }).map((item, index) => (
          <div key={index} style={{ background: bg, height: 80, marginTop: 4, marginBottom: 4 }} />
        ));
      }
      return <div className={classes.tabContainer}>{content}</div>;
    },
    [classes]
  );

  return (
    <Card id={id} className={classes.container}>
      <Tabs
        value={tabValue}
        onChange={onTabChanged}
        indicatorColor={'primary'}
        textColor={'primary'}
        variant={'fullWidth'}
        innerRef={tabsRef}
      >
        <Tab
          className={classnames({ [classes.iconTab]: shouldRenderIcon })}
          icon={shouldRenderIcon && iconWrapper(<PlaylistIcon />, 'Playlist')}
          label={shouldRenderIcon ? undefined : 'Playlist'}
          classes={{ wrapper: shouldRenderIcon ? classes.tabIconWrapper : undefined }}
        />
        <Tab
          className={classnames({ [classes.iconTab]: shouldRenderIcon })}
          icon={shouldRenderIcon && iconWrapper(<HistoryIcon />, 'History')}
          label={shouldRenderIcon ? undefined : 'History'}
          classes={{ wrapper: shouldRenderIcon ? classes.tabIconWrapper : undefined }}
        />
        <Tab
          className={classnames({ [classes.iconTab]: shouldRenderIcon })}
          icon={shouldRenderIcon && iconWrapper(<FavoriteIcon />, 'Favorite')}
          label={shouldRenderIcon ? undefined : 'Favorite'}
          classes={{ wrapper: shouldRenderIcon ? classes.tabIconWrapper : undefined }}
        />
      </Tabs>
      {tabValue === 0 && containerWrapper(<Playlist params={params} />)}
      {tabValue === 1 && containerWrapper(<HistoryList params={params} />)}
      {tabValue === 2 && containerWrapper()}
    </Card>
  );
};

interface CoreProps extends Props {}

export default StationSongs;

export interface Props extends Identifiable {
  params: RealTimeStationPlayerQueryVariables;
}
