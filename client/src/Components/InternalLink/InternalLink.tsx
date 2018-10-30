import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { Container, Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { Link } from 'react-router-dom';

function InternalLink(props: CoreProps): React.ReactElement<CoreProps> {
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

interface CoreProps extends Props {}

export default InternalLink;

export interface Props extends Identifiable, Styleable, Container, TypographyProps {
  href: string;
  disableTypography?: boolean;
}
