// import styles from'./App.css'

import { useEffect, useState, type FormEvent } from "react";

type Task = {
  id: number;
  title: string;
  completed: string;
};

function App() {

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? (JSON.parse(savedTasks) as Task[]) : [];
  });

  const [search, setSearch] = useState("");
  const [searchcomp, setSearchComp] = useState("");
  const [text, setText] = useState("");
  const [comp, setComp] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const getFiltered = () => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      if (searchcomp === "Выполненно") {
        return matchesSearch && task.completed === "Выполненно";
      }
      if (searchcomp === "Не выполненно") {
        return matchesSearch && task.completed === "Не выполненно";
      }

      return matchesSearch;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setSearchComp("");
  };

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: text,
      completed: comp || "Не выполненно", 
    };

    setTasks([...tasks, newTask]);
    setText("");
    setComp("");
  }

  return (
    <div>

      <input
        type="text"
        placeholder="Поиск привычек"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={searchcomp}
        onChange={(event) => setSearchComp(event.target.value)}
      >
        <option value="">Все</option>
        <option value="Выполненно">Выполненно</option>
        <option value="Не выполненно">Не выполненно</option>
      </select>

      <button onClick={resetFilters}>Сбросить</button>

      <h1>Создать привычку</h1>

      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Введите свою привычку"
        />
        <select
          value={comp}
          onChange={(event) => setComp(event.target.value)}
        >
          <option value="">Выберите статус</option>
          <option value="Выполненно">Выполненно</option>
          <option value="Не выполненно">Не выполненно</option>
        </select>
        <button type="submit">Сохранить</button>
      </form>
      <ul>
        {getFiltered().map((task) => (
          <li key={task.id}>
            {task.title} — <strong>{task.completed}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;