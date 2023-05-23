import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, DatePicker, Input, Select } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";
import { faChevronDown, faChevronUp, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { UserTeamStatus } from "../../../@types";

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
	setType
}: {
  search: string;
  setSearch: (value: string) => void;
	setType: (value: UserTeamStatus) => void;
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
			setType={setType}
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
	setType,
}: {
	visible: boolean;
	setType: (value: UserTeamStatus) => void;
}): JSX.Element => {
	const [filter, setFilter] = useState<UserTeamStatus>('');

	return(<FiltersContainer visible={visible}>
    <RangePicker
      style={{
        width: '100%',
        margin: '0 5px'
      }}
      allowClear
      onCalendarChange={(values) => {
        // if (values?.every(val => val)) {
        //   const from = dayjs(values[0]).format('YYYY-MM-DD');
        //   const to = dayjs(values[1]).format('YYYY-MM-DD');
        //   setSelection([from, to]);
        // } else if (values === null) {
        //   setSelection(['', '']);
        //   setDates(['', '']);
        // }
      }}
    />
    <Select
      allowClear
      onClear={() => {
        setFilter('');
        setType('');
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
      disabled={!filter}
      type='primary'
      onClick={() => {
        // setDates(selection);
        setType(filter);
      }}
    >
      Apply
    </Button>
  </FiltersContainer>);
};