import { createFileRoute } from '@tanstack/react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import type { Data } from '@/types/react_query';
import LoadingCircular from '@/components/feedback/LoadingCircular';
import { qiitaUrl } from '@/URLs';

export const Route = createFileRoute('/_auth/react_query')({
  component: Index
});

function Index() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['qiita'],
    queryFn: async () => await axios.get(qiitaUrl)
  });
  if (isLoading) {
    return LoadingCircular;
  }
  if (isError) {
    return 'error';
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
