import React, { useState, useContext } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import '../SignInPage.css';
import { AuthContext } from '../context/chatContext';


function SignInPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const auth = useContext(AuthContext);


  const handleLogin = async () => {
    try {
      // const countryCode = phoneNumber.match(/^\+(\d+)/)[0]; // Extract the country code
      // const formattedPhoneNumber = phoneNumber.replace(countryCode, ''); // Remove the country code from the phone number

      const response = await axios.post('https://dev.withgpt.com/users/drf-login/', {
        country_code: '+1',
        phone_number: '8184151988',
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
      const response = await axios.post('https://dev.withgpt.com/users/drf-verify/', {
        verification_code: verificationCode,
        country_code: '+1',
        phone_number: '8184151988',
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        alert('Verification successful!');
        auth.signIn(response.data.token);
        alert('Verification successful!');
      }
    } catch (error) {
      console.error('Verification error:', error);
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
        />
      )}
    </div>
  );
}

function Step1({ phoneNumber, setPhoneNumber, handleLogin }) {
  return (
    <div className="container">
      <h1>Step 1: Enter your phone number</h1>
      <PhoneInput placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber} />
      <button onClick={handleLogin}>Send Verification Code</button>
    </div>
  );
}

function Step2({ verificationCode, setVerificationCode, handleVerification }) {
  return (
    <div className="container">
      <h1>Step 2: Enter verification code</h1>
      <input
        type="text"
        placeholder="Verification code"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button onClick={handleVerification}>Verify Code</button>
    </div>
  );
}
export default SignInPage;