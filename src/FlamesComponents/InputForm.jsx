import React , {useContext}from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { AppContext } from './FlamesHome'

export default function InputForm() {
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
                setUserName(values.firstPerson);
                setCrushName(values.secondPerson);
                if (values.firstPerson !== "") {
                    const result = await flame(values.firstPerson, values.secondPerson);
                    console.log(result);
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        },
        validationSchema : Yup.object({
            firstPerson:Yup.string()
            .matches(/^[A-Za-z]+$/, 'Field can only contain alphabetic characters')
            .max(25,"must be less than 15 characters!")
            .min(2,"must be more than 2 characters")
            .required("Required"),

            secondPerson:Yup.string()
            .matches(/^[A-Za-z]+$/, 'Field can only contain alphabetic characters')
            .max(25,"must be less than 15 characters!")
            .min(2,"must be more than 2 characters")
            .required("Required"),
            
        })
    })
  return (
    <div id='inputForm'>
        <form onSubmit={formik.handleSubmit}>
            <input name = "firstPerson"
                type="text"
                placeholder='Enter your name'
                onChange={formik.handleChange}
                value={formik.values.firstPerson} />
            {formik.errors.firstPerson &&
                        (formik.touched.firstPerson && 
                            <span style={{color:"red"}}>
                                {formik.errors.firstPerson}</span>)}
            
            <input name = "secondPerson"
                type="text"
                placeholder='Enter your name'
                onChange={formik.handleChange}
                value={formik.values.secondPerson} />
            {formik.errors.secondPerson && 
                        (formik.touched.secondPerson && 
                            <span style={{color:"red"}}>
                                {formik.errors.secondPerson}</span>)}
            
            <button className='sub-btn' type='submit' onClick={formik.onSubmit}>
                Submit
            </button>

        </form>
    </div>
  )
}
