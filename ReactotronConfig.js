import Reactotron from "reactotron-react-native";

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

  Reactotron.onCustomCommand({
    command: "test2",
    handler: () => console.log("This is an example 2"),  // Optional settings
    title: "A thing", // This shows on the button
    description: "The desc", // This shows below the button
  })

//   // Completely reset the app's react-navigation state:
// Reactotron.onCustomCommand({
//     title: "Reset Navigation State",
//     description: "Resets the navigation state",
//     command: "resetNavigation",
//     handler: () => {
//         dispatch(logout());
//     },
//   })