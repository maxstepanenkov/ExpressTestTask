const ROLES = require('../constants/roles')

const signUpSchema = {
  'role': {
    in: 'body',
    matches: {
      options: [ROLES],
      errorMessage: 'The role must be either ADMIN or USER'
    }
  }
}

module.export = signUpSchema;