import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { Container, Identifiable, Styleable } from 'Common';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { classnames } from 'Themes';
import { useStyles } from './styles';

function InternalLink(props: CoreProps): React.ReactElement<CoreProps> {
  const classes = useStyles();
  const { id, href, className, disableTypography, children, style } = props;
  return (
    <Link to={href} id={id} className={classnames(classes.container, className)} style={style}>
      {disableTypography ? children : <Typography {...props.TypographyProps}>{props.children}</Typography>}
    </Link>
  );
}

interface CoreProps extends Props {}

export default InternalLink;

export interface Props extends Identifiable, Styleable, Container {
  href: string;
  disableTypography?: boolean;
  TypographyProps?: TypographyProps;
}
