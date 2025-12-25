/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";

import "./ContentEditable.css";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import * as React from "react";

type Props = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
  style?: React.CSSProperties;
};

export default function LexicalContentEditable({
  className,
  placeholder,
  placeholderClassName,
  style,
}: Props): JSX.Element {
  return (
    <ContentEditable
      style={style}
      className={className ?? "ContentEditable__root"}
      aria-placeholder={placeholder}
      placeholder={
        <div className={placeholderClassName ?? "ContentEditable__placeholder"}>{placeholder}</div>
      }
    />
  );
}
