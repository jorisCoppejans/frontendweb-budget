import { memo } from 'react';

// kan ook met react-intl (https://formatjs.io/docs/getting-started/installation/)
const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export default memo(function Transaction(props) {
  const { user, date, amount, place } = props;
  console.log('Rendering transaction...');
  return (
    <tr>
      <td>{dateFormat.format(new Date(date))}</td>
      <td>{user}</td>
      <td>{place}</td>
      <td> {amountFormat.format(amount)}</td>
      <td></td>
    </tr>
  );
});
