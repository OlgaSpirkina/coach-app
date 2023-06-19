import React from 'react';
const Login = ({ handleLogin }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(username, password);
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  export default Login;