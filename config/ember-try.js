/*jshint node:true*/
module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.11',
      dependencies: {
        'ember': '~1.11'
      }
    },
    {
      name: 'ember-1.12',
      dependencies: {
        'ember': '~1.12'
      }
    },
    {
      name: 'ember-1.13',
      dependencies: {
        'ember': '~1.13'
      }
    },
    {
      name: 'ember-2.0',
      dependencies: {
        'ember': '~2.0'
      }
    },
    {
      name: 'ember-2.1',
      dependencies: {
        'ember': '~2.1'
      }
    },
    {
      name: 'ember-2.2',
      dependencies: {
        'ember': '~2.2'
      }
    },
    {
      name: 'ember-2.3',
      dependencies: {
        'ember': '~2.3'
      }
    },
    {
      name: 'ember-2.4',
      dependencies: {
        'ember': '~2.4'
      }
    },
    {
      name: 'ember-2.5',
      dependencies: {
        'ember': '~2.5'
      }
    },
    {
      name: 'ember-2.6',
      dependencies: {
        'ember': '~2.6'
      }
    },
    {
      name: 'ember-2.7',
      dependencies: {
        'ember': '~2.7'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
