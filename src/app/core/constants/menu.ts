import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Main Menu',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Nfts', route: '/dashboard/nfts' },
            // { label: 'Podcast', route: '/dashboard/podcast' },
          ],
        },

        //--Pharmacy
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Pharmacy',
          route: '/pharmacy',
          children: [
            { label: 'Dashboard', route: '/pharmacy/dashboard' },
            { label: 'Inventory', route: '/pharmacy/inventory' },
            { label: 'Billing', route: '/pharmacy/billing' },
            { label: 'Settings', route: '/pharmacy/settings' },
          ],
        },

         //--Human Resource
         {
          icon: 'assets/icons/heroicons/outline/user-star.svg',
          label: 'Human Resource',
          route: '/human-resource',
          children: [
            { label: 'Dashboard', route: '/human-resource/dashboard' },
            { label: 'Employee Master', route: '/human-resource/employee' },
            { label: 'Payroll Heads', route: '/human-resource/employee/salary' },
            { label: 'Attendence Register', route: '/human-resource/attendence' },
            { label: 'Leave Register', route: '/human-resource/leaves' },
            { label: 'Holiday Register', route: '/human-resource/holiday' },

            //--last
            { label: 'Settings', route: '/human-resource//settings' },
            
          ],
        },

        //---Accounts
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Accounting & Budget',
          route: '/accounts',
          children: [
            { label: 'Dashboard', route: '/accounts' },
            { label: 'General Ledger', route: '/accounts/general-ledgers' },
            { label: 'General Accounts', route: '/accounts/general-accounts' },
            { label: 'Account Statement', route: '/accounts/statement-of-accounts' },
            // { label: 'Voucher View', route: '/accounts/statement-of-accounts' },
            // {
            //   label: 'Reports', route: '/accounts', children: [
            //     { label: 'Sign up', route: '/auth/sign-up' },
            //     { label: 'Sign in', route: '/auth/sign-in' },
            //     { label: 'Forgot Password', route: '/auth/forgot-password' },
            //     { label: 'New Password', route: '/auth/new-password' },
            //     { label: 'Two Steps', route: '/auth/two-steps' },
            //   ]
            // },
          ],
        },

        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/auth/sign-up' },
            { label: 'Sign in', route: '/auth/sign-in' },
            { label: 'Forgot Password', route: '/auth/forgot-password' },
            { label: 'New Password', route: '/auth/new-password' },
            { label: 'Two Steps', route: '/auth/two-steps' },
          ],
        },

        {
          icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
          label: 'Errors',
          route: '/errors',
          children: [
            { label: '404', route: '/errors/404' },
            { label: '500', route: '/errors/500' },
          ],
        },

        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Components',
          route: '/components',
          children: [{ label: 'Table', route: '/components/table' }],
        },
      ],
    },
    {
      group: 'Application',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Download',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Gift Card',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'Users',
          route: '/user',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Folders',
          route: '/folders',
          children: [
            { label: 'Current Files', route: '/folders/current-files' },
            { label: 'Downloads', route: '/folders/download' },
            { label: 'Trash', route: '/folders/trash' },
          ],
        },
      ],
    },
  ];
}
