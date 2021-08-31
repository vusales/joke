import React from "react";
import smile1 from "../smilecon.png" ; 
import smile2 from "../smile1.png" ; 
import smile3 from "../positive.png" ; 


class Jokes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jks: this.props.jokes , 
            vote: 0 ,
            icon: undefined ,
        }


        this.addVote = this.addVote.bind(this);
        this.bringVote = this.bringVote.bind(this);
        this.iconChoose = this.iconChoose.bind(this);

    }

    iconChoose(){
        if(this.state.vote <= 10){
             return smile1; 
        }else if(10 < this.state.vote && this.state.vote <= 20){
            return smile3; 
        }else if(this.state.vote > 20){
            return smile2; 
        }

    }

    componentDidUpdate(prevProps , prevState){
        console.log(this.state.index)
        if(prevState.vote !== this.state.vote){
            this.props.sortVotes(this.props.index , this.state.vote);
        }

    }

    addVote(){
        var countVote = this.state.vote ; 
        countVote += 1 ; 
        this.setState({
            vote:  countVote ,
        })  ;
    }; 


    bringVote(){
        var countVote = this.state.vote ; 
        countVote -= 1 ; 
        this.setState({
            vote:  countVote ,
        });
    };


    render(){
        return(
            <React.Fragment>
                
                <div className="right-con d-flex p-2 pe-3">
                    <div className="upDown-div">
                        <button className="btn" onClick={this.addVote} disabled={this.state.vote>=30}><i className="fas fa-long-arrow-alt-up"></i></button>
                        <div className="circle">
                            <p>{this.state.vote}</p>
                        </div>
                        <button className="btn" onClick={this.bringVote} disabled={this.state.vote===0}><i className="fas fa-long-arrow-alt-down"></i></button>
                    </div>

                    <div className="p-div">
                        <p>{this.state.jks}</p>
                    </div>                   
                    <img className="smile-Icon" src={this.iconChoose()}/>
                               
                </div>
                   
            </React.Fragment>
        )

    }
}

export default Jokes ;