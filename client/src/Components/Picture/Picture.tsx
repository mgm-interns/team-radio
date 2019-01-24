import { Identifiable, Styleable } from '@Common';
import * as React from 'react';
import { useStyles } from './styles';

function Picture(props: CoreProps): React.ReactElement<CoreProps> {
  const classes = useStyles();
  return (
    <picture>
      <img className={props.className} sizes={props.sizes} srcSet={props.srcSet} src={props.src} alt={props.alt} />
    </picture>
  );
}

interface CoreProps extends Props {}

export default Picture;

export interface Props extends Identifiable, Styleable {
  sizes: string;
  srcSet: string;
  src: string;
  alt?: string;
}
