import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ListCustomer() {
    const [customers, setCustomers] = useState([])

    async function getAllCustomer() {
        const res = await axios.get("http://localhost:5000/api/customer");
        console.log(res.data);
        setCustomers(res.data)
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`http://localhost:5000/api/customer/${id}`)
            console.log("Customer data deleted");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCustomer();
    }, [customers])

    return(
        <div className="p-5 bg-light vh-100">
            <div className="bg-white rounded p-5 table-responsive">
                <table class="table caption-top table-borderless">
                    <caption className="text-black fs-4">List of Customers</caption>
                    <thead>
                        <tr className="text-nowrap">
                            <th >Name</th>
                            <th >Instagram Username</th>
                            <th >Favorite Outfit Color</th>
                            <th >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customers.map((item, index) => {
                            return(
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.instagram_username}</td>
                                    <td>{item.favorite_outfit_color}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={e=>handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to={"/add-customer"} className="btn btn-success text-nowrap">Add Customer</Link>           
            </div>
        </div>
    )
}