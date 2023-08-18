import * as yup from 'yup';

export const stockValidationSchema = yup.object().shape({
  name: yup.string().required(),
  ticker_symbol: yup.string().required(),
  market: yup.string().required(),
  price: yup.number().integer().nullable(),
  quantity: yup.number().integer().nullable(),
});
