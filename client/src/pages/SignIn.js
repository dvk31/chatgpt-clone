import React, { useState, useContext } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import '../SignInPage.css';
import { parsePhoneNumber } from 'libphonenumber-js';
import { AuthContext } from '../context/chatContext';

function SignInPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const auth = useContext(AuthContext);

  const handleBack = () => {
    setStep(1);
  };

  const handleLogin = async () => {
    try {

      const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
      const countryCode = parsedPhoneNumber.countryCallingCode;
      const localNumber = parsedPhoneNumber.nationalNumber;

      const response = await axios.post('https://dev.withgpt.com/users/drf-login/', {
        country_code: `+${countryCode}`,
        phone_number: localNumber,
      });

      if (response.status === 200) {
        setStep(2);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your input and try again.');
    }
  };

  const handleVerification = async () => {
    try {

      const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
      const countryCode = parsedPhoneNumber.countryCallingCode;
      const localNumber = parsedPhoneNumber.nationalNumber;

      const response = await axios.post('https://dev.withgpt.com/users/drf-verify/', {
        verification_code: verificationCode,
        country_code: `+${countryCode}`,
        phone_number: localNumber,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        auth.signIn(response.data.token);
        alert('Verification successful!');
      }
    } catch (error) {
      alert('Verification failed. Please check your input and try again.');
    }
  };

  return (
    <div>
      {step === 1 && (
        <Step1 phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} handleLogin={handleLogin} />
      )}
      {step === 2 && (
        <Step2
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          handleVerification={handleVerification}
          handleBack={handleBack} 
        />
      )}
    </div>
  );
}

function Step1({ phoneNumber, setPhoneNumber, handleLogin }) {
  return (
    <div className="container">
      <h1>Enter your phone number</h1>
      <PhoneInput defaultCountry="US" withCountryCallingCode placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} />
      <button onClick={handleLogin}>Send Verification Code</button>
    </div>
  );
}

function Step2({ verificationCode, setVerificationCode, handleVerification, handleBack }) {
  return (
    <div className="container">
      <h1>Enter verification code</h1>
      <input
        type="text"
        placeholder="Verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerification}>Verify Code</button>
      <button className="back-button" onClick={handleBack}>Back</button>
    </div>
  );
}
export default SignInPage;