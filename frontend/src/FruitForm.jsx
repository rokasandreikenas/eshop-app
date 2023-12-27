import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { createFruit } from "./api/fruits";

const FruitForm = ({ handleAddFruit }) => {
  const handleSubmit = async (values) => {
    // values = {name: "..."}

    try {
      const response = await createFruit(values);
      handleAddFruit(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
      <Form>
        <Field name="name" placeholder="Eneter a fruit..." />
        <button type="submit">Submit fruit</button>
      </Form>
    </Formik>
  );
};

FruitForm.propTypes = {
  handleAddFruit: PropTypes.func.isRequired,
};

export default FruitForm;
