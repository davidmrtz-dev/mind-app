import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, DatePicker, Input, Select } from "antd";
import styled from "styled-components";
import { theme } from "../../../../Theme";
import { faChevronDown, faChevronUp, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FilterValues, UserTeamStatus } from "../../../../@types";
import dayjs from "dayjs";

const SearchWrapper = styled.div<{ showFilters: boolean }>`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	border-bottom-left-radius: ${p => p.showFilters ? '0' : '10'}px;
	border-bottom-right-radius: ${p => p.showFilters ? '0': '10'}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;
`;

export const Search = ({
  search,
  setSearch,
  values,
  setValues
}: {
  search: string;
  setSearch: (value: string) => void;
  values: FilterValues;
  setValues: (values: FilterValues) => void;
}): JSX.Element => {
	const [showFilters, setShowFilters] = useState(false);

  return (<>
		<SearchWrapper showFilters={showFilters}>
			<Input
				style={{ margin: '0 5px' }}
				prefix={<FontAwesomeIcon
					style={{ flex: 1, paddingRight: 5 }}
					color={theme.colors.blacks.normal}
					size='1x'
					icon={faSearch}
				/>}
				suffix={<FontAwesomeIcon
					style={{ cursor: 'pointer' }}
					color={theme.colors.blacks.normal}
					size='1x'
					icon={faClose}
					onClick={() => search && setSearch('')}
				/>}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
        placeholder='Search'
			/>
			<Button
				style={{ marginRight: 5 }}
				onClick={() => setShowFilters(!showFilters)}
			>
				<FontAwesomeIcon
					color={theme.colors.blacks.normal}
					size='1x'
					icon={showFilters ? faChevronUp : faChevronDown}
				/>
			</Button>
		</SearchWrapper>
		<Filters
			visible={showFilters}
      values={values}
      setValues={setValues}
		/>
	</>);
};

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

const Filters = ({
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