import React, { Component } from 'react';
import  Axios from '../../axios-orders';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading:false,
        error:false
    }
    componentWillReceiveProps(){
        this.setState({ingredients:this.props.location.state});
    }

    componentDidMount(){
        
        Axios.get('/ingredients.json')
        .then((resp)=>{
            this.setState({ingredients:resp.data});
        }).catch((e)=>{
            this.setState({error:true});
        })
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        let queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams=queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:"?"+queryParams
        });

        // this.setState({loading:true});
        // const order={
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice,
        //     customer:{
        //         name:"soma",
        //         address:{
        //             street:"test",
        //             zipcode:"1212",
        //             country:"india"
        //         },
        //         email:"test@tetst.com",
        //         deliverymethod:"fastest"
        //     }

        // }
        // Axios.post('/orders.json',order)
        // .then(resp=>{
        //     this.setState({loading:false,purchasing:false});
        // })
        // .catch(e=>{
        //     this.setState({loading:false,purchasing:false});
        //     console.log(e);
        // })

        //alert('You continue!');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let ordersummary=null;        
        let burger= this.state.error?<p>Ingredients cannot be loaded</p>:<Spinner/>;
        if(this.state.ingredients!=null){    
            burger=(<Auxillary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
                    </Auxillary>);
            ordersummary=<OrderSummary 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler} />;
        }
        if(this.state.loading){
            ordersummary=<Spinner />
        }
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Auxillary>
        );
    }
}

export default withErrorHandler(BurgerBuilder,Axios);