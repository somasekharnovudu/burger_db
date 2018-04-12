import React , {Component} from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import  classes from './Checkoutsummary.css';

export default class Checkoutsummary extends Component{



    render(){

        return(
            <div className={classes.Checkoutsummary}>
                <h1>We Hope it tastes well!</h1>
                <div style={{width:"100%",margin:"auto"}}>
                    <Burger ingredients={this.props.ingredients}/>
                </div>
                <Button btnType="Danger" clicked={this.props.cancelcheckoutHandler}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continuecheckoutHandler}>Continue</Button>
            </div>
        )
    }
}