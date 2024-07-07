import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import LoadingCircular from '@/components/feedback/LoadingCircular';
import type { account } from '@/types/user';
import { loginUrl } from '@/URLs';
import { isAuthenticated } from '@/utils/utils';
import { loginError } from '@/constants';
import {
  Container,
  CustomPaper,
  CustomForm,
  InputIdForm,
  InputPassForm,
  SubmitButton
} from '@/components/auth/Login';
import ErrorAlert from '@/components/feedback/ErrorAlert';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href
        }
      });
    }
  },
  component: Index
});

function Index() {
  const theme = useTheme();

  const [loginId, setLoginId] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const param = {
    id: loginId,
    pw: pass
  };

  const mutation = useMutation({
    mutationFn: (formData: account) => axios.post(loginUrl, formData),
    onSuccess: async () => {
      location.reload();
    }
  });

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(param);
  };
  const onChangeLoginId = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const val = event.target.value;
    setLoginId(val);
  };
  const onChangeLoginPass = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const val = event.target.value;
    setPass(val);
  };

  if (mutation.isPending) {
    return LoadingCircular;
  }

  return (
    <Container>
      {mutation.isError && <ErrorAlert text={loginError} />}
      <CustomPaper marginTop={theme.spacing(4)} padding={theme.spacing(4)}>
        <CustomForm onSubmit={onFormSubmit}>
          <div>
            <InputIdForm value={loginId} onChange={onChangeLoginId} />
            <InputPassForm
              value={pass}
              onChange={onChangeLoginPass}
              marginTop={theme.spacing(4)}
            />
          </div>
          <SubmitButton disabled={!loginId || !pass}>Login</SubmitButton>
        </CustomForm>
      </CustomPaper>
    </Container>
  );
}
