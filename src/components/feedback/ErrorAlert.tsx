import Alert from '@mui/material/Alert';

export default function ErrorAlert(props: any) {
  const { text } = props;
  return (
    <Alert sx={{ position: 'fixed', margin: '0px auto' }} severity="error">
      {text}
    </Alert>
  );
}
