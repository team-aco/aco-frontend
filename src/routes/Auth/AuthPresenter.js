import React from 'react';
import styled, { keyframes } from 'styled-components';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Fade = keyframes`
  0% { opacity: 0; }
  1% {opacity: 1; }
  100% { opacity: 1; }
`;
const ImageSlideDiv = (num, fade) => {
  const loopSetChildAnimationDelay = count => {
    let string = '';
    for (let i = 1; i < count + 1; i++) {
      string += `&:nth-child(${i}) {
        animation-delay: ${fade * (i - 1)}s;
      }`;
    }
    return string;
  };
  return `
    animation-duration: ${fade * num}s;
    animation-iteration-count: infinite;
    ${loopSetChildAnimationDelay(num)}
  `;
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const Wrapper = styled.div`
  min-height: 80vh;
  width: 100%;
  position: absolute;
  top: 0;
  margin: 0 auto;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0.9;
`;
const ImageSlider = styled.div`
  width: 100%;
  height: 100%;
  div {
    animation-name: ${Fade};
    ${({ numberOfImage, interval }) => ImageSlideDiv(numberOfImage, interval)}
  }
`;
const BackgroundImg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-image: url(${props => props.url});
`;
const Box = styled.div`
  ${props => props.theme.whiteBox}
  width: 100%;
  max-width: 350px;
`;
const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;
const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;
const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const AuthPresenter = ({
  type,
  setType,
  username,
  firstName,
  lastName,
  secret,
  email,
  onSubmit,
  backgroundImgs,
  fadeout,
}) => (
  <Container>
    <ImageSlider interval={10} numberOfImage={backgroundImgs.length}>
      {backgroundImgs.map(image => (
        <BackgroundImg key={image.id} url={image.url} fadeout={fadeout} />
      ))}
    </ImageSlider>
    <Wrapper>
      <Form>
        {type === 'logIn' && (
          <>
            <FormattedMessage id="msg.login">
              {title => (
                <Helmet>
                  <title>{`${title} | ACO`}</title>
                </Helmet>
              )}
            </FormattedMessage>
            <form onSubmit={onSubmit}>
              <Input locale="msg.email" {...email} type="email" />
              <Button locale="msg.login" />
            </form>
          </>
        )}
        {type === 'signUp' && (
          <>
            <FormattedMessage id="msg.signup">
              {title => (
                <Helmet>
                  <title>{`${title} | ACO`}</title>
                </Helmet>
              )}
            </FormattedMessage>
            <form onSubmit={onSubmit}>
              <Input locale="msg.firstName" {...firstName} />
              <Input locale="msg.lastName" {...lastName} />
              <Input locale="msg.email" {...email} type="email" />
              <Input locale="msg.username" {...username} />
              <Button locale="msg.signup" />
            </form>
          </>
        )}
        {type === 'confirm' && (
          <>
            <FormattedMessage id="msg.confirmSecret">
              {title => (
                <Helmet>
                  <title>{`${title} | ACO`}</title>
                </Helmet>
              )}
            </FormattedMessage>
            <form onSubmit={onSubmit}>
              <Input locale="app.auth.pasteSecret" required {...secret} />
              <Button locale="msg.confirm" />
            </form>
          </>
        )}
      </Form>
      {type !== 'confirm' && (
        <StateChanger>
          {type === 'logIn' ? (
            <>
              <FormattedMessage id="app.auth.haveNotAccount" />{' '}
              <Link onClick={() => setType('signUp')}>
                <FormattedMessage id="msg.signup" />
              </Link>
            </>
          ) : (
            <>
              <FormattedMessage id="app.auth.haveAccount" />{' '}
              <Link onClick={() => setType('logIn')}>
                <FormattedMessage id="msg.login" />
              </Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  </Container>
);
const inputProps = PropTypes.shape({
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
});

AuthPresenter.propTypes = {
  type: PropTypes.string,
  backgroundImg: PropTypes.array,
  setType: PropTypes.func,
  onSubmit: PropTypes.func,
  username: inputProps,
  firstName: inputProps,
  lastName: inputProps,
  secret: inputProps,
  email: inputProps,
};

export default AuthPresenter;