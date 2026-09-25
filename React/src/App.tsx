// import styles from'./App.css'
// import CreaterItem from "./Component/CreaterItem/createritem";
import { useEffect, useState, type FormEvent } from "react";

type Task = {
  id: number;
  title: string;
  completed: string;
  ckok: string;
  restor: string
};
function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? (JSON.parse(savedTasks) as Task[]) : [];
  });
  const [text, setText] = useState("");
  const [comp, setComp ] = useState("")
  const [ckok, setCkok ] = useState("")
  const [restor, setRestor ] = useState("")
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: text,
      completed: comp,
      ckok: ckok,
      restor: restor,
    };

    setTasks([...tasks, newTask]);
    setText("");
    setComp("");
    setCkok("");
    setRestor("");
  }

  return (
    <div>
      <h1>Создать привычку</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Введдите свою привычку"
        />
        <select 
            value={comp}
            onChange={(event) => setComp(event.target.value)}
          >
            <option value=""></option>
            <option value=" Выполненно">Выполненно</option>
            <option value=" Не Выполненно">Не Выполненно</option>
          </select>
        <button type="submit">Сохранить</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}{task.completed}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;