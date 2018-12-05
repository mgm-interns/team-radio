import { createStyles, Theme } from '@material-ui/core';

export const styles = ({ palette, spacing, typography }: Theme) =>
  createStyles({
    iconButton: {
      fontSize: typography.body1.fontSize,
      marginRight: spacing.smallUnit,
      marginLeft: spacing.smallUnit
    }
  });
