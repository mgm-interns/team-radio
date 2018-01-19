import Images from '../Theme/Images';

const { logo } = Images;

const landing = {
  name: 'Team Radio',
  logo,
  slogan: 'A Radio station for your Team',
  input: {
    label: 'Your team station',
    placeholder: 'e.g. Awesome Station',
  },
  button: {
    color: 'primary',
    name: 'Create',
  },
  background: {
    src:
      'https://images.unsplash.com/photo-1510130564579-d2caf45b72f3?auto=format&fit=crop&w=1650&q=80',
    alt: 'Team Radio - Background',
  },
  section: {
    cover: {
      title: 'Create your own station',
      description: `No need to register an account. Your station will be ready, in just one click.`,
      windows: Images.windows.stations,
      alt: 'Create your own',
      buttonText: 'Try it now',
    },
    content1: {
      title: 'Search & add song to playlist',
      description: `Over 1 billion songs on Youtube are embedded to such a tiny search-box. Live preview helps you choose the right song.`,
      windows: Images.windows.animatedAddSongs,
      linkTitle: 'Easy to search - Easier to add',
      alt: 'Easy to search - Easier to add',
    },
    content2: {
      title: 'Share your station',
      description: `The playlist is maintained by everyone who joins your station. You can see who are online and react to their songs.`,
      windows: Images.windows.shareStation,
      linkTitle: 'Explore music together',
      alt: 'Explore music together',
    },
  },
};

export default landing;
