import React , {Component} from 'react';
import Button from '../../components/UI/Button/Button';

export default class Contact extends Component{
    state={
        name:"",
        email:"",
        address:{
            street:"",
            postalcode:""
        }
    };

    render(){


        return(
            <div>
                <h4>Enter Your data</h4>
                <form action="">
                    <input type="text" name="name" placeholder="Your Name"/>
                    <input type="email" name="email" placeholder="Your Email"/>
                    <input type="text" name="street" placeholder="Your Street"/>
                    <input type="text" name="postalcode" placeholder="Your Postal Code"/>
                    <Button btnTpe="Success" click>Order Now</Button>
                </form>
            </div>
        )
    }
}