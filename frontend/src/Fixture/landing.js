import Images from '../Theme/Images';

const { avatar1, avatar2, avatar3, avatar4, avatar5 } = Images.fixture;

const landing = {
  name: 'team station',
  slogan: 'Music in the sould can be heard by the universe',
  stations: [
    {
      id: '1',
      name: 'station 1',
      describe: 'Internship 2017',
      owner: 'lybaokhanh',
      avatar: avatar1,
    },
    {
      id: '2',
      name: 'station 2',
      describe: 'A12',
      owner: 'lybaokhanh',
      avatar: avatar2,
    },
    {
      id: '3',
      name: 'station 3',
      describe: 'DHL',
      owner: 'lybaokhanh',
      avatar: avatar3,
    },
    {
      id: '4',
      name: 'station 4',
      describe: 'Internship 2016',
      owner: 'lybaokhanh',
      avatar: avatar4,
    },
    {
      id: '4',
      name: 'station 4',
      describe: 'MGM Channel',
      owner: 'lybaokhanh',
      avatar: '',
    },
    {
      id: '5',
      name: 'station 5',
      describe: 'MGM Class',
      owner: 'lybaokhanh',
      avatar: avatar5,
    },
  ],
};

export default landing;
