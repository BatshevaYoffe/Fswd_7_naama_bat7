import { useState } from "react";
import styles from "./Info.module.css";

function Info() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [isEdit, setIsEdit] = useState(0);

  const editInfo = () => {
    let fisrtName = document.getElementById("updatedFirstName").value;
    let lastName = document.getElementById("updatedLastName").value;
    let userName = document.getElementById("updatedUserName").value;
    let email = document.getElementById("updatedEmail").value;
    let phone = document.getElementById("updatedPhone").value;
    let address = document.getElementById("updatedAddress").value;
    let age = document.getElementById("updatedAge").value;





    if (!fisrtName || !lastName || !userName || !email|| !phone|| !address|| !age) {
      alert("One or more fields are missing!");
      return;
    }
    const userInfo = {
        fisrtName: fisrtName,
        lastName: lastName,
        userName:userName,
        email: email,
        phone:phone,
        address:address,
        age:age
    };

    const url = `http://localhost:3000/Info/${user.id}`;
  
    const requestUpdateUserInfo = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    };
  
    fetch(url, requestUpdateUserInfo)
      .catch((error) => {
        console.log(error);
      });
    setIsEdit(0);
  };
    

  return (
    <div>
      {isEdit === 0 ? (
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
          <input id="updatedFirstName" defaultValue={user.first_name} />
          <input id="updatedLastName" defaultValue={user.last_name} />
          <input id="updatedUserName" defaultValue={user.username} />
          <input id="updatedEmail" defaultValue={user.email} />
          <input id="updatedPhone" defaultValue={user.phone} />
          <input id="updatedAddress" defaultValue={user.address} />
          <input id="updatedAge" defaultValue={user.age} />
          <button onClick={editInfo}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Info;
