import ToDoList from "../components/ToDoList";

function HomePage() {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const dateOfMonth = date.getDate();

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${dayNames[day]}, ${monthNames[month]} ${dateOfMonth}`;

  return (
    <>
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          My Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Welcome back! Here are your tasks for today, {formattedDate}
        </p>
      </div>
      <ToDoList></ToDoList>
    </>
  );
}

export default HomePage;
