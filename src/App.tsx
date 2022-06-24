import ReactCalendar from "./react-calendar";

const App = () => (
  <ReactCalendar value={new Date('2002 1 03')} lang="pt" onChange={(e) => console.log(e)} />
);

export default App;
