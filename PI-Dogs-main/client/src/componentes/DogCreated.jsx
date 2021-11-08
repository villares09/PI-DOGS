import React,{useState,useEffect} from "react";
import { Link , useHistory} from "react-router-dom";
import { createDog, getTemperaments } from "../actions";
import { useDispatch, useSelector} from "react-redux";
import styles from "./styles/DogCreated.module.css"

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
        <div className={styles.background}>
            <Link to = "/home">
                <button className = {styles.button}>Back</button>
            </Link>
            <div className={styles.label}>
            <h1>Create your own dog!</h1>
            </div>
            <form className = {styles.form} onSubmit = {(e)=> handleSubmit(e)}>
                <div className={styles.label}>
                    <label>Name:</label>
                    </div>
                    <input className={styles.input}
                    type = "text"
                    value = {input.name}
                    name = "name"
                    onChange = {handleChange} required
                    />
                    {errors.name && (
                        <p className = {styles.danger}>{errors.name}</p>
                    )}
                <div className={styles.label}>
                <label>Life Span:</label>
                </div>
                    <input className={styles.input}
                    type = "text"
                    value = {input.life_span}
                    name = "life_span"
                    onChange = {handleChange} required
                    />
                    {errors.life_span && (
                        <p className = {styles.danger}>{errors.life_span}</p>
                    )}
                <div className={styles.label}>
                <label>Height Mainimum:</label>
                </div>
                    <input className={styles.input}
                    type = "text"
                    value = {input.heightMin}
                    name = "heightMin"
                    onChange = {handleChange} required
                    />
                    {errors.heightMin && (
                        <p className = {styles.danger}>{errors.heightMin}</p>
                    )}
                <div className={styles.label}>
                <label>Height Maximum:</label>
                </div>
                    <input className={styles.input}
                    type = "text"
                    value = {input.heightMax}
                    name = "heightMax"
                    onChange = {handleChange} required
                    />
                    {errors.heightMax && (
                        <p className = {styles.danger}>{errors.heightMax}</p>
                    )}
                <div className={styles.label}>
                <label>Weight Minimum:</label>
                </div>
                    <input className={styles.input}
                    type = "text"
                    value = {input.weightMin}
                    name = "weightMin"
                    onChange = {handleChange} required
                    />
                    {errors.weightMin && (
                        <p className = {styles.danger}>{errors.weightMin}</p>
                    )}
                <div className={styles.label}>
                <label>Weight Maximum:</label>
                </div>
                    <input className={styles.input}
                    type = "text"
                    value = {input.weightMax}
                    name = "weightMax"
                    onChange = {handleChange} required
                    />
                    {errors.weightMax && (
                        <p className = {styles.danger}>{errors.weightMax}</p>
                    )}
                <div className={styles.label}>
                <label>Image:</label>
                </div>
                    <input className={styles.input}
                    type = "text"
                    value = {input.image}
                    name = "image"
                    onChange = {handleChange}
                    />
                    <div className={styles.label}>
                    <li>
                        <label>Temperaments:</label>
                    </li>
                    </div>
                <select className={styles.select} onChange = {(e)=> handleSelect(e)}>
                    {
                        temp.map((temp)=> (
                            <option className = {styles.option} value={temp.name}>{temp.name}</option>
                        ))
                    }
                </select>
                <ul><li>{input.temp.map(el=> el + " ,")}</li></ul>
                <button className={styles.button} type = "submit">Create Dog</button>
            </form>
            {input.temp.map(el => 
                <div>
                    <p>{el}</p>
                    <button className = {styles.button} onClick= {()=> handleDelete(el)}>X</button>
                </div>
                )}
        </div>
    )
}