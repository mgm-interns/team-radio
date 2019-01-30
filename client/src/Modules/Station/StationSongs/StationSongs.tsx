import { Identifiable } from '@Common';
import { FakeList } from '@Components';
import { useWindowResizeEffect } from '@Hooks';
import { Card, Icon, Tab, Tabs, Tooltip } from '@material-ui/core';
import { HistoryList, Playlist } from '@Modules';
import { StationPageParams } from '@Pages/StationPage/StationPage';
import { classnames } from '@Themes';
import * as React from 'react';
import { MdFavorite as FavoriteIcon, MdHistory as HistoryIcon, MdQueueMusic as PlaylistIcon } from 'react-icons/md';
import { RouteComponentProps, withRouter } from 'react-router';
import { useTabWidth } from './hooks';
import { useStyles } from './styles';

export enum StationTab {
  PLAYLIST = 'playlist',
  HISTORY_LIST = 'history',
  FAVOURITE_LIST = 'favourite'
}

const TABS = [
  { key: StationTab.PLAYLIST, label: 'Playlist', icon: <PlaylistIcon /> },
  { key: StationTab.HISTORY_LIST, label: 'History', icon: <HistoryIcon /> },
  { key: StationTab.FAVOURITE_LIST, label: 'Favourite', icon: <FavoriteIcon /> }
];

const StationSongs: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const { id, params } = props;

  const activeTab = React.useMemo(() => {
    if (!props.match.params.tab) return StationTab.PLAYLIST;
    return props.match.params.tab;
  }, [props.match.params.tab]);

  const onTabChanged = React.useCallback<(e: React.ChangeEvent<{}>, value: StationTab) => void>((e, value) => {
    e.preventDefault();
    props.history.push(`/station/${props.match.params.stationId}/${value}`);
  }, []);

  const { setTabWidth, shouldRenderIcon } = useTabWidth();
  const tabsRef = React.useRef<{ tabsRef: HTMLElement }>(null);
  const updateTabWidthCallback = React.useCallback(() => {
    if (tabsRef.current) {
      if (!tabsRef.current.tabsRef) throw new Error('Can not find tabsRef. Please check');
      setTabWidth(tabsRef.current.tabsRef.clientWidth);
    }
  }, [tabsRef]);
  // Execute callback when window resize event trigger
  useWindowResizeEffect(updateTabWidthCallback, [updateTabWidthCallback]);
  // Execute callback after render to set initial value for tab width
  React.useLayoutEffect(updateTabWidthCallback, [updateTabWidthCallback]);

  return (
    <Card id={id} className={classes.container}>
      <Tabs
        value={activeTab}
        onChange={onTabChanged}
        indicatorColor={'primary'}
        textColor={'primary'}
        variant={'fullWidth'}
        innerRef={tabsRef}
      >
        {TABS.map(({ key, label, icon }) => (
          <Tab
            key={key}
            value={key}
            className={classnames({ [classes.iconTab]: shouldRenderIcon })}
            icon={
              !shouldRenderIcon ? (
                undefined
              ) : (
                <Tooltip title={label}>
                  <Icon>{icon}</Icon>
                </Tooltip>
              )
            }
            label={shouldRenderIcon ? undefined : label}
            classes={{ wrapper: !shouldRenderIcon ? undefined : classes.tabIconWrapper }}
          />
        ))}
      </Tabs>
      <div className={classes.tabContainer}>
        {activeTab === StationTab.PLAYLIST && <Playlist params={params} />}
        {activeTab === StationTab.HISTORY_LIST && <HistoryList params={params} />}
        {activeTab === StationTab.FAVOURITE_LIST && <FakeList />}
      </div>
    </Card>
  );
};

interface CoreProps extends Props, RouteComponentProps<StationPageParams> {}

export default withRouter(StationSongs);

export interface Props extends Identifiable {
  params: StationPageParams;
}
