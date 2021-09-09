import React, { useState } from "react";
import { Atom } from "shared/ui";
import { Icon } from "shared/assets";
import { useTranslation } from "react-i18next";

type InputLoginProps = {
  value: string;
  onChange: () => void;
};

export const InputLogin = ({ value, onChange }: InputLoginProps) => {
  const { t } = useTranslation();
  return (
    <Atom.Input label={t("viewer:login")} value={value} onChange={onChange} />
  );
};

type InputPasswordProps = {
  value: string;
  onChange: () => void;
};

export const InputPassword = ({ value, onChange }: InputPasswordProps) => {
  const [show, setShow] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <Atom.Input
      label={t("viewer:password")}
      value={value}
      type={show ? "text" : "password"}
      onChange={onChange}
      end={
        <Atom.IconButton onClick={() => setShow(!show)}>
          {show ? <Icon.Visibility.On /> : <Icon.Visibility.Off />}
        </Atom.IconButton>
      }
    />
  );
};

type InputPasswordRepeatProps = {
  value: string;
  onChange: () => void;
};

export const InputPasswordRepeat = ({
  value,
  onChange,
}: InputPasswordRepeatProps) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Atom.Input
      value={value}
      onChange={onChange}
      end={
        <Atom.IconButton onClick={() => setShow(!show)}>
          {show ? <Icon.Visibility.On /> : <Icon.Visibility.Off />}
        </Atom.IconButton>
      }
    />
  );
};
