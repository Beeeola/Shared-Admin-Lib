function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Box, Flex, Button } from "@rebass/emotion";
import React from "react";
import { Input } from "./LoginPage";
import format from "date-fns/format";

function currentMonth() {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    from: format(firstDay, "YYYY-MM-DD"),
    to: format(lastDay, "YYYY-MM-DD")
  };
}

class FromTo extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", this.props.value || {
      from: "",
      to: ""
    });

    _defineProperty(this, "onChange", key => {
      return e => {
        this.setState({
          [key]: e.target.value
        }, () => {
          this.props.onChange(this.state);
        });
      };
    });
  }

  render() {
    return jsx(Flex, null, jsx(Input, {
      label: "From",
      type: "date",
      name: "from",
      isValid: true,
      value: this.state.from,
      onChange: this.onChange("from")
    }), jsx(Input, {
      value: this.state.to,
      label: "To",
      type: "date",
      name: "to",
      isValid: true,
      onChange: this.onChange("to")
    }), jsx(Button, {
      py: "4px",
      onClick: () => {
        let today = currentMonth();
        this.setState(today, () => {
          this.props.onChange(this.state);
        });
      },
      css: css`
            height: 36px;
            align-self: center;
            margin-top: 26px;
            border-radius: 0;
          `
    }, this.props.buttonText || "Reset"));
  }

}

export const DateFilter = ({
  onChange,
  onSearchChange,
  displayDate = true,
  searchValue,
  onKeyDown = () => {},
  onFilterChange = () => {},
  filterOptions = [],
  dateValue = {
    from: "",
    to: ""
  },
  selection,
  placeholder = "Search either email or order",
  buttonText,
  searchButton = {}
}) => {
  return jsx(Flex, {
    css: css`
        flex: 1;
      `,
    justifyContent: "space-between"
  }, onSearchChange ? jsx(Box, {
    w: 1,
    pr: 4,
    css: css`
            flex: 1;
            align-self: flex-end;
          `
  }, jsx(Input, {
    onChange: onSearchChange,
    onKeyDown: onKeyDown,
    value: searchValue,
    isValid: true,
    placeholder: placeholder
  })) : null, onChange ? jsx(Flex, {
    flexDirection: "column"
  }, jsx(FromTo, {
    buttonText: buttonText,
    value: dateValue,
    onChange: onChange
  })) : null, filterOptions.length > 0 ? jsx("select", {
    css: css`
            height: 36px;
            align-self: flex-end;
            margin-bottom: 16px;
            margin-left: 20px;
          `,
    value: selection,
    onChange: onFilterChange
  }, filterOptions.map(option => jsx("option", {
    key: option.label,
    value: option.value
  }, option.label))) : null, searchButton.display ? jsx(Button, {
    css: css`
            height: 40px;
            align-self: center;
            margin-top: 24px;
            margin-left: 10px;
            ${searchButton.styles || ""}
          `,
    onClick: searchButton.onClick
  }, searchButton.text || "Search") : null);
};