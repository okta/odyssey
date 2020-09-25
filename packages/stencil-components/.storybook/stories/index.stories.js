import { storiesOf } from '@storybook/html';
import './welcome/welcome.css';
import welcome from './welcome/welcome.html';

storiesOf('Welcome', module)
  .add('Welcome', () => {
    const title = process.env.STORYBOOK_WELCOME_TITLE;
    return welcome.replace('%STORYBOOK_WELCOME_TITLE%', title);
  });

const req = require.context('./components', true, /.stories.js$/);
req.keys().forEach(filename => req(filename));
