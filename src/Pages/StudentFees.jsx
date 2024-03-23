import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import HomeHelper from '../Components/HomeHelper'
import classnames from 'classnames'
import axios from 'axios'

export default function StudentFees() {
    const store = useSelector(store => store)
    const history = useHistory()
    const [errorHelper, setErrorHelper] = useState({})
    const [exam, setExam] = useState("")
    const [ExamId, setExamId] = useState("")

    const [Fees, setFees] = useState("")

    const [allexam, setAllExam] = useState([])
    const [PaymentType,setPaymentType] = useState('COD')

    const url = "http://localhost:5000"

    const Clickable = () => {

    }
    const GetExam = async() => {
        axios({
            method: 'Get',
            url: url + "/api/admin/getAllExam",
        }).then((res)=>{
            console.log('allllexammm',res.data)
            setAllExam(res.data)
        })
        .catch((err)=>err && console.log('err',err))
    }
    const GetExamFee = async(id) => {
        console.log('id',id)
        axios({
            method: 'Post',
            url: url + "/api/admin/getFeesByExamId",
            data:{'id':id}
        }).then((res)=>{
            console.log('getFeesByExamId',res.data)
            setFees(res.data.Fee)
        })
        .catch((err)=>err && console.log('err',err))
    }
    const handlePayment = async (e) => {
        try {
            e.preventDefault()
			const orderUrl = url + "/api/student/checkout" ;
			const { data } = await axios.post(orderUrl, { amount: Number(Fees) });
			console.log("adadafaf",data.data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};
    
	const initPayment = (data) => {
        console.log('initPayment',data)
		const options = {
			key: "rzp_test_nEWpO1FBzr1EqK",
			amount: data.amount,
			currency: data.currency,
			name: exam,
			description: "Test Transaction",
			image: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
			order_id: data.id,
            callback_url:url + "/api/student/verifyPayment",
			handler: async (response) => {
				try {
					const verifyUrl = url + "/api/student/verifyPayment";
					const { data } = await axios.post(verifyUrl, response);
                    if(data){
                        FeePayment()
                    }
                    else{
                        FeePayment()
                    }
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
            prefill: {
                name: "Abhijit Adak",
                email: "abhijit.adak@example.com",
                contact: "7874548751"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};
    const FeePayment = () => {
        // e.preventDefault()
        axios({
            method: 'Post',
            url: url + "/api/student/FeePayment",
            data:{
                'exam':exam,
                'examId':ExamId,
                'studentId':store.student.student.student.registrationNumber,
                'fee':Number(Fees),
                'paymentType': PaymentType
        }
        }).then((res)=>{
            console.log('FeePayment',res.data)
            if(res.data.success){

                alert('Payment Successfull')
                history.push('/')
            }
            else{
                alert(res.data.message)
                history.push('/')
            }
        })
        .catch((err)=>err && console.log('err',err))
    }
    useEffect(()=>{
        GetExam()
        document.getElementById('payment').addEventListener('click',function(e){
            console.log('clicked',e.target.textContent)
            
            document.querySelector(".container").style.backgroundColor = document.querySelector(".container").style.backgroundColor == "red" ? "white" : "red";
        })
        let btn = document.getElementById('light')
        let inputText = btn.previousElementSibling
        
        let mainList = document.querySelector("#paytm") 
        btn.addEventListener('click',function(e){
            e.preventDefault()
            if( inputText.value != ""){
                let newLi = document.createElement('li')
                newLi.className='list-group-item d-flex justify-content-between'
                newLi.innerHTML = ` <h3>${inputText.value}</h3>
                <button id='delete' className='btn btn-danger'> Del</button>`
                console.log('sddsdsd',mainList.childElementCount)
                // newLi.textContent = inputText.value
                mainList.appendChild(newLi)
                inputText.value = ""
            }
        })
       
        
    },[])
    useEffect(() => {
        if (store.errorHelper) {
            setErrorHelper(store.errorHelper)
        }
    }, [store.errorHelper])
  return (
    <>
    {store.student.isAuthenticated ? <div  id='trail'  style={{height:'100vh'}}>
        <HomeHelper />

    <div className="container" style={{backgroundColor:'white',paddingBottom:'20px',paddingLeft:'30px'}}>
      
        <h1 id='payment'>Payment Form</h1>
        <p>Required Fileds are followed by *</p>
    <form action="" onSubmit={PaymentType=='COD' ? FeePayment : PaymentType=='Online' ? handlePayment : FeePayment} style={{paddingLeft:'30px',paddingBottom:'30px',}}>
    <h2>Contact Information</h2>
        <p>Name:  <input type="text" name="name" value={store.student.student.student.name}   style={{width:'40vh',marginLeft:'20px',height:'32px' ,paddingLeft:'10px'}} required/></p>
        <p>Registration No:  <input type="text" value={store.student.student.student.registrationNumber} name="Registration No" id="Registration No"   style={{width:'40vh',marginLeft:'20px',height:'32px' ,paddingLeft:'10px'}}  required/></p>
    <div className="form-group" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <label htmlFor="examId">Exam</label>
                                <select onChange={(e) =>{
                                    console.log('wewewewe',(e.target.value))
                                    GetExamFee(e.target.value)
                                    setExam(e.target.value)
                                    setExamId(allexam.filter((re)=>re.exam == e.target.value)[0]._id)
                                } 
                            } value={exam} className={classnames("form-control",
                                    {
                                        'is-invalid': errorHelper.exam

                                    })} id="examId" style={{width:'50vh',marginLeft:'20px'}}>
                                    <option>Select</option>
                                    {allexam.map((re,ind)=>
                                        <option key={ind} value={re.exam}>{re.exam}</option>
                                    )}
                                    
                                </select>
                                {errorHelper.exam && (<div classNameName="invalid-feedback">{errorHelper.exam}</div>)}
                            </div>
        <div>
       {Fees !='' ? <p>Exam Fees:  <input type="text" value={`₹ ${Fees}`} name="Exam Fees" id="Exam Fees"  
        style={{width:'40vh',marginLeft:'20px',height:'32px' ,paddingLeft:'10px'}}  required/></p> :null }
       
        <div >
            <p style={{fontWeight:'bold',fontSize:'20px'}}> Payment Type  :   COD <input type="radio" name="PaymentType" id="COD" value='COD' onChange={(e)=>setPaymentType(e.target.value)} required/>
            {'         '} Online <input type="radio" name="PaymentType" id="Online" value='Online' onChange={(e)=>setPaymentType(e.target.value)} required/>
            {'         '} Card <input type="radio" name="PaymentType" id="Card" value='Card' onChange={(e)=>setPaymentType(e.target.value)} required/>

            </p>
        </div>
        {/* <p>Address: <textarea name="address" id="address" cols="100" rows="8"></textarea></p> */}
        {/* <p>Email: * <input type="email" name="email" id="email" required/></p> */}
       {console.log('exam//id',ExamId)}
       
        </div>
        {PaymentType === 'Card' ?
        <div>
        <h2>Payment Information</h2>
        <p>Card Type: {'  '} 
             <select name="card_type" id="card_type" required>
                <option value=""> -- Select a Card Type -- </option>
                <option value="visa">Visa</option>
                <option value="rupay">Rupay</option>
                <option value="mastercard">MasterCard</option>
            </select>
        </p>
        <p>
            Card Number  <input type="number" name="card_number" maxLength={12} id="card_number" required/>
        </p>
        <p>
            Expiration Date:  <input type="date" name="exp_date"  id="exp_date" required/>
        </p>
        <p>CVV  <input type="password" name="cvv" id="cvv" maxLength={3} required/></p>
        </div>
        :null
}
        <input type="submit" value="Pay Now"/><br/><br/>
        
    </form>

<div>
<input type="text"  id="yyy" />
<button id='light'>Turn on</button>
    <ul id='paytm' className='list-group'>
        <li className='list-group-item d-flex justify-content-between'>
            <h3>avdd</h3>
<button id='delete' className='btn btn-danger'> Del</button>
            
            </li>
    </ul>
</div>
    </div>
   </div>
    :

    (history.push('/'))
    }
    </>
  )
}
