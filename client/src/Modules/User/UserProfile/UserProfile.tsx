import { EmptyContainer, Loading } from '@Components';
import { Card, CardContent, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { TabProps as MuiTabProps } from '@material-ui/core/Tab';
import { ProfileTab } from '@Pages';
import { classnames } from '@Themes';
import * as React from 'react';
import { useStyles } from './styles';

const UserProfile: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState(props.tabs[0].key);

  const onTabChanged = React.useCallback<(e: React.ChangeEvent<{}>, value: ProfileTab) => void>((e, value) => {
    e.preventDefault();
    setActiveTab(value);
  }, []);

  // TODO: Handle error case when the loading is false but user still empty
  if (props.loading || !props.user) return <Loading fullScreen />;

  return (
    <div className={classes.container}>
      <div className={classnames(classes.section, classes.coverImgSection)}>
        <img
          src={
            props.user.coverUrl ||
            'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?cs=srgb&dl=audio-black-and-white-black-and-white-6966.jpg&fm=jpg'
          }
          alt="Background image"
          className={classes.coverImg}
        />
      </div>
      <div className={classnames(classes.section, classes.contentSection, classes.avatarSection)}>
        <img
          src={
            props.user.avatarUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_in3Kez5oPAdC7ZbDM_9wLJLhuWsZjA0z55dP8yDWhCcXGKJ3'
          }
          alt="Hello"
          className={classnames(classes.avatarImg, {
            [classes.primaryAvatarImg]: (props.activeTab || activeTab) === props.tabs[0].key
          })}
        />
        <Card>
          <Tabs
            value={props.activeTab || activeTab}
            onChange={props.onTabChanged || onTabChanged}
            className={classes.tabs}
            indicatorColor={'primary'}
            textColor={'primary'}
            variant={'fullWidth'}
          >
            {props.tabs.map(tabProps => (
              <Tab value={tabProps.key} {...tabProps} />
            ))}
          </Tabs>
        </Card>
      </div>
      <div className={classnames(classes.section, classes.contentSection, classes.tabContentSection)}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Basic information</Typography>
                <Typography color="textSecondary">Email</Typography>
                <Typography component="p">{props.user.email}</Typography>
                <Typography color="textSecondary">Username</Typography>
                <Typography component="p">{props.user.username}</Typography>
                <Typography color="textSecondary">Full name</Typography>
                <Typography component="p">{props.user.name || 'Unnamed'}</Typography>
                <Typography color="textSecondary">Country</Typography>
                <Typography component="p">{props.user.country || 'Unknown'}</Typography>
                <Typography color="textSecondary">City</Typography>
                <Typography component="p">{props.user.city || 'Unknown'}</Typography>
                <Typography color="textSecondary">Bio</Typography>
                <Typography component="p">{props.user.bio || 'No bio about this user.'}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
            <Card>
              <CardContent>
                <Typography variant="h5">Activities</Typography>
                <EmptyContainer />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

interface CoreProps extends Props {}

export default UserProfile;

interface TabProps extends MuiTabProps {
  key: string;
}

export interface Props {
  tabs: TabProps[];
  activeTab?: ProfileTab;
  onTabChanged?: (event: React.ChangeEvent<{}>, value: ProfileTab) => void;
  user?: UserInformation;
  loading?: boolean;
}

export interface UserInformation {
  id: string;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  name?: string;
  country?: string;
  city?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
}
