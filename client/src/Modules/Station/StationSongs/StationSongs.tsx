import { Card, Icon, Tab, Tabs, Tooltip, withStyles, WithStyles } from '@material-ui/core';
import { Identifiable } from 'Common';
import { HistoryList, Playlist } from 'Modules';
import { RealTimeStationPlayerQueryVariables } from 'RadioGraphql';
import * as React from 'react';
import { MdFavorite as FavoriteIcon, MdHistory as HistoryIcon, MdQueueMusic as PlaylistIcon } from 'react-icons/md';
import { classnames } from 'Themes';
import { styles } from './styles';

class StationSongs extends React.Component<CoreProps, CoreStates> {
  public state: CoreStates = {
    tabValue: 0
  };

  private tabRef?: HTMLDivElement;

  public componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
    this.resizeListener();
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  public render() {
    const { tabValue } = this.state;
    const { classes, params, id } = this.props;
    let shouldRenderIcon: boolean = false;
    if (this.state.tabsWidth && this.state.tabsWidth < 480) {
      shouldRenderIcon = true;
    }

    return (
      <Card id={id} className={classes.container}>
        <Tabs
          value={tabValue}
          onChange={this.handleTabChange}
          indicatorColor={'primary'}
          textColor={'primary'}
          fullWidth
          innerRef={ref => {
            this.tabRef = ref && ref.tabsRef;
          }}
        >
          <Tab
            className={classnames({ [classes.iconTab]: shouldRenderIcon })}
            icon={shouldRenderIcon && this.iconWrapper(<PlaylistIcon />, 'Playlist')}
            label={shouldRenderIcon ? undefined : 'Playlist'}
          />
          <Tab
            className={classnames({ [classes.iconTab]: shouldRenderIcon })}
            icon={shouldRenderIcon && this.iconWrapper(<HistoryIcon />, 'History')}
            label={shouldRenderIcon ? undefined : 'History'}
          />
          <Tab
            className={classnames({ [classes.iconTab]: shouldRenderIcon })}
            icon={shouldRenderIcon && this.iconWrapper(<FavoriteIcon />, 'Favorite')}
            label={shouldRenderIcon ? undefined : 'Favorite'}
          />
        </Tabs>
        {tabValue === 0 && this.generateTabContainer(<Playlist params={params} />)}
        {tabValue === 1 && this.generateTabContainer(<HistoryList params={params} />)}
        {tabValue === 2 && this.generateTabContainer()}
      </Card>
    );
  }

  private iconWrapper = (icon: React.ReactNode, tooltip: string) => {
    return (
      <Tooltip title={tooltip}>
        <Icon>{icon}</Icon>
      </Tooltip>
    );
  };

  // TODO: fetch data for each tab
  private generateTabContainer = (tab?: React.ReactNode): React.ReactElement<{}> => {
    const { classes } = this.props;
    let content: React.ReactNode = tab;
    if (!tab) {
      content = Array.from({ length: 20 }).map((item, index) => (
        <div key={index} style={{ height: 80, marginTop: 4, marginBottom: 4, background: 'grey' }} />
      ));
    }
    return <div className={classes.tabContainer}>{content}</div>;
  };

  private handleTabChange = (event: React.ChangeEvent<{}>, value: number): void => {
    event.preventDefault();
    this.setState({
      tabValue: value
    });
  };

  private resizeListener = () => {
    if (this.tabRef) {
      this.setState({ tabsWidth: this.tabRef.clientWidth });
    }
  };
}

interface CoreProps extends WithStyles<typeof styles>, Props {}
interface CoreStates {
  tabValue: number;
  tabsWidth?: number;
}

export default withStyles(styles)(StationSongs);

export interface Props extends Identifiable {
  params: RealTimeStationPlayerQueryVariables;
}
