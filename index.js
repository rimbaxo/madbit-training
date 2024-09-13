import { DevSettings, NativeModules } from 'react-native';

if (__DEV__) {
    require("./ReactotronConfig");
    DevSettings.addMenuItem("Custom Debugging", () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
    });
}
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
