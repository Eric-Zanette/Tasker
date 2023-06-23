import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

const Home = () => {
  return (
    <div className="container">
      <TaskForm/>
      <TaskList/>
    </div>
  )
}

export default Home