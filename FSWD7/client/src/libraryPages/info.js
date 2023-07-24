import { useState } from "react";
import styles from "./Info.module.css";

function Info() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [isEdit, setIsEdit] = useState(0);

  const editInfo = () => {
    // Add your logic here to handle the saving of edited information
  };

  return (
    <div>
      {isEdit === 1 ? (
        <div className={styles["user-card"]}>
          <h1>{user.first_name} {user.last_name}</h1>
          <table>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{user.address}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{user.age}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => setIsEdit(1)}>Edit</button>
        </div>
      ) : (
        <div className={styles["user-card"]}>
          <input id="updateFirstName" defaultValue={user.first_name} />
          <input id="updateLastName" defaultValue={user.last_name} />
          <input id="updateEmail" defaultValue={user.email} />
          <input id="updateUserName" defaultValue={user.username} />
          <input id="updateEmail" defaultValue={user.email} />
          <input id="updatePhone" defaultValue={user.phone} />
          <input id="updateAddress" defaultValue={user.address} />
          <input id="updateAge" defaultValue={user.age} />
          <button onClick={editInfo}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Info;
