import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { createStyles, makeStyles } from "@material-ui/core";

import { Molec } from "shared/ui";
import { Theme } from "shared/types";
import clsx from "clsx";

interface Props {
  title?: string;
  leftbar?: any;
  topbar?: any;
  rightbar?: any;
  bottombar?: any;
  content?: any;
  leftbarProps?: any;
  topbarProps?: any;
  rightbarProps?: any;
  bottombarProps?: any;
  contentProps?: any;
}

export default memo(function Home(props: Props) {
  const {
    leftbar,
    topbar,
    rightbar,
    bottombar,
    content,
    title,
    contentProps = {},
  } = props;
  const { t } = useTranslation();

  const { className: classNameContent, ...contentPr } = contentProps;

  const classes = useStyles();
  return (
    <Molec.Page title={title}>
      <div className={classes.template}>
        {topbar && <div className={classes.topbar}>{topbar}</div>}
        {leftbar && <div className={classes.leftbar}>{leftbar}</div>}
        {content && (
          <div
            className={clsx(classes.content, classNameContent)}
            {...contentPr}
          >
            {content}
          </div>
        )}
        {rightbar && <div className={classes.rightbar}>{rightbar}</div>}
        {bottombar && <div className={classes.bottombar}>{bottombar}</div>}
      </div>
    </Molec.Page>
  );
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    template: {
      flexGrow: 1,
      display: "grid",
      // gridTemplateAreas: `
      //   "topbar topbar topbar"
      //   "leftbar content content"
      //   "bottombar bottombar bottombar"
      // `,
      gridTemplateColumns: "1fr 1fr 1fr",
    },
    leftbar: {
      // gridArea: 'leftbar',
      width: theme.drawer.openWidth,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    },
    topbar: {
      // gridArea: 'topbar',
      gridColumn: "1/4",
    },
    rightbar: {
      // gridArea: 'rightbar'
    },
    bottombar: {
      gridColumn: "1/4",

      // gridArea: 'bottombar'
    },
    content: {
      // gridArea: 'content'
    },
  })
);
