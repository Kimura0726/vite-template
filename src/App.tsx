import { createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '@/App.css';

const theme = createTheme();

interface Func {
  name: string;
  path: string;
  description: string;
}

const funcData: Func[] = [
  {
    name: 'Counter',
    path: '/counter',
    description: 'カウンターのサンプル'
  },
  {
    name: 'React-Query',
    path: '/query',
    description: 'React-Queryを使用したデータ取得のサンプル'
  }
];

const CustomCard = styled(Card)({
  width: '40%',
  marginBottom: theme.spacing(4)
});

const CardComp = (func: Func, num: number): JSX.Element => (
  <CustomCard key={num}>
    <CardContent>
      <Typography variant="h5" component="div">
        {func.name}
      </Typography>
      <Typography variant="body2">{func.description}</Typography>
    </CardContent>
    <CardActions>
      <Button size="small" component={Link} href={func.path}>
        Learn More
      </Button>
    </CardActions>
  </CustomCard>
);

function App(): JSX.Element {
  return (
    <div className="App">
      {funcData.map((item, num) => CardComp(item, num))}
    </div>
  );
}

export default App;
