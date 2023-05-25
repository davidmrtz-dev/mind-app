import { Button, DatePicker, Select } from "antd";
import styled from "styled-components";
import { FilterValues, UserTeamStatus } from "../../../../../@types";
import { useState } from "react";
import dayjs from "dayjs";
import { theme } from "../../../../../Theme";

const { RangePicker } = DatePicker;

const FiltersContainer = styled.div<{ visible: boolean }>`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: ${p => p.visible ? '126' : '0'}px;
	overflow: hidden;
	transition: height .5s ease-in-out;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Filters = ({
	visible,
  values,
  setValues
}: {
	visible: boolean;
  values: FilterValues;
  setValues: (values: FilterValues) => void;
}): JSX.Element => {
	const [filter, setFilter] = useState<UserTeamStatus>('');
  const [dates, setDates] = useState<string []>(['', '']);

	return(<FiltersContainer visible={visible}>
    <RangePicker
      style={{
        width: '100%',
        margin: '0 5px'
      }}
      allowClear
      onCalendarChange={(items) => {
        if (items?.every(val => val)) {
          const from = dayjs(items[0]).format('YYYY-MM-DD');
          const to = dayjs(items[1]).format('YYYY-MM-DD');
          setDates([from, to]);
        } else if (items === null) {
          setDates(['', '']);
          setValues({ ...values, dates: ['', ''] });
        }
      }}
    />
    <Select
      allowClear
      onClear={() => {
        setFilter('');
        setValues({...values, status: ''})
      }}
      disabled={false}
      placeholder={'Status'}
      style={{
        width: '100%',
        padding: '10px 0'
      }}
      dropdownStyle={{ backgroundColor: theme.colors.grays.light }}
      onSelect={setFilter}
      options={[
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]}
    />
    <Button
      disabled={dates.some(d => !d) && !filter}
      type='primary'
      onClick={() => setValues({ ...values, status: filter, dates: dates })}
    >
      Apply
    </Button>
  </FiltersContainer>);
};