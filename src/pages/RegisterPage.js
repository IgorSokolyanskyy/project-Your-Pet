import RegisterForm from 'components/RegisterForm';
import { useEffect } from 'react';

const RegisterPage = () => {
  useEffect(() => {
    document.title = 'YourPet | Register';
  });

  return <RegisterForm />;
};

export default RegisterPage;
