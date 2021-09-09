import React, { ReactElement } from "react";

import { ListItem } from "@material-ui/core";

type Props = {
  className?: string;
  button?: true;
  component?: any;
  children?: any;
};

export default function UIListItem(props: Props): ReactElement {
  const { button, ...rest } = props;
  if (button) return <ListItem button {...rest} />;
  return <ListItem {...rest} />;
}
