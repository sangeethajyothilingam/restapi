import { Header } from './Header';
import {Content} from './Content';
import { Footer } from './Footer';
import { useState, useEffect } from 'react';
import { AddItem } from './AddItem';
import { SearchItem } from './SearchItem';


function App() {

  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([])
  const [newItem,setnewItem] = useState('')
  const [search,setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
   useEffect(() =>{
     const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Data not received');
        console.log(response)
        const listItems = await response.json();
        console.log(listItems)
        setItems(listItems);
          setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }finally    
       {
        setIsLoading(false);
      }
    }

    setTimeout(() => fetchItems(), 2000);

  }, [])

   

  const addItem = (item) =>{
    const id = items.length? items[items.length - 1].id + 1 : 1
    const addNewItem = {id, checked:false, item}
    const listItems =[...items, addNewItem]
    setItems(listItems)
    console.log(listItems)
    //localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  const handleChange = (id) =>{
    const listItems = items.map ((item) =>
    item.id ===id? {...item,checked:!item.checked}: item)
    setItems(listItems)
    //localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

  const handleDelete = (id) =>{
    const listItems = items.filter ((item) =>
    item.id!==id)
    setItems(listItems)
    //localStorage.setItem("todo_list", JSON.stringify(listItems))
  }
  const handleSubmit = (e) =>{
    e.preventDefault( )
    if (!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setnewItem('')
  }
  

  return (
    <div className="App">
      
      <Header title ="useeffect-hook"/>
      <AddItem
      newItem = {newItem}
      setnewItem ={setnewItem}
      handleSubmit ={handleSubmit}/>
      <SearchItem
      search = {search}
      setSearch = {setSearch}/>
      <main>

        {isLoading && <p>Loading Items...</p>}
         {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
       {!fetchError && !isLoading &&<Content 
        items ={items.filter((item) =>((item.item).toLowerCase()).includes (search.toLowerCase()))}
        setItems ={setItems}
        handleChange ={handleChange}
        handleDelete ={handleDelete}
      />}
      </main>
      <Footer
      length ={items.length}/>
      
    </div>
  );
}

export default App;
