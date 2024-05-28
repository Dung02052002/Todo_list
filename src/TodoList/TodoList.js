// App.js File 
import React, { Component } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"; 
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col"; 
import Button from "react-bootstrap/Button"; 
import InputGroup from "react-bootstrap/InputGroup"; 
import FormControl from "react-bootstrap/FormControl"; 
import ListGroup from "react-bootstrap/ListGroup";
import './list.css';

class TodoList extends Component { 
	constructor(props) { 
		super(props); 

		// Setting up state 
		this.state = { 
			userInput: "", 
			list: [], 
			editingIndex:null,//Add state to track the item being edited
		}; 
	} 

	// Set a user input value 
	updateInput(value) { 
		this.setState({ 
			userInput: value, 
		}); 
	} 

	// Add item if user input in not empty 
	addItem() { 
		if (this.state.userInput !== "") { 
			const userInput = { 
				// Add a random id which is used to delete 
				id: Math.random(), 

				// Add a user value to list 
				value: this.state.userInput, 
			}; 

			// Update list 
			const list = [...this.state.list]; 
			list.push(userInput); 

			// reset state 
			this.setState({ 
				list, 
				userInput: "", 
			}); 
		} 
	} 

	// Function to delete item from list use id to delete 
	deleteItem(key) { 
		const list = [...this.state.list]; 

		// Filter values and leave value which we need to delete 
		const updateList = list.filter((item) => item.id !== key); 

		// Update list in state 
		this.setState({ 
			list: updateList, 
		}); 
	} 

	editItem = (index) => {
		this.setState({
		  editingIndex: index,
		  userInput: this.state.list[index].value,
		});
	  }
	  
	  saveEditedItem = (index) => {
		const updatedList = [...this.state.list];
		updatedList[index].value = this.state.userInput;
		this.setState({
		  list: updatedList,
		  editingIndex: null,
		  userInput: "",
		});
	  }
	  
	  cancelEditItem = () => {
		this.setState({
		  editingIndex: null,
		  userInput: "",
		});
	  }
	// editItem = (index) => { 
	// const todos = [...this.state.list]; 
	// const editedTodo = prompt('Edit the todo:'); 
	// if (editedTodo !== null && editedTodo.trim() !== '') { 
	// 	let updatedTodos = [...todos] 
	// 	updatedTodos[index].value= editedTodo 
	// 	this.setState({ 
	// 	list: updatedTodos, 
	// }); 
	// } 
	// } 

	render() {
		return (
		  <Container>
			<Row className="logo">
			  TODO LIST
			</Row>
	  
			<hr />
	  
			<Row>
			  <Col md={{ span: 5, offset: 4 }}>
				<InputGroup className="mb-3 input">
				  <FormControl
					placeholder="add item . . ."
					size="lg"
					value={this.state.userInput}
					onChange={(event) => this.updateInput(event.target.value)}
					aria-label="add something"
					aria-describedby="basic-addon2"
				  />
				  <Button
					variant="dark"
					className=" ml-2"
					onClick={() => this.addItem()}
				  >
					ADD
				  </Button>
				</InputGroup>
			  </Col>
			</Row>
	  
			<Row>
			  <Col md={{ span: 5, offset: 4 }}>
				<ListGroup>
				  {this.state.list.map((item, index) => (
					<ListGroup.Item
					  key={index}
					  variant={this.state.editingIndex === index ? "warning" : "dark"}
					  action
					  className="list-item"
					>
					  {this.state.editingIndex === index ? (
						<InputGroup>
						  <FormControl
							size="lg"
							value={this.state.userInput}
							onChange={(event) => this.updateInput(event.target.value)}
						  />
						  <Button
							variant="success"
							onClick={() => this.saveEditedItem(index)}
						  >
							Save
						  </Button>
						  <Button
							variant="danger"
							onClick={() => this.cancelEditItem()}
						  >
							Cancel
						  </Button>
						</InputGroup>
					  ) : (
						<>
						  {item.value}
						  <span>
							<Button
							  style={{ marginRight: "10px" }}
							  variant="light"
							  onClick={() => this.deleteItem(item.id)}
							>
							  Delete
							</Button>
							<Button
							  variant="light"
							  onClick={() => this.editItem(index)}
							>
							  Edit
							</Button>
						  </span>
						</>
					  )}
					</ListGroup.Item>
				  ))}
				</ListGroup>
			  </Col>
			</Row>
		  </Container>
		);
	  }
}


export default TodoList; 
