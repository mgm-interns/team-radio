import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

function CorePicture(props: CorePicture.Props): React.ReactElement<CorePicture.Props> {
  return (
    <picture>
      <img className={props.className} sizes={props.sizes} srcSet={props.srcSet} src={props.src} alt={props.alt} />
    </picture>
  );
}

namespace CorePicture {
  export interface Props extends Picture.Props, WithStyles<typeof styles> {}
}

export const Picture: React.ComponentType<Picture.Props> = withStyles(styles)(CorePicture);

export namespace Picture {
  export interface Props extends Identifiable, Styleable {
    sizes: string;
    srcSet: string;
    src: string;
    alt?: string;
  }
}
