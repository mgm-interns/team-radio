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
      title: 'Create your own',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      windows: Images.windows.stations,
      alt: 'Create your own',
    },
    content1: {
      title: 'Add link to playlist',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      windows: Images.windows.addSongs,
      linkTitle: 'Share your passion',
      alt: 'Share your passion',
    },
    content2: {
      title: 'Share your station',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      windows: Images.windows.link,
      linkTitle: 'Share your passion',
      alt: 'Share your passion',
    },
  },
};

export default landing;
