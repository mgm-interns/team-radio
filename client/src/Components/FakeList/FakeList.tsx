import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { ThemeType } from '@Themes';
import * as React from 'react';

const FakeList: React.FunctionComponent<CoreProps> = ({ count = 20, itemHeight = 80 }) => {
  const theme = useTheme<Theme>();
  const background = theme.palette.type === ThemeType.DARK ? theme.palette.grey['600'] : theme.palette.grey['300'];

  return (
    <>
      {Array.from({ length: count }).map((item, index) => (
        <div key={index} style={{ background, height: itemHeight, marginTop: 4, marginBottom: 4 }} />
      ))}
    </>
  );
};

export interface CoreProps extends Props {}

export default FakeList;

export interface Props {
  itemHeight?: number;
  count?: number;
}
