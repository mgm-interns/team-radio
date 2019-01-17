import * as React from 'react';

export function useTabWidth() {
  const [tabsWidth, setTabWidth] = React.useState<number | null>(null);

  return {
    tabsWidth,
    setTabWidth,
    shouldRenderIcon: tabsWidth && tabsWidth < 480
  };
}
