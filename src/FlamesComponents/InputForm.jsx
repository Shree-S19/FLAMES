import React , {useState,useContext}from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AppContext } from './FlamesHome'
import {motion} from "framer-motion"
import Lottie from "lottie-react"
import balloons from "../assets/balloons.json"

export default function InputForm() {

    const[result,setResult] = useState("");

    const flame =(userName,crushName) =>{
        let a= userName.split("");
        let b= crushName.split(""); 
          let i, j = 1, n, m, sc = 0, tc, rc = 0;
          n = a.length;
          m = b.length;
          tc = n + m;
      
          for (i = 0; i < n; i++)
          {
              let c = a[i];
              for (j = 0; j < m; j++)
              {
                  if (c == b[j])
                  {
                      a[i] = -1;
                      b[j] = -1;
                      sc = sc + 2;
                      break;
                  }
              }
          }
      
          rc = tc - sc;
        let number = rc;
        const relationships = ["Friends", "Love", "Affection", "Marriage", "Enemies", "Siblings"];
          
          while (relationships.length > 1) {
              const idx = (number - 1) % relationships.length;
              relationships.splice(idx, 1);
          }
          
          return relationships[0];
    }
    const {setUserName,setCrushName} = useContext(AppContext);

    const formik = useFormik({
        initialValues:{
            firstPerson : "",
            secondPerson : ""
        },
        onSubmit: async (values) => {
            try {
                values.firstPerson = values.firstPerson.replace(/\s/g, '');
                values.secondPerson = values.secondPerson.replace(/\s/g, '');

                setUserName(values.firstPerson);
                setCrushName(values.secondPerson);
                if (values.firstPerson !== "") {
                    const res = await flame(values.firstPerson, values.secondPerson);
                    setResult(res);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        },
        validationSchema : Yup.object({
            firstPerson:Yup.string()
            .matches(/^[A-Za-z ]+$/, 'only alphabets')
            .max(25,"must be < 15 characters!")
            .min(2,"must be > 2 characters!")
            .required("Required"),

            secondPerson:Yup.string()
            .matches(/^[A-Za-z ]+$/, 'only alphabets')
            .max(25,"must be < 15 characters!")
            .min(2,"must be > 2 characters!")
            .required("Required"),
        })
    })
  return (
    <div id='inputForm'>
        <form onSubmit={formik.handleSubmit}>
            <div id='form'>
            <div id="If-top">
                <div id='ip'>
                    <div id='ip-1'>
                        <input name = "firstPerson"
                            className='inputs'
                            type="text"
                            placeholder='Enter your name'
                            onChange={formik.handleChange}
                            value={formik.values.firstPerson} />

                        {formik.errors.firstPerson &&
                                    (formik.touched.firstPerson && 
                                        <span style={{color:"red"}}>
                                            {formik.errors.firstPerson}</span>)}
                    </div>
                    <div id='ip-2'>
                        <input name = "secondPerson"
                            className='inputs'
                            type="text"
                            placeholder='Enter your name'
                            onChange={formik.handleChange}
                            value={formik.values.secondPerson} />
                        {formik.errors.secondPerson && 
                                    (formik.touched.secondPerson && 
                                        <span style={{color:"red"}}>
                                            {formik.errors.secondPerson}</span>)}
                    </div>
                </div>
                <div id='sub-btn'>
                    <button className='btn' type='submit' onClick={formik.onSubmit}>
                        Spin it
                    </button>
                </div>
            </div>
            <div id="If-bottom">
                <div id='display-result'>
                    <h1 id='result' style={{color:"red",fontFamily:"cursive"}}>
                        {result}
                    </h1>
                </div>
                <div id='display-text'>
                        <Lottie id='animation' animationData={balloons} loop={false}/>
                </div>
            </div>
            </div>
        </form>
    </div>
  )
}
