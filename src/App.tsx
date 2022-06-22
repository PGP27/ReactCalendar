import ReactCalendar from "./react-calendar";

const App = () => (
  <ReactCalendar onChange={(e: any) => console.log(e)} />
);

export default App;
