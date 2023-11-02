import { useState } from 'react';
import { PLACE_DATA } from '../../api/mock_data';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const validationRules = {
  user:{ 
    required: 'User is required',
    minLength: { value: 2, message: 'Min length is 2' },
  },
  date:{required: 'Date is required' },
  amount:{
    valueAsNumber: true,
    required: 'Amount is required',
    min: { value: 1, message: 'min 1' },
    max: { value: 5000, message: 'max 5000' },
   },
  place:{required: 'Place is required' }
}


const LabelInput = (name, label, type, ...rest) =>{
  const { register, errors} = useFormContext();
  return (
    <div className='mb-3'>
          <label htmlFor={name} className='form-label'>
            {label}
          </label>
          <input
            {...register({name}, validationRules[name])}
            defaultValue=''
            id={name}
            type={type}
            className='form-control'
            placeholder={name}
            
            {...rest}
          />
          {errors[name] && (
            <p className='form-text text-danger'>{errors[name].message}</p>
          )}
    </div>
  );
}

const toDateInputString = (date) => {
  // ISO String without the trailing 'Z' is fine 🙄
  // (toISOString returns something like 2020-12-05T14:15:74Z,
  // datetime-local HTML5 input elements expect 2020-12-05T14:15:74, without the (timezone) Z)
  //
  // the best thing about standards is that we have so many to chose from!
  if (!date) return null;
  if (typeof date !== Object) {
    date = new Date(date);
  }
  let asString = date.toISOString();
  return asString.substring(0, asString.indexOf('T'));
};

export default function TransactionForm({ onSaveTransaction }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    const { user, place, amount, date } = data;
    onSaveTransaction(user, place, parseInt(amount), date);
    reset();
  };

  return (
    <>
      <h2>Add transaction</h2>
      <FormProvider handleSubmit={handleSubmit} errors = {errors} register={register}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-50 mb-3'>
        
        <LabelInput name=  'user' type = 'text' label = 'Who'/>
        <LabelInput name=  'date' type = 'date' label = 'Date'/>
        <LabelInput name=  'amount' type = 'number' label = 'Amount'/>
        
        <div className='mb-3'>
          <label htmlFor='places' className='form-label'>
            Place
          </label>
          <select
            {...register('place', validationRules.place)}
            id='places'
            className='form-select'
            required
          >
            <option defaultChecked value=''>
              -- Select a place --
            </option>
            {PLACE_DATA.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        
        <div className='clearfix'>
          <div className='btn-group float-end'>
            <button type='submit' className='btn btn-primary'>
              Add transaction
            </button>
          </div>
        </div>
      </form>
      </FormProvider>
    </>
  );
}
