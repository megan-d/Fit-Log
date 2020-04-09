import React from 'react';

const CreateProfile = () => {
  return (
        <div className='main-content'>
          <div className="form-page-container">
            <h1 className="title-white">Contact Us</h1>
        <form className="form contact-form" action="">
          <div className="form-container">
            <div className="form-group">
              <label>Name:
              <input type="text" name="name" placeholder="" required />
              </label>
            </div>
            <div className="form-group">
              <label>Email:
              <input type="email" name="email" placeholder="" required />
              </label>
            </div>
            <div className="form-group">
              <label>Message:
              <textarea
                name="message"
                rows="10"
                cols="33"
                className="form-message"
                placeholder=""
                required
              />
              </label>
            </div>
          </div>
          <input type="submit" value="Submit" className="button form-button" />
        </form>
      </div>
        </div>
  );
};

export default CreateProfile;