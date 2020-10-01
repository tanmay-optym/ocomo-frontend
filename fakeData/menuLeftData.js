export default {
  SHORT_TERM_PLANNING: {
    title: 'Short Term Planning',
    menus: [
      {
        title: 'Model Constraints',
        url: '',
        children: [
          {
            title: 'Resource Plan',
            url: '/resource-plan'
          },
          {
            title: 'Standard Work Hours',
            url: '/standard-work-hours'
          },
          {
            title: 'Travel Time Lookup',
            url: '/travel-time-lookup'
          },
          {
            title: 'Additional Parameters',
            url: '/additional-parameters'
          }
        ]
      },
      {
        title: 'UI Settings',
        url: '',
        children: [
          { title: 'Alert Thresholds', url: '/alert-thresholds' },
          { title: 'Filter Configuration', url: '/filter-configuration' },
          { title: 'KPI Color Threshold', url: '/kpi-color-threshold' }
        ]
      }
    ]
  },
  LONG_TERM_SETTINGS: {
    title: 'Long Term settings',
    menus: [
      {
        title: 'Model Constraints',
        children: [
          {
            title: 'Shop Plan',
            url: ''
          },
          {
            title: 'Work Type',
            url: ''
          },
          {
            title: 'Additional Parameters',
            url: ''
          }
        ]
      },
      {
        title: 'UI Settings',
        url: '',
        children: [
          { title: 'Filter Configuration', url: '' },
          { title: 'KPI Color Threshold', url: '' }
        ]
      }
    ]
  }
};
