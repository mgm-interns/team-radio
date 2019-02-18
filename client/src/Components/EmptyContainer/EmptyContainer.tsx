import { Styleable } from '@Common';
import { Typography } from '@material-ui/core';
import { classnames } from '@Themes';
import * as React from 'react';
import { useStyles } from './styles';

const EmptyContainer: React.FunctionComponent<CoreProps> = props => {
  const classes = useStyles();

  const {
    style,
    className,
    noImg,
    label = 'Wow, such empty',
    imgSrc = 'https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L.png'
  } = props;

  return (
    <div style={style} className={classnames(classes.container, className)}>
      {noImg || <img src={imgSrc} alt={label} className={classes.image} />}
      <Typography variant={'h6'} color={'textSecondary'} className={classes.text}>
        {label}
      </Typography>
    </div>
  );
};

interface CoreProps extends Props {}

export default EmptyContainer;

export interface Props extends Styleable {
  label?: string;
  imgSrc?: string;
  noImg?: boolean;
}
