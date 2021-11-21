import { TodoList } from "./components/todo-list/todo-list";
import "./App.scss";
import { Drawer } from "./components/drawer/drawer";
import { useState } from "react";
import { TodoEditor } from "./components/todo-editor/todo-editor";
import { TodoProvider } from "./components/todo-provider";
import { DrawerContext } from "./context/drawer-context";

function App() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	return (
		<TodoProvider>
			<div className="app-container">
				<h1>Tasks</h1>
				<button
					className="add-todo-button"
					onClick={() => setIsDrawerOpen(true)}
				>
					New Item
				</button>
				<DrawerContext.Provider
					value={{ isOpen: isDrawerOpen, setIsOpen: setIsDrawerOpen }}
				>
					<TodoList />
					<Drawer>
						<TodoEditor />
					</Drawer>
				</DrawerContext.Provider>
			</div>
		</TodoProvider>
	);
}

export default App;
