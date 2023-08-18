import * as yup from 'yup';

export const administratorValidationSchema = yup.object().shape({
  role: yup.string().nullable(),
  status: yup.string().nullable(),
  start_date: yup.date().nullable(),
  end_date: yup.date().nullable(),
  user_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
