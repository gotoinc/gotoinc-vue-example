export default {
  email: [
    {
      rule: 'required',
      message: 'Email is required',
    },
    {
      rule: 'email',
      message: 'Invalid email',
    },
  ],
  password: [
    {
      rule: 'required',
      message: 'Password is required',
    },
    {
      rule: 'minLength',
      message: 'Password is too short',
    },
  ],
};
