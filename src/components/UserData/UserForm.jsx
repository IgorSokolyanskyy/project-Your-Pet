import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import {
  Label,
  Input,
  IconEdit,
  WrapperIconCheck,
  IconCheck,
  EmailStyled,
} from './UserData.styled';

const validationSchema = yup.object().shape({
  Name: yup.string().min(3).max(17),
  Phone: yup.string(),
  Birthday: yup.string(),
  City: yup.string(),
});

const UserForm = ({ handleFormSubmit }) => {
  const { name, email, phone, birthday, city } = useSelector(selectUser);

  const [activeInput, setActiveInput] = useState(null);

  const initialValues = {
    Name: name || 'Your name',
    Phone: phone || '+38 000 000 00 00',
    Birthday: birthday || '00.00.0000',
    City: city || 'Dnipro',
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <EmailStyled>{email}</EmailStyled>

          {Object.keys(initialValues).map(field => {
            const isActive = activeInput === field;
            const isEditing = isActive && activeInput !== null;

            return (
              <Label key={field}>
                {field}:
                <Field name={field}>
                  {({ field }) => (
                    <Input
                      type="text"
                      {...field}
                      readOnly={!isActive}
                      className={isEditing ? 'editing' : ''}
                      onChange={e => {
                        field.onChange(e);
                        setFieldValue(field.name, e.target.value);
                      }}
                    />
                  )}
                </Field>
                {isActive ? (
                  <WrapperIconCheck>
                    <IconCheck
                      onClick={() => {
                        handleFormSubmit(values);
                        setActiveInput(null);
                      }}
                    />
                  </WrapperIconCheck>
                ) : (
                  <IconEdit onClick={() => setActiveInput(field)} />
                )}
              </Label>
            );
          })}
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
