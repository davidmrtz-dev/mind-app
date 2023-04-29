import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;
	border-radius: 10px;
`;

export const Search = ({
  search,
  setSearch
}: {
  search: string;
  setSearch: (value: string) => void;
}): JSX.Element => {
  return (<>
		<SearchWrapper>
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
			{/* <Button
				style={{ marginRight: 5 }}
				onClick={() => setShowFilters(!showFilters)}
			>
				<FontAwesomeIcon
					color={theme.colors.blacks.normal}
					size='1x'
					icon={showFilters ? faChevronUp : faChevronDown}
				/>
			</Button> */}
		</SearchWrapper>
	</>);
};