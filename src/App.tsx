import ReactCalendar from "./react-calendar";

const App = () => (
  <ReactCalendar
    lang="pt"
    value={new Date('2002 1 03')}
    onChange={(e) => console.log(e)}
  />
);

export default App;
