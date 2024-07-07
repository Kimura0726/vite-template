import { Paper, Button, TextField } from '@mui/material';

export const Container = (props: any) => {
  const { children } = props;
  return (
    <div
      style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}
    >
      {children}
    </div>
  );
};

export const CustomPaper = (props: any) => {
  const { children, ...pr } = props;
  return (
    <Paper
      sx={{
        height: '200px',
        width: '40%',
        marginTop: pr.marginTop,
        padding: pr.padding
      }}
      elevation={3}
    >
      {children}
    </Paper>
  );
};

export const CustomForm = (props: any) => {
  const { children, ...pr } = props;
  return (
    <form
      style={{
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between'
      }}
      onSubmit={pr.onSubmit}
    >
      {children}
    </form>
  );
};

export const InputIdForm = (props: any) => (
  <TextField
    id="login"
    label="ログインID"
    variant="outlined"
    fullWidth
    value={props.value}
    onChange={props.onChange}
  />
);

export const InputPassForm = (props: any) => (
  <TextField
    id="password"
    sx={{ marginTop: props.marginTop }}
    label="パスワード"
    variant="outlined"
    type="password"
    fullWidth
    value={props.value}
    onChange={props.onChange}
  />
);

export const SubmitButton = (props: any) => {
  const { children, ...pr } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      fullWidth
      disabled={pr.disabled}
    >
      {children}
    </Button>
  );
};
