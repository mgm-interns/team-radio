import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Container, Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';

function CoreTextLink(props: CoreTextLink.Props): React.ReactElement<CoreTextLink.Props> {
  const className = [props.classes.textLink, props.className].join(' ').trim();
  return (
    <Link to={props.linkTo} id={props.id} className={className} style={props.style}>
      <Typography variant={props.variant} color={props.color}>
        {props.children}
      </Typography>
    </Link>
  );
}

namespace CoreTextLink {
  export interface Props extends TextLink.Props, WithStyles<typeof styles> {}
}

export const TextLink: React.ComponentType<TextLink.Props> = withStyles(styles)(CoreTextLink);

export namespace TextLink {
  export interface Props extends Identifiable, Styleable, Container {
    linkTo: string;
    variant?: TextStyle;
    color?: Color;
  }
}

export type TextStyle =
  | 'display1'
  | 'display2'
  | 'display3'
  | 'display4'
  | 'headline'
  | 'title'
  | 'subheading'
  | 'body1'
  | 'body2'
  | 'caption';

export type Color = 'inherit' | 'primary' | 'secondary' | 'default' | 'textPrimary' | 'textSecondary' | 'error';
