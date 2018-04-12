import React , {Component} from 'react';
import Checkoutsummary from '../../components/Checkoutsummary/Checkoutsummary';

export default class Checkout extends Component{
    state={
        ingredients:null
    }
    componentDidMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            //['salad','1'];
            ingredients[param[0]]= +param[1];
        }
        this.setState({ingredients:ingredients});
    }
    canceller=()=>{
        this.props.history.goBack();
        // this.props.history.push('/',this.state.ingredients);
    }
    continuer=()=>{
        this.props.history.replace('/checkout/contact-data');
    }


    render(){
        let checkoutsummary=null;
        if(this.state.ingredients!== null){
            checkoutsummary=<Checkoutsummary continuecheckoutHandler={this.continuer} cancelcheckoutHandler={this.canceller} ingredients={this.state.ingredients}/>;
        }

        return (
            <div>
                {checkoutsummary}
            </div>
        )
    }
}