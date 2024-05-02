import React from 'react';
import '../css/login.css';

const Login = () => {
  return (
    <div className='login-container'>
      <header className="page-header">
        <h2>Password Protector</h2>
        <picture>
          <source media="(max-width: 435px)" srcSet="../assets/managerlogosmall.png" type="image/png" />
          <source media="(min-width: 436px)" srcSet="../assets/managerlogomedium.png" type="image/png" />
          <img className="img-fluid img-thumbnail" src="../assets/managerlogo.png" alt="Picture of Password Protector logo ( a lock )" />
        </picture>
      </header>

      <main>
        <form method="post" action="" enctype="multipart/form-data">
          <div className="container">
            <div className="form-group">
              <label className="email-label" htmlFor="username">Email:</label>
              <input type="text" className="form-control" id="username" name="username" placeholder="Enter email address" required />
            </div>

            <div className="form-group">
              <label htmlFor="userpassword">Password:</label>
              <input type="password" className="form-control" id="userpassword" name="userpassword" placeholder="Enter password" required />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">Sign In</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;