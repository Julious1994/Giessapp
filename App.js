import {
  createStackNavigator,
} from 'react-navigation';

import {routes} from './src/routes';

const App = createStackNavigator({
  ...routes,
});

export default App;
