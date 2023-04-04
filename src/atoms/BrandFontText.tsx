import { Typography } from "antd";
import { theme } from "../Theme";

const BrandFontText = (text: string): JSX.Element => <Typography.Text style={{ ...theme.texts.brandFont }}>
  {text}
</Typography.Text>;

export default BrandFontText;