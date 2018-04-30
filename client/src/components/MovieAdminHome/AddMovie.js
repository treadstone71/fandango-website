import React from 'react';
import MovieNav from '../NavBars/MovieNav.js';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { madminActions } from "../../apiActions";

class AddMovie extends React.Component {
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(e){
        console.log(e.target.id);
        const {name, value} = e.target;
        console.log(name, value);
        if(name == "file"){
            var data = new FormData();
            data.append('file', e.target.files[0]);
            data.append('name', 'file');
            data.append('description', 'some value user types');
            console.log("update");
            this.setState({ [name]: data });
        } else {
            this.setState({ [name]: value });
        }
    }

    onClick(e){
        e.preventDefault();
        console.log(this.state);
        const { dispatch } = this.props;
        dispatch(madminActions.postMovie(this.state));
    }


    render(){
        return(
            <div class="container">
            <MovieNav /><br/><br/><br/><br/>
            <div class="row"><div class="col-sm-2"></div><div class="col-sm-8">
            <Form>
            <FormGroup>
            <Label for="title">Title of the Movie</Label>
            <Input name="title" id="title" placeholder="Enter title of the movie..." onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
        <Label for="trailer">Trailer Link</Label>
            <Input  name="trailer" id="trailer" placeholder="Enter tariler link for the movie..." onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
        <Label for="characters">Characters in the Movie</Label>
        <Input name="characters" id="characters" placeholder="Enter characters seperated by comma(,)..." onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
        <Label for="file">Upload Image</Label>
        <Input type="file" name="file" id="file" onChange={this.onChange}/>
        <FormText color="muted">
            Only .jpg images
        </FormText>
        </FormGroup>
        <FormGroup>
        <Label for="categories">Movie Category</Label>
        <Input name="categories" id="categories" placeholder="Enter Movie Category separated by comma(,)..." onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
        <Label for="date">Movie Release Date</Label>
        <Input type = "date" name="date" id="date" placeholder="Enter Release Date..." onChange={this.onChange}/>
        </FormGroup>
        <FormGroup>
        <Label for="seeitin">See It In</Label>
        <Input name="seeitin" id="seeitin" placeholder="Enter where you can watch the movie seperated by comma(,)..." onChange={this.onChange}/>
        </FormGroup>
        <Button type="submit" color="primary" onClick={this.onClick}>Add Movie Hall</Button>
        </Form>
        </div><div class="col-sm-2"></div></div>
        </div>
        );
    }
}


function mapStateToProps(state) {
    const { admin } = state;
    return {
        admin
    };
}

export default AddMovie;