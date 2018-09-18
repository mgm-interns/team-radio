import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

export function CorePicture(props: Picture.CoreProps): React.ReactElement<Picture.CoreProps> {
  return (
    <picture>
      <img className={props.className} sizes={props.sizes} srcSet={props.srcSet} src={props.src} alt={props.alt} />
    </picture>
  );
}

export const Picture = withStyles(styles)(CorePicture);

export namespace Picture {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
  export interface Props extends Identifiable, Styleable {
    sizes: string;
    srcSet: string;
    src: string;
    alt?: string;
  }
}
