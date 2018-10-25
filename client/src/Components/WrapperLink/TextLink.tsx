import { withStyles, WithStyles } from '@material-ui/core';
import { Container, Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';

function CoreWrapperLink(props: CoreWrapperLink.Props): React.ReactElement<CoreWrapperLink.Props> {
  const className = [props.classes.container, props.className].join(' ').trim();
  return (
    <Link to={props.linkTo} id={props.id} className={className} style={props.style}>
      {props.children}
    </Link>
  );
}

namespace CoreWrapperLink {
  export interface Props extends WrapperLink.Props, WithStyles<typeof styles> {}
}

export const WrapperLink: React.ComponentType<WrapperLink.Props> = withStyles(styles)(CoreWrapperLink);

export namespace WrapperLink {
  export interface Props extends Identifiable, Styleable, Container {
    linkTo: string;
  }
}
