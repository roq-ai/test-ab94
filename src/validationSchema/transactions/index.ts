import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  transaction_type: yup.string().nullable(),
  transaction_date: yup.date().nullable(),
  transaction_price: yup.number().integer().nullable(),
  quantity: yup.number().integer().nullable(),
  holding_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
