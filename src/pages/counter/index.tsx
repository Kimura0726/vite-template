import { createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Button, Paper, Typography } from '@mui/material';
import { useCounterStore } from '../../store/counter';

const theme = createTheme();

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly'
});
const CustomPaper = styled(Paper)({
  width: '40%',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2)
});
const CountText = styled(Typography)({
  textAlign: 'center'
});
const ButtonContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-evenly'
});

const Count = (): JSX.Element => {
  const count = useCounterStore((state) => state.count);
  return (
    <CountText variant="h5" gutterBottom>
      count: {count}
    </CountText>
  );
};

const IncreaseCount = (): JSX.Element => {
  const increaseCount = useCounterStore((state) => state.increaseCount);
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        increaseCount();
      }}
    >
      Increse
    </Button>
  );
};

const ResetButton = (): JSX.Element => {
  const { resetCount } = useCounterStore();
  return (
    <Button
      variant="contained"
      color="warning"
      onClick={() => {
        resetCount();
      }}
    >
      Reset
    </Button>
  );
};

const Index = (): JSX.Element => {
  return (
    <Container>
      <CustomPaper elevation={3}>
        <Count />
        <ButtonContainer>
          <IncreaseCount />
          <ResetButton />
        </ButtonContainer>
      </CustomPaper>
    </Container>
  );
};
export default Index;
