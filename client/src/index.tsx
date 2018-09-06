import { Container, FullLayout } from 'Containers';
import { Home } from 'Pages';
import * as React from 'react';
import { render } from 'react-dom';

render(
  <Container>
    <FullLayout>
      <Home />
    </FullLayout>
  </Container>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept();
}
