import { faCircleInfo, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { theme } from "../Theme";

export const ActionButton = ({
  onClick,
  top,
  icon
}: {
  onClick: () => void;
  top?: number;
  icon?: IconDefinition
}): JSX.Element => <FontAwesomeIcon
  onClick={onClick}
  style={{
    position: 'absolute',
    top: top || 5,
    right: 5,
    cursor: 'pointer'
  }}
  color={theme.colors.blacks.normal}
  icon={icon || faCircleInfo}
/>