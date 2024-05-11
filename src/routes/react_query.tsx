import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography';
import type { Data } from '@/types/react_query';

export const Route = createFileRoute('/react_query')({
  component: Index
});

function Index() {
  const url: string = 'https://qiita.com/api/v2/items';
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qiita'],
    queryFn: async () => await axios.get(url)
  });
  if (isLoading) {
    return <div>isLoading</div>;
  }
  if (isError) {
    return <div>error</div>;
  }

  const contents = data?.data.map((item: Data) => {
    return (
      <div key={item?.id}>
        <Typography variant="body1" gutterBottom>
          {item?.title}
        </Typography>
        <hr />
      </div>
    );
  });
  return <>{contents}</>;
}
