import * as yup from 'yup';

export const holdingValidationSchema = yup.object().shape({
  purchase_price: yup.number().integer().nullable(),
  purchase_date: yup.date().nullable(),
  quantity: yup.number().integer().nullable(),
  organization_id: yup.string().nullable(),
  stock_id: yup.string().nullable(),
});
