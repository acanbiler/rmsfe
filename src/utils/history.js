import { createBrowserHistory } from 'history';
const history = createBrowserHistory({ basename: process.env.PUBLIC_PATH });
export default history;