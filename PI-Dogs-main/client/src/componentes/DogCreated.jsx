import React,{useState,useEffect} from "react";
import { Link , useHistory} from "react-router-dom";
import { createDog, getTemperaments } from "../actions";
import { useDispatch, useSelector} from "react-redux";

function validate (input){
    let errors = {};
    if (!input.name){
        errors.name = "Breed is required";
    }if ( !input.life_span){
        errors.life_span = "Life span is required";
    }if (!input.heightMin){
        errors.heightMin = "Minimum height required"
    }if (!input.heightMax){
        errors.heightMax = "Maximum height required";
    }if (!input.weightMin){
        errors.weightMin = "Minumum weight required";
    }else if (!input.weightMax){
        errors.weightMax = "Maximum weight required";
    }
    return errors;
}



export default function DogCreated (){
    const dispatch = useDispatch()
    const history = useHistory()
    const temp = useSelector ((state) => state.temperaments)
    const [errors,setErrors] = useState({})
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
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }));
        console.log(input)
    }
    function handleSelect (e){
        setInput({
            ...input,
            temp:[...input.temp,e.target.value]
        })
    }
    function handleDelete (el){
      setInput({
          ...input,
          temp : input.temp.filter (occ => occ !== el )
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
                    {errors.name && (
                        <p className = "error">{errors.name}</p>
                    )}
                </div>
                <div>
                <label>Life Span:</label>
                    <input 
                    type = "text"
                    value = {input.life_span}
                    name = "life_span"
                    onChange = {handleChange}
                    />
                    {errors.life_span && (
                        <p className = "error">{errors.life_span}</p>
                    )}
                </div>
                <div>
                <label>Height Mainimum:</label>
                    <input 
                    type = "text"
                    value = {input.heightMin}
                    name = "heightMin"
                    onChange = {handleChange}
                    />
                    {errors.heightMin && (
                        <p className = "error">{errors.heightMin}</p>
                    )}
                </div>
                <div>
                <label>Height Maximum:</label>
                    <input 
                    type = "text"
                    value = {input.heightMax}
                    name = "heightMax"
                    onChange = {handleChange}
                    />
                    {errors.heightMax && (
                        <p className = "error">{errors.heightMax}</p>
                    )}
                </div>
                <div>
                <label>Weight Minimum:</label>
                    <input 
                    type = "text"
                    value = {input.weightMin}
                    name = "weightMin"
                    onChange = {handleChange}
                    />
                    {errors.weightMin && (
                        <p className = "error">{errors.weightMin}</p>
                    )}
                </div>
                <div>
                <label>Weight Maximum:</label>
                    <input 
                    type = "text"
                    value = {input.weightMax}
                    name = "weightMax"
                    onChange = {handleChange}
                    />
                    {errors.weightMax && (
                        <p className = "error">{errors.weightMax}</p>
                    )}
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
            {input.temp.map(el => 
                <div className = "divDel">
                    <p>{el}</p>
                    <button className = "botonDel" onClick= {()=> handleDelete(el)}>X</button>
                </div>
                )}
        </div>
    )
}