const fieldIsRequired = fieldName => `${fieldName} is required`;
const fieldIsShort = fieldName => `${fieldName} is too short`;

export default {
  email: [
    {
      rule: 'required',
      message: fieldIsRequired('Email'),
    },
    {
      rule: 'email',
      message: 'Invalid email',
    },
  ],
  password: [
    {
      rule: 'required',
      message: fieldIsRequired('Password'),
    },
    {
      rule: 'minLength',
      message: fieldIsShort('Password'),
    },
  ],
  name: [
    {
      rule: 'Name',
      message: fieldIsRequired('Name'),
    },
    {
      rule: 'minLength',
      message: fieldIsShort('Name'),
    },
  ],
  last_name: [
    {
      rule: 'required',
      message: fieldIsRequired('Last name'),
    },
    {
      rule: 'minLength',
      message: fieldIsShort('Last name'),
    },
  ],
  repeatPassword: [
    {
      rule: 'required',
      message: 'Repeat password',
    },
    {
      rule: 'sameAsPassword',
      message: 'Passwords do not match',
    },
  ],
  group_id: [
    {
      rule: 'required',
      message: fieldIsRequired('Group'),
    },
  ],
};
