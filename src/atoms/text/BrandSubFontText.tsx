import { Typography } from "antd";
import { CSSProperties } from "styled-components";
import { theme } from "../../Theme";

export const BrandSubFontText = (text: string, style?: CSSProperties): JSX.Element => <Typography.Text style={{ ...theme.texts.brandSubFont, ...style }}>
  {text}
</Typography.Text>;