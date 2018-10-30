import { withStyles, WithStyles } from '@material-ui/core';
import { Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { styles } from './styles';

function Picture(props: CoreProps): React.ReactElement<CoreProps> {
  return (
    <picture>
      <img className={props.className} sizes={props.sizes} srcSet={props.srcSet} src={props.src} alt={props.alt} />
    </picture>
  );
}

interface CoreProps extends WithStyles<typeof styles>, Props {}

export default withStyles(styles)(Picture);

export interface Props extends Identifiable, Styleable {
  sizes: string;
  srcSet: string;
  src: string;
  alt?: string;
}
