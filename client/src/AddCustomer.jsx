import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddCustomer() {
    const [name, setName] = useState('')
    const [instagram_username, setInstagramUsername] = useState('')
    const [favorite_outfit_color, setFavoriteOutfitColor] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();
        const res = await axios.post("http://localhost:5000/api/customer", {name, instagram_username, favorite_outfit_color});
        console.log("ini response post", res);
        navigate('/');
    }

    return(
        <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handleSubmit}>
                    <h2>Add Customer</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" onChange={e=> setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Instagram Username</label>
                        <input type="text" placeholder="Enter Instagram Username" className="form-control" onChange={e=> setInstagramUsername(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Favorite Outfit Color</label>
                        <input type="text" placeholder="Enter Favorite Outfit Color" className="form-control" onChange={e=> setFavoriteOutfitColor(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}