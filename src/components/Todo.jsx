function Todo ({task}){
    function deleteTask(){
        console.log("button clicked");

    }
    return (
        <>
        <div className="todo-item">
            <h2>{task}</h2>
            <button onClick={() => deleteTask()} className="delete__btn">Delete</button>
        </div>
        </>
    )
}

export default Todo;