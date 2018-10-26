import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { Container, Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { Link } from 'react-router-dom';

function CoreInternalLink(props: CoreInternalLink.Props): React.ReactElement<CoreInternalLink.Props> {
  return (
    <Link
      to={props.href}
      id={props.id}
      className={props.className}
      style={{
        textDecoration: 'none',
        ...props.style
      }}
    >
      {props.disableTypography ? (
        props.children
      ) : (
        <Typography variant={props.variant} color={props.color}>
          {props.children}
        </Typography>
      )}
    </Link>
  );
}

namespace CoreInternalLink {
  export interface Props extends InternalLink.Props {}
}

export const InternalLink: React.ComponentType<InternalLink.Props> = CoreInternalLink;

export namespace InternalLink {
  export interface Props extends Identifiable, Styleable, Container, TypographyProps {
    href: string;
    disableTypography?: boolean;
  }
}
