import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../Theme";

export const ActionButton = ({
  onClick,
  top,
  right
}: {
  onClick: () => void;
  top?: number;
  right?: number;
}): JSX.Element => <FontAwesomeIcon
  onClick={onClick}
  style={{
    position: 'absolute',
    top: top || 5,
    right: right || 5,
    cursor: 'pointer'
  }}
  color={theme.colors.blacks.normal}
  icon={faCircleInfo}
/>