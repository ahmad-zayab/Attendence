import { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import Result from "../pages/Result";
import record from "../record.json";
import './dashboard.css'
const Dashboard = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
  let [data, setData] = useState([...record]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("editIndex:", editIndex);
    if (!name || !age) return;

    if (editIndex !== null) {
      const updatedData = data.map((item, index) =>
        index === editIndex ? { name, age, address,image } : item
      );
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, { name, age, address,image }]);
    }

    setName("");
    setAge("");
    setAddress("");
    // saveData(data);
  };
const gotoLogin=()=>{
  setTimeout(() => navigate("/"), 1000);
}
  const deleteItem = (indexToDelete) => {
    setData(data.filter((_, index) => index !== indexToDelete));
  };

  const handleUpdate = (index) => {
    setName(data[index].name);
    setAge(data[index].age);
    setAddress(data[index].address);
    setEditIndex(index);
  };
  const handleImageUpload = (index) => {
 setImage(data[index].image)

  };
  // const saveData=(data)=>{
  //   const jsonData=JSON.stringify(data);
  //   console.log("Saving data:",jsonData);
  //  fs.writeFile('./src/componentsCRUD/record.json',jsonData,(err)=>{
  //     if(err){
  //       console.log("Error writing file",err);
  //     }else{
  //       console.log("Successfully wrote file");
  //     }
  //   });
  // }

  return (
    <div className="Create">
      {editIndex !== null ? <h2>Edit Item</h2> : <h2>Create New Item</h2>}
<div className="logout-button">
 <button
        type="button"
        className="btn btn-outline-danger"
        onClick={gotoLogin}
      >Log out</button>
</div>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>

        <p>
          <label>Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </p>

        <p>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </p>

        {editIndex !== null ?<p>
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={(e)=>setImage(e.target.files[0])}
            />
          <button type="button">Upload Image</button>
          </label>
        </p>:null}


        {editIndex !== null ? <button type="submit" className="btn btn-success">Update Info</button> : <button type="submit" className="btn btn-success">Add Info</button>}
      </form>

      <hr />
      {editIndex !== null ? null : <Result items={data} onDelete={deleteItem} onUpdate={handleUpdate} onImageUpload={handleImageUpload} />}

      {/* <h3>Submitted Data</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Name: {item.name} | Age: {item.age}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Dashboard;
