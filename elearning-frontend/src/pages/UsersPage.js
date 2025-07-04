import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

const UsersPage =()=>{
    const[users,setUsers] =useState([]);
    useEffect(()=>{
        axios.get("http://localhost:8080/api/users")
        .then((response)=>{
            setUsers(response.data);
        })
        .catch((error)=>{
            console.log("Error Fetching the data" +error);
        });
    },[]);


    return(

        <div className="container mt-4">
            <h2>All Users</h2>
            {users.length===0?(
                <p>No users found</p>
            ):(
                <table className="table table-bordered">
                   <thead style={{ backgroundColor: "#001f3f", color: "white" }}>

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((users)=>(
                            <tr key={users.id}>
                                <td>{users.id}</td>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
           
        </div>
    );
};
export default UsersPage;