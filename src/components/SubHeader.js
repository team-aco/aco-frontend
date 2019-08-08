import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.nav`
  width: 100%;
  height: 55px;
  position: sticky;
  top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(1, 0, 0, 0.1);
  ul {
    height: 100%;
  }
`;
const MainMenu = styled.ul`
  display: flex;
`;
const SubMenu = styled.ul`
  display: flex;
`;
const Divider = styled.div`
  width: 1px;
  height: 50%;
  margin: 0 0.5rem;
  background-color: ${props => props.theme.lightGreyColor};
`;
const Item = styled.li`
  margin: 0 0.5rem;
  height: 100%;
`;
const Link = styled(NavLink)`
  transition: color 0.3s;
  padding: 0.8rem 0;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: none;
  color: ${({ theme }) => theme.greyColor};
  &:hover {
    color: black;
  }
  &.active {
    border-bottom: 2px solid black;
    color: black;
  }
`;

export default withRouter(
  React.memo(({ match, main, sub, inital }) => (
    <Wrapper>
      {main && (
        <MainMenu>
          {main.label.map((item, index) => (
            <Item key={item}>
              <Link
                exact
                to={`${match.url === '/' ? '' : match.url}${main.url[index]}`}>
                <FormattedMessage id={`app.nav.${main.label[index]}`} />
              </Link>
            </Item>
          ))}
        </MainMenu>
      )}
      {sub && <Divider />}
      {sub && (
        <SubMenu>
          {sub.label.map((item, index) => (
            <Item key={item}>
              <Link
                exact
                to={`${match.url === '/' ? '' : match.url}${sub.url[index]}`}>
                <FormattedMessage id={`app.nav.${sub.label[index]}`} />
              </Link>
            </Item>
          ))}
        </SubMenu>
      )}
    </Wrapper>
  ))
);