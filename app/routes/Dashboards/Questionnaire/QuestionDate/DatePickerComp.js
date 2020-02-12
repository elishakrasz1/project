import React from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import moment from "moment";

import { Container, Row, Card, Col, CardBody } from "../../../../components";
import { ButtonInput } from "../../../Forms/DatePicker/components";

setDefaultLocale("en");

export class DatePickerComp extends React.Component {
  state = {
    startDate: moment().toDate(),
    endDate: moment()
      .add(5, "days")
      .toDate()
  };

  render() {
    return (
      <Container>
        <DatePicker
          customInput={<ButtonInput />}
          selected={this.state.startDate}
          onChange={this._handleChangeStart}
        />
      </Container>
    );
  }

  _handleChangeStart = startDate => this.setState({ startDate });

  _handleChangeEnd = endDate => this.setState({ endDate });
}
