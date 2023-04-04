import { Typography } from "antd";
import { theme } from "../Theme";
import { CSSProperties } from "styled-components";

const BrandFontText = (text: string, style?: CSSProperties): JSX.Element => <Typography.Text style={{ ...theme.texts.brandFont, ...style }}>
  {text}
</Typography.Text>;

export default BrandFontText;