import { Card, CardContent, CardHeader, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { styles } from './styles';

export const BaseDashboard = ({ classes }: BaseDashboard.Props) => (
  <Grid container spacing={16} className={classes.root}>
    <Grid item xs={12} md={8} lg={9}>
      <Card>
        <CardHeader title="Welcome to Team radio Dashboard Page" />
        <CardContent>
          <Typography variant="subheading">
            A playlist for teams that can be edited collaboratively by all users.
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="headline">Team radio Client's major features</Typography>
          <ul>
            <li>
              <Typography variant="subheading">Create your own station</Typography>
              <Typography>No need to register an account. Your station will be ready, in just one click.</Typography>
            </li>
            <li>
              <Typography variant="subheading">Search & add song to playlist</Typography>
              <Typography>
                Over 1 billion songs on Youtube are embedded to such a tiny search-box. Live preview helps you choose
                the right song.
              </Typography>
            </li>
            <li>
              <Typography variant="subheading">Share your station</Typography>
              <Typography>
                The playlist is maintained by everyone who joins your station. You can see who are online and react to
                their songs.
              </Typography>
            </li>
          </ul>
        </CardContent>
        <CardContent>
          <Typography variant="headline">Team radio Dashboard's major features</Typography>
          <ul>
            <li>
              <Typography variant="subheading">Manage thousand of users</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur culpa dignissimos
                dolores doloribus exercitationem fuga fugiat fugit iusto mollitia, nulla officia porro quam recusandae
                reprehenderit rerum sint sunt ullam?
              </Typography>
            </li>
            <li>
              <Typography variant="subheading">Manage station's activities</Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur ducimus exercitationem iusto nulla
                numquam possimus velit voluptatum. Adipisci aut consequuntur dolor, dolore earum error explicabo nam
                nulla quia quod ratione.
              </Typography>
            </li>
          </ul>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} md={4} lg={3}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Installation requirement" />
            <CardContent>
              <Typography variant="subheading">System dependencies:</Typography>
              <ul>
                <li>
                  <Typography>NodeJS 10.x</Typography>
                </li>
                <li>
                  <Typography>NPM 4.x</Typography>
                </li>
                <li>
                  <Typography>MongoDB</Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Deployment guide" />
            <CardContent>
              <Typography variant="subheading">Local computer</Typography>
              <ul>
                <li>
                  <Typography>Clone project</Typography>
                </li>
                <li>
                  <Typography>
                    Install dependencies: <code>npm install</code>
                  </Typography>
                </li>
                <li>
                  <Typography>
                    Start the server: <code>npm start</code>
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export namespace BaseDashboard {
  export interface Props extends WithStyles<typeof styles>, Dashboard.Props {}
}

export const Dashboard: React.ComponentType<Dashboard.Props> = withStyles(styles)(BaseDashboard);

export namespace Dashboard {
  export interface Props {}
}
