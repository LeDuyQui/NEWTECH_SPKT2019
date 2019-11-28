interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    name: 'Testing Management',
    url: '/dashboard',
    children: [
      {
        name: 'User Types',
        url: '/user-types',
        icon: 'icon-puzzle'
      },
      {
        name: 'Users',
        url: '/users',
        icon: 'icon-puzzle'
      },
      {
        name: 'Classes',
        url: '/classes',
        icon: 'icon-user'
      },
      
    ]
  },
];
