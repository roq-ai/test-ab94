import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createHolding } from 'apiSdk/holdings';
import { holdingValidationSchema } from 'validationSchema/holdings';
import { OrganizationInterface } from 'interfaces/organization';
import { StockInterface } from 'interfaces/stock';
import { getOrganizations } from 'apiSdk/organizations';
import { getStocks } from 'apiSdk/stocks';
import { HoldingInterface } from 'interfaces/holding';

function HoldingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: HoldingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createHolding(values);
      resetForm();
      router.push('/holdings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<HoldingInterface>({
    initialValues: {
      purchase_price: 0,
      purchase_date: new Date(new Date().toDateString()),
      quantity: 0,
      organization_id: (router.query.organization_id as string) ?? null,
      stock_id: (router.query.stock_id as string) ?? null,
    },
    validationSchema: holdingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Holdings',
              link: '/holdings',
            },
            {
              label: 'Create Holding',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Holding
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Purchase Price"
            formControlProps={{
              id: 'purchase_price',
              isInvalid: !!formik.errors?.purchase_price,
            }}
            name="purchase_price"
            error={formik.errors?.purchase_price}
            value={formik.values?.purchase_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('purchase_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="purchase_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Purchase Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.purchase_date ? new Date(formik.values?.purchase_date) : null}
              onChange={(value: Date) => formik.setFieldValue('purchase_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Quantity"
            formControlProps={{
              id: 'quantity',
              isInvalid: !!formik.errors?.quantity,
            }}
            name="quantity"
            error={formik.errors?.quantity}
            value={formik.values?.quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <AsyncSelect<StockInterface>
            formik={formik}
            name={'stock_id'}
            label={'Select Stock'}
            placeholder={'Select Stock'}
            fetcher={getStocks}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/holdings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'holding',
    operation: AccessOperationEnum.CREATE,
  }),
)(HoldingCreatePage);
