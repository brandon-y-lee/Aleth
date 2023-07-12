import React, { useState } from 'react';

const submitStyle = {
  position: 'absolute',
  left: '900px',
  top: '500px', // 606 - 90
  width: '370px',
  height: '48px',
  borderRadius: '5px',
  background: '#33654D',
  color: '#FFFFFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Poppins, sans-serif',
  fontStyle: 'semiBold',
  fontSize: '20px',
  lineHeight: '20px',
  letterSpacing: '0.5px',
};



const titleStyle = {
  position: 'absolute',
  width: '133px',
  height: '92px',
  left: '1019px',
  top: '160px', //265 - 90
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 'bold',
  fontSize: '48px',
  lineHeight: '92px',
  textAlign: 'center',
  verticalAlign: 'top',
  color: '#33654D',
};

const blackBoxStyle = {
  position: 'absolute',
  width: '550px',
  height: '654px',
  left: '250px',
  background: '#000013',
  top: '75px',
  borderRadius: '5px',
};

const usernameInputStyle = {
  position: 'absolute',
  left: '899px',
  top: '312px', //402 - 90
  width: '370px',
  height: '48px',
  borderRadius: '2px',
  border: '1px solid rgba(0, 0, 0, 0.6)',
  background: '#FFFFFF',
  paddingLeft: '8px',
  fontFamily: 'Poppins, sans-serif',
  fontStyle: 'light',
  fontSize: '16px',
  lineHeight: '43px',
  letterSpacing: '-3%',
  textAlign: 'left',
  verticalAlign: 'top',
  color: '#909090',
  
};

const passwordInputStyle = {
  position: 'absolute',
  left: '899px',
  top: '400px', //490 - 90
  width: '370px',
  height: '48px',
  borderRadius: '2px',
  border: '1px solid rgba(0, 0, 0, 0.6)',
  background: '#FFFFFF',
  paddingLeft: '8px',
  fontFamily: 'Poppins, sans-serif',
  fontStyle: 'light',
  fontSize: '16px',
  lineHeight: '43px',
  letterSpacing: '-3%',
  textAlign: 'left',
  verticalAlign: 'top',
  color: '#909090',
};

const forgotPasswordStyle = {
  position: 'absolute',
  left: '899px',
  top: '460px', // 648 - 90
  fontFamily: 'Poppins, sans-serif',
  fontStyle: 'light',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '-0.3px',
  textAlign: 'left',
  verticalAlign: 'top',
  color: '#1231D3',
  cursor: 'pointer',
};

const signUpContainerStyle = {
  position: 'absolute',
  left: '970px',
  top: '570px', // 610 - 90
  fontFamily: 'Poppins, sans-serif',
  fontStyle: 'light',
  fontSize: '16px',
  lineHeight: '20px',
  textAlign: 'center',
  verticalAlign: 'top',
  color: '#909090',
};

const signUpPointerStyle = {
  fontSize: '14px',
  lineHeight: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
  color: '#33654D',
};

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleForgotPassword = () => {
    // Add your logic for handling the forgot password functionality here
    console.log('Forgot Password clicked');
  };

  const handleSignUp = () => {
    // Add your logic for handling the forgot password functionality here
    console.log('User has signed up');
  };

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      <div style={blackBoxStyle}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div className="MuiBox-root css-1glcpsj">
            <div className="MuiBox-root css-jmfv01">
              <div className="MuiBox-root css-19nzcwv">
                <img src="/static/media/logo.9020acc0881fc41ac11e.png" alt="Aleth Logo" height="100px"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <h2 style={titleStyle}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} style={usernameInputStyle} />
        </label>
        <br />
        <label>
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} style={passwordInputStyle} />
        </label>
        <br />
        <input type="submit" value="LOGIN" style={submitStyle} />
      </form>
      <div style={forgotPasswordStyle} onClick={handleForgotPassword}>
        Forgot Password
      </div>
      <div style={signUpContainerStyle} onClick={handleSignUp}>
        <span>Don't have an account?</span>
        <span style={signUpPointerStyle}> Sign Up</span>
      </div>
    </div>
  );
};

export default LoginPage;

