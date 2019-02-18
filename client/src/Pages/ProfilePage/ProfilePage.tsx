import { FullLayout } from '@Containers';
import { ToastContext, ToastSeverity, UserProfile, withAuthenticated } from '@Modules';
import { CurrentUserQuery, UserQuery } from '@RadioGraphql';
import * as React from 'react';
import * as ReactApolloHooks from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router';
import { useStyles } from './styles';

export enum ProfileTab {
  ABOUT = 'about',
  FAVOURITE = 'favourite',
  UPDATE = 'update'
}

const ProfilePage: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const tabs = React.useMemo(() => {
    if (props.match.params.userId) {
      return [{ key: ProfileTab.ABOUT, label: 'About' }];
    }
    return [
      { key: ProfileTab.ABOUT, label: 'About' },
      { key: ProfileTab.FAVOURITE, label: 'Favourite' },
      { key: ProfileTab.UPDATE, label: 'Update' }
    ];
  }, [props.match.params]);

  const activeTab = React.useMemo<ProfileTab>(() => {
    if (!props.match.params.tab) return ProfileTab.ABOUT;
    return props.match.params.tab;
  }, [props.match.params.tab]);

  const onTabChanged = React.useCallback<(e: React.ChangeEvent<{}>, value: ProfileTab) => void>((e, tab) => {
    e.preventDefault();
    const { userId } = props.match.params;
    const basePath = userId ? '/u' : '/profile';
    const userIdPath = userId ? `/${userId}` : '';
    props.history.push(`${basePath}${userIdPath}/${tab}`);
  }, []);

  const isCurrentUser = React.useMemo<boolean>(() => {
    const { userId } = props.match.params;
    return !userId;
  }, []);

  const isCurrentUserQueryData = React.useCallback(
    (data: CurrentUserQuery.Response | UserQuery.Response): data is CurrentUserQuery.Response => {
      return !!(data as CurrentUserQuery.Response).currentUser;
    },
    []
  );

  const userQuery = ReactApolloHooks.useQuery<
    CurrentUserQuery.Response | UserQuery.Response,
    CurrentUserQuery.Variables | UserQuery.Variables
  >(isCurrentUser ? CurrentUserQuery.QUERY : UserQuery.QUERY, {
    suspend: false,
    variables: { id: props.match.params.userId }
  });

  const toastContext = React.useContext(ToastContext);

  React.useEffect(() => {
    if (userQuery.error) {
      toastContext.add({ severity: ToastSeverity.ERROR, message: 'User not found.' });
      props.history.push('/');
    }
  }, [userQuery.error]);

  return (
    <FullLayout headerProps={{ position: 'fixed', classes: { appBar: classes.appBar } }}>
      <UserProfile
        tabs={tabs}
        activeTab={activeTab}
        onTabChanged={onTabChanged}
        user={
          userQuery.data && (isCurrentUserQueryData(userQuery.data) ? userQuery.data.currentUser : userQuery.data.item)
        }
        loading={userQuery.loading}
      />
    </FullLayout>
  );
};

interface CoreProps extends Props, RouteComponentProps<PageParams> {}

export default withAuthenticated('/', 'You need to login to be able to visit this page.')(withRouter(ProfilePage));

export interface PageParams {
  tab?: ProfileTab;
  userId?: string;
}

export interface Props {}
