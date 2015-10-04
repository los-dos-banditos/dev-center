/**
* Flag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedAt: true,
  autoUpdatedAt: true,
  migrate: 'drop',

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    appplication: {
      model: 'app',
    },
    description: {
      type: 'string',
      defaultsTo: ''
    },
    environment: {
      type: 'string',
      in: ['dev', 'stage', 'uat', 'prod']
    },
    value: {
      type: 'boolean',
      defaultsTo: false
    }
  },

  beforeCreate: function verifyNoDuplicates (values, cb) {
    var Flag = sails.models.Flag,
        searchOptions;

    searchOptions = {
      name: values.name,
      environment: values.environment
    };

    Flag.find(searchOptions)
      .then(function (results) {
        if (results.length > 0) {
          cb(new Error('There is already a flag with the same name and environment.'));
        } else {
          cb();
        }
      });
  }
};
