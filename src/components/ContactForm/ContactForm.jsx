import PropTypes from 'prop-types';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import {
  EntryField,
  FormikContainer,
  Button,
  FormLabel,
} from './ContactForm.styled';

const nameSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  number: Yup.number().required('Required').integer(),
});

export const ContactForm = props => {
  return (
    <FormikContainer>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={nameSchema}
        onSubmit={(values, actions) => {
          props.addContacts(values);
          actions.resetForm();
        }}
      >
        <Form>
          <EntryField>
            <FormLabel htmlFor="name">First Name</FormLabel>
            <Field id="name" name="name" placeholder="Enter Name" />
          </EntryField>

          <EntryField>
            <FormLabel htmlFor="number">Telephone</FormLabel>
            <Field id="number" name="number" placeholder="Enter Telephone" />
          </EntryField>

          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </FormikContainer>
  );
};

ContactForm.propTypes = {
  addContacts: PropTypes.func,
  state: PropTypes.object,
};
