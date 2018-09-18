import { Typography, withStyles, WithStyles } from '@material-ui/core';
import { Container, Identifiable, Styleable } from 'Common';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { styles } from './styles';

export function CoreTextLink(props: Link.CoreProps): React.ReactElement<Link.CoreProps> {
  const className = [props.classes.textLink, props.className].join(' ').trim();
  return (
    <Link to={props.linkTo} id={props.id} className={className} style={props.style}>
      <Typography variant={props.variant} color={props.color}>
        {props.children}
      </Typography>
    </Link>
  );
}

export const TextLink = withStyles(styles)(CoreTextLink);

export namespace Link {
  export interface CoreProps extends Props, WithStyles<typeof styles> {}
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
