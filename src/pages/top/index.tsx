import { createTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    path: '/react_query',
    description: 'React-Queryを使用したデータ取得のサンプル'
  },
  {
    name: 'DraftJs',
    path: '/draftjs',
    description: 'Darft.jsを使用したリッチテキストエディタのサンプル'
  },
  {
    name: 'DraftJsRead',
    path: '/draftjsRead',
    description:
      'Darft.jsを使用したリッチテキストエディタのサンプル（読み込み専用）'
  }
];

const CustomCard = styled(Card)({
  width: '40%',
  marginBottom: theme.spacing(2),
  // ブレークポイントのサンプル
  [theme.breakpoints.down('md')]: {
    backgroundColor: 'skyblue'
  }
});
const Container = styled('div')({
  marginTop: theme.spacing(2)
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

const Top = (): JSX.Element => {
  return (
    <Container>{funcData.map((item, num) => CardComp(item, num))}</Container>
  );
};

export default Top;
