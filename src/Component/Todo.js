import "./Todo.css";
import {useState, useEffect} from "react";



// get local data

const getLocalData = () => {
    const lists = localStorage.getItem("todolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState();
    const [items, setItems] = useState(getLocalData());
    const [toggleBtn, setToggleBtn] = useState(false);
    const [isEditItem, setIsEditItem] = useState("");

    const addItems = (inputData) =>{
        if(!inputData) alert("Please Enter an Item");
        else if(inputData && toggleBtn){
            setItems(items.map((curElem) => {
                if(curElem.id === isEditItem){
                    return { ...curElem, name: inputData};
                }
                return curElem;
            }));
            setInputData("");
            setToggleBtn(false);
        }
        else{
            const newInputData = {
                id : new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, newInputData]);
            setInputData("");
        }
    }

    const editItems = (element) =>{
        
        setInputData(element.name);
        setToggleBtn(true);
        setIsEditItem(element.id);
    }
    // for delete Functionality
    const deleteItems = (index) =>{
        const updatedList = items.filter((curElem) => {
            return  curElem.id !== index;
        })  

        setItems(updatedList);
    }

    // for local storage

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(items));
    }, [items])

    return ( 
        <>
            <div className="big-container">
                <div className="container">
                    <img src="./images/todo.png" alt="" />
                    <p className="heading">Add Your List Here &#9996;</p>
                    <div className="input-container">
                        <input type="text" value={inputData}
                            onChange={(event) => setInputData(event.target.value)} className="add-item" 
                            placeholder="&#9997; Add Item..." ></input>
                        
                        {toggleBtn ? <span className="add-icon fa-solid fa-pen-to-square" 
                            onClick={() => addItems(inputData)} style={{color:"#0cd995"}}></span> : 
                            <span className="add-icon fa-solid fa-plus" 
                            onClick={() => addItems(inputData)}></span>}
                        
                    </div>
                </div>
                <div className="show-items">
                    {items.map((curElem,index) => {
                        return(
                        <div className="item" key={curElem.id}>
                            <p className="item-text">{curElem.name}</p>
                            <span className="edit-icon fa-solid fa-pen-to-square" onClick={() => editItems(curElem)}></span>
                            <span className="delete-icon fa-solid fa-trash" onClick={() => deleteItems(curElem.id)}></span>
                        </div>
                        );
                    })}
                    
                </div>
            </div>
            
        </>
     );
}
 
export default Todo;