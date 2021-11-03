import React,{useState,useEffect} from "react";
import { Link , useHistory} from "react-router-dom";
import { createDog, getTemperaments } from "../actions";
import { useDispatch, useSelector} from "react-redux";

export default function DogCreated (){
    const dispatch = useDispatch()
    const history = useHistory()
    const temp = useSelector ((state) => state.temperaments)
    const [input , setInput]= useState({
      name: "",
      life_span: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax:"",
      image:"",
      temp:[],
    })
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    function handleSelect (e){
        setInput({
            ...input,
            temp:[...input.temp,e.target.value]
        })
    }
    function handleSubmit (e){
        e.preventDefault();
        dispatch(createDog(input))
        alert("Dog has been created!!")
        setInput({
            name: "",
            life_span: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax:"",
            image:"",
            temp:[],
        })
        history.push('/home')
    }

    useEffect (()=>{
        dispatch (getTemperaments())
        
    },[])

    return (
        <div>
            <Link to = "/home">
                <button>Back</button>
            </Link>
            <h1>Create your own dog!</h1>
            <form onSubmit = {(e)=> handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                    type = "text"
                    value = {input.name}
                    name = "name"
                    onChange = {handleChange}
                    />
                </div>
                <div>
                <label>Life Span:</label>
                    <input 
                    type = "text"
                    value = {input.life_span}
                    name = "life_span"
                    onChange = {handleChange}
                    />
                </div>
                <div>
                <label>Height Maximo:</label>
                    <input 
                    type = "text"
                    value = {input.heightMin}
                    name = "heightMin"
                    onChange = {handleChange}
                    />
                </div>
                <div>
                <label>Height Maximo:</label>
                    <input 
                    type = "text"
                    value = {input.heightMax}
                    name = "heightMax"
                    onChange = {handleChange}
                    />
                </div>
                <div>
                <label>Weight Minimo:</label>
                    <input 
                    type = "text"
                    value = {input.weightMin}
                    name = "weightMin"
                    onChange = {handleChange}
                    />
                </div>
                <div>
                <label>Weight Maximo:</label>
                    <input 
                    type = "text"
                    value = {input.weightMax}
                    name = "weightMax"
                    onChange = {handleChange}
                    />
                </div>
                <div>
                <label>Image:</label>
                    <input 
                    type = "text"
                    value = {input.image}
                    name = "image"
                    onChange = {handleChange}
                    />
                </div>
                <select onChange = {(e)=> handleSelect(e)}>
                    {
                        temp.map((temp)=> (
                            <option value={temp.name}>{temp.name}</option>
                        ))
                    }
                </select>
                <ul><li>{input.temp.map(el=> el + " ,")}</li></ul>
                <button type = "submit">Create Dog</button>
            </form>
        </div>
    )
}