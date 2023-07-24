import { useState ,useEffect} from "react";
import styles from "./Info.module.css";

function Info() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  const [isEdit, setIsEdit] = useState(0);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, [localStorage.getItem("currentUser")]);

  const editInfo =async () => {
    let fisrtName = document.getElementById("updatedFirstName").value;
    let lastName = document.getElementById("updatedLastName").value;
    let userName = document.getElementById("updatedUserName").value;
    let email = document.getElementById("updatedEmail").value;
    let phone = document.getElementById("updatedPhone").value;
    let address = document.getElementById("updatedAddress").value;
    let age = document.getElementById("updatedAge").value;





    if (!fisrtName || !lastName || !userName || !email || !phone || !address || !age) {
      alert("One or more fields are missing!");
      return;
    }
    const userInfo = {
      id: user.id,
      fisrt_name: fisrtName,
      last_name: lastName,
      username: userName,
      email: email,
      phone: phone,
      address: address,
      age: age
    };

    const url = `http://localhost:3000/Info/${user.id}`;
    console.log(user);

    const requestUpdateUserInfo = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    };

    await fetch(url, requestUpdateUserInfo)
      .then((res) => {
        console.log("info fetch");
        localStorage.setItem("currentUser", JSON.stringify(userInfo));
        setUser(userInfo);
        setIsEdit(0);
        console.log(user);
        console.log(userInfo);
      })
      .catch((error) => {
        console.log(error);
      });
    
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
          <br />
          <input id="updatedLastName" defaultValue={user.last_name} />
          <br />
          <input id="updatedUserName" defaultValue={user.username} />
          <br />
          <input id="updatedEmail" defaultValue={user.email} />
          <br />
          <input id="updatedPhone" defaultValue={user.phone} />
          <br />
          <input id="updatedAddress" defaultValue={user.address} />
          <br />
          <input id="updatedAge" defaultValue={user.age} />
          <br />
          <button onClick={editInfo}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Info;
