import axios from 'axios';
import { useQuery } from 'react-query';
import Typography from '@mui/material/Typography';

interface Tag {
  name: string;
  versions: object;
}

interface User {
  description: string;
  facebook_id: string;
  followees_count: number;
  followers_count: number;
  github_login_name: string;
  id: string;
  item_count: number;
  linkedin_id: number;
  location: string;
  name: string;
  organization: string;
  permanent: string;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string;
  website_url: string;
}

interface Data {
  body: string;
  coediting: boolean;
  comments_count: number;
  group: any;
  id: string;
  link_count: number;
  page_views_count: number;
  private: boolean;
  reactions_count: number;
  rendered_body: string;
  stocks_count: number;
  tags: Tag[];
  team_membership: any;
  title: string;
  updated_at: string;
  url: string;
  user: User[];
}

const Query = (): JSX.Element => {
  const url: string = 'https://qiita.com/api/v2/items';
  const { data, isLoading, isError } = useQuery(
    ['qiita'],
    async () => await axios.get(url)
  );
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
};

export default Query;
