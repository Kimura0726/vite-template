import type { Data, Tag, User } from '@/types/react_query';

const testTag: Tag[] = [
  {
    name: 'test',
    versions: {}
  }
];

const testQiitaUser: User[] = [
  {
    description: 'test',
    facebook_id: 'test',
    followees_count: 1,
    followers_count: 2,
    github_login_name: 'test',
    id: 'test',
    item_count: 3,
    linkedin_id: 4,
    location: 'test',
    name: 'test',
    organization: 'test',
    permanent: 'test',
    profile_image_url: 'test',
    team_only: false,
    twitter_screen_name: 'test',
    website_url: 'test'
  }
];

export const qiita: Data[] = [
  {
    body: 'test',
    coediting: false,
    comments_count: 5,
    group: 6,
    id: 'test',
    link_count: 7,
    page_views_count: 8,
    private: true,
    reactions_count: 9,
    rendered_body: 'test',
    stocks_count: 10,
    tags: testTag,
    team_membership: 11,
    title: 'testTitle',
    updated_at: 'test',
    url: 'test',
    user: testQiitaUser
  }
];
