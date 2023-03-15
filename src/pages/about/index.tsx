import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "../../Theme";

const AboutContainer = styled.div`
  display: flex;
  width: 100%;
  height; 100%;
  align-items: center;
  padding: 10px;
  flex-direction: column;
  cursor: default;
`;

const About = (): JSX.Element => {
  return (<AboutContainer>
    <Typography style={{
      ...theme.texts.brandH1
    }}
    >
      Mind App
    </Typography>
    <Typography style={{
      ...theme.texts.brandFont,
      padding: 10
    }}>
      Full Stack Web App to manage users with roles and different cool features. <br/>
      Built with Typescript, React, and Ruby on Rails. <br/>
    </Typography>
</AboutContainer>);
};

export default About;