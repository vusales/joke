import React from "react";
import Jokes from "./Jokes"; 
import smile from "../smile.png";

class JokeContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            jokes: [] , 
            isLoading: true ,
        }
        this.getNewJokes = this.getNewJokes.bind(this);
        this.sortVote=this.sortVote.bind(this);
    }

    componentDidMount(){
        this.getNewJokes();
     
    }

    getNewJokes(){
        var randomPage  = Math.floor(Math.random()*10);
        fetch(`https://icanhazdadjoke.com/search?page=${randomPage}&limit=10`, {
            method: "GET" ,
            headers: {
                "Accept" : "application/json" ,
            }

        }).then(result=>result.json()).then(result=>{

             this.setState({
                jokes: result.results , 
                isLoading: false ,
            });

        });

    }

    sortVote(index , vote){
        var allJokes = this.state.jokes ; 
        allJokes[index].vote = vote ; 
        allJokes.sort( (a,b)=>{
            let count1 = a.vote || 0 ;
            let count2 = b.vote || 0 ;
            return count2 - count1;
        }); 

        console.log("second" , allJokes);

        this.setState({
            jokes: allJokes,
        });

    }

    render(){
        return(
            <React.Fragment>
                <div className="container p-5">
                    <div className="row">
                        <div className="left-bigCon col-3">
                            <div className="left-con">
                                <h1 className="mb-3">DAD JOKES</h1>
                                <div className="img-div mb-1 mt-1">
                                    <img src={smile}/>
                                </div>
                                <button className="btn new-btn mt-3" onClick={this.getNewJokes}>NEW DAD JOKES</button>
                            </div>
                        </div>
                        <div className="col-7 pt-4 pb-4">

                            { this.state.isloading 
                            ?<div>loading...</div> 
                            :this.state.jokes.map((jks , index )=>{
                            return (<Jokes key={jks.id}  index = {index} jokes={jks.joke} sortVotes={this.sortVote}/>); 
                            })
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )

    }
}

export default JokeContainer ;