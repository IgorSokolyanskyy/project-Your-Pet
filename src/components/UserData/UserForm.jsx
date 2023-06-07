import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/selectors';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import {
  Label,
  Input,
  IconEdit,
  DivIconCheck,
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

  const initialValues = {
    Name: name || 'Your name',
    Phone: phone || '+38 000 000 00 00',
    Birthday: birthday || '00.00.0000',
    City: city || 'Dnipro',
  };

  const [activeInput, setActiveInput] = useState(null);
  const [formValues, setFormValues] = useState(initialValues);

  const handleFieldChange = (fieldName, fieldValue) => {
    setActiveInput(fieldName);
    setFormValues(prevValues => ({
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  const renderField = name => {
    const isActive = activeInput === name;
    const isEditing = isActive && activeInput !== null;

    return (
      <Label key={name}>
        {name}:
        <Field name={name}>
          {({ field }) => (
            <Input
              type="text"
              {...field}
              readOnly={!isActive}
              className={isEditing ? 'editing' : ''}
              onChange={e => {
                field.onChange(e);
                handleFieldChange(name, e.target.value);
              }}
            />
          )}
        </Field>
        {isActive ? (
          <DivIconCheck>
            <IconCheck
              onClick={() => {
                handleFormSubmit(formValues);
                setActiveInput(null);
              }}
            />
          </DivIconCheck>
        ) : (
          <IconEdit onClick={() => handleFieldChange(name)} />
        )}
      </Label>
    );
  };

  return (
    <Formik
      initialValues={formValues}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <EmailStyled>{email}</EmailStyled>

        {Object.keys(formValues).map(field => renderField(field))}
      </Form>
    </Formik>
  );
};

export default UserForm;
