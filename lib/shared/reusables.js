function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button, Text, Link } from "@rebass/emotion";
import React from "react";
import format from "date-fns/format";
export function getDate(date, short = false) {
  let dd = new Date(date);
  return format(dd, short ? "MMM D, YYYY" : "MMMM D, YYYY");
}
export const ListGroup = ({
  name
}) => {
  return jsx(Flex, {
    width: 1,
    justifyContent: "center",
    bg: "#f0f0f0",
    py: 2
  }, name);
};
export const AsLink = ({
  to,
  onClick,
  children,
  ...rest
}) => {
  let WLink = rest.Link || Link;
  return Boolean(to) || Boolean(onClick) ? jsx(WLink, {
    to: to,
    onClick: onClick,
    href: to,
    css: css`
        text-decoration: none;
        color: #000;
        :hover {
          cursor: pointer;
        }
      `
  }, children) : children;
};
export const ListItem = ({
  to,
  heading,
  subHeading,
  rightSection,
  onClick,
  ...rest
}) => {
  return jsx(AsLink, _extends({
    to: to,
    onClick: onClick
  }, rest), jsx(Flex, {
    py: 3,
    px: 2,
    width: 1,
    justifyContent: "space-between",
    css: css`
          border-bottom: 1px solid black;
        `
  }, jsx(Box, null, jsx(Text, {
    fontSize: 5
  }, heading), jsx(Text, null, subHeading)), jsx(Flex, {
    flexDirection: "column",
    css: css`
            align-self: center;
          `
  }, rightSection)));
};
export const DetailItem = ({
  label,
  children
}) => {
  return jsx(Flex, {
    py: 2,
    justifyContent: "space-between"
  }, jsx(Text, {
    fontSize: 3
  }, label), jsx(Text, {
    fontSize: 3
  }, children));
};
export function getTime(date) {
  let dd = new Date(date);
  return format(dd, "h:mm a");
}
export const SectionListPage = ({
  data,
  keyValue = "date",
  keyIndex = "order",
  LinkComponent = Link,
  callback = () => {},
  Component = ListItem
}) => {
  let rows = [];
  let lastCategory = null;
  [...data].sort((a, b) => new Date(b[keyValue]).getTime() - new Date(a[keyValue]).getTime()).forEach((withdrawal, index) => {
    let date = getDate(withdrawal[keyValue]);

    if (date !== lastCategory) {
      rows.push(jsx(ListGroup, {
        name: date,
        key: date
      }));
    }

    rows.push(jsx(Component, _extends({
      key: withdrawal[keyIndex]
    }, callback(withdrawal), {
      Link: LinkComponent
    })));
    lastCategory = date;
  });
  return rows;
};