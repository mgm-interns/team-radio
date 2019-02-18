import { Container, Identifiable, Styleable } from '@Common';
import { Footer, Header } from '@Components';
import { Props as FooterProps } from '@Components/Footer/Footer';
import { Props as HeaderProps } from '@Components/Header/Header';
import { classnames } from '@Themes';
import * as React from 'react';
import { useStyles } from './styles';

const FullLayout: React.FunctionComponent<CoreProps> = ({
  children,
  className,
  id,
  style,
  headerProps = {},
  footerProps = {}
}) => {
  const classes = useStyles();

  return (
    <>
      <Header {...headerProps} />
      <div className={classnames(classes.body, className)} id={id} style={style}>
        {children}
      </div>
      <Footer {...footerProps} />
    </>
  );
};

interface CoreProps extends Props {}

export default FullLayout;

export interface Props extends Styleable, Identifiable, Container {
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
}
