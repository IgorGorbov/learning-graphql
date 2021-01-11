import React from "react";
import { Button, Card, DatePicker, Divider, Typography } from "antd";
import moment, { Moment } from "moment";

import { displayErrorMessage } from "../../../utils/notifications";
import { formatListingPrice } from "../../../utils/format";

const { Paragraph, Title } = Typography;

interface ListingCreateBookingProps {
  readonly price: number;
  readonly checkInDate: Moment | null;
  readonly checkOutDate: Moment | null;
  readonly setCheckInDate: (checkInDate: Moment | null) => void;
  readonly setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking = ({
  price,
  checkInDate,
  checkOutDate,
  setCheckInDate,
  setCheckOutDate
}: ListingCreateBookingProps) => {
  const disabledDate = (currentDate?: Moment) => {
    return currentDate ? currentDate.isBefore(moment().endOf("day")) : false;
  };

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(`You can't book date of check out to be prior to check in!`);
      }
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker
              value={checkInDate ? checkInDate : undefined}
              format={"YYYY/MM/DD"}
              showToday={false}
              disabledDate={disabledDate}
              onChange={(dateValue) => setCheckInDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}
            />
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker
              value={checkOutDate ? checkOutDate : undefined}
              format={"YYYY/MM/DD"}
              showToday={false}
              disabled={checkOutInputDisabled}
              disabledDate={disabledDate}
              onChange={(dateValue) => verifyAndSetCheckOutDate(dateValue)}
            />
          </div>
        </div>
        <Divider />
        <Button disabled={buttonDisabled} size="large" type="primary" className="listing-booking__card-cta">
          Request to book!
        </Button>
      </Card>
    </div>
  );
};
