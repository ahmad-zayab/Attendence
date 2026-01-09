import { useState, useEffect } from "react";
import { createClient } from 'pexels';
const Result = ({ items, onDelete, onUpdate, onImageUpload }) => {
  const [itemsState, setItems] = useState();
  const [images, setImages] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const client = createClient('ot6OzAvqH1xOr10HJkUYndItOPV8QjUbQX9RaYJJbFDKRDCYgRJ87YBM');
  const query = 'Nature';
  useEffect(() => {

    client.photos.search({ query, page: 1, per_page: 1 })

      .then((response) => {
        console.log(response)
        //setItems(response.photos[0].photographer);
        setImages(response.photos[0].src.medium);
      })
      .catch(() => {
        setResponseMessage("Error fetching image");
      });
  }, []);
  const deleteItemByValue = (itemToDelete) => {
    console.log("Deleting item:", itemToDelete);
    console.log("Current items before deletion:", items);
    let updatedItems = items.filter((item, index) => index !== itemToDelete);
    items = updatedItems;
    console.log("Updated items:", updatedItems);
  };
  return (
    <>
      <div className="Results">
        <h1>Result Component</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    {/* <p>{responseMessage}</p>
                    <p>{itemsState}</p>
                    <img src={images} alt="image" width='100px' height='100px'/> */}
                    <label>
                      {/* <button type="button">Upload Image</button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      /> */}
                    
                      {console.log("Image info",item.image)}
                      {item.image!==undefined? item.image && (
                        <img
                          src={URL.createObjectURL(item.image)}
                          alt="preview"
                          width="100"
                          height="100"
                        />
                      ):<img src={images} alt="image" width='100px' height='100px'/>}
                    </label>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.address}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-outline-secondary" onClick={() => onUpdate(index)}>Update</button>

                      <button className="btn btn-outline-danger" onClick={() => onDelete(index)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Result;