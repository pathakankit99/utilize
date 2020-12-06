import React,{useState} from 'react'
import "../styles/MyDetails.css"
import { Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    useToast,
    Select,
    Input} from "@chakra-ui/react"
import {useDispatch, useSelector } from 'react-redux';
import {
    addOrders
} from '../features/data/dataSlice';
import Logout from "./Logout"

function MyDetails() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [product, setProduct] = useState("")
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()
    const toast=useToast()

    const submitHandler=(e)=>{
        e.preventDefault()
        onClose()
        fetch("https://utilize-server.herokuapp.com/add_data", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer_name: name,
              customer_email: email,
              product: product,
              quantity: quantity,
            }),
          })
            .then((res) => {
                if(res.status===422){
                    toast({
                        title: "Error",
                        description: "",
                        status: "error",
                        duration: 5000,
                        isClosable: false,
                      })
                }
                else{
                    fetch('https://utilize-server.herokuapp.com/get_data')
                    .then(response => response.json())
                    .then(data =>{
                      dispatch(addOrders(data))
                    })
                    toast({
                        title: "Updated Successfully",
                        description: "",
                        status: "success",
                        duration: 5000,
                        isClosable: false,
                        })
                }
            })
    }
    return (
        <div className="MyDetails">
            <div className="Center"><Logout/></div>
            <div className="Center"><Button variant="filled" bgColor=" rgb(6, 8, 22)" onClick={onOpen}>Add Order</Button></div>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Order</ModalHeader>
            <form>
            <ModalBody>
                    <div className="FormPart">
                    <div className="InputGroup">
                        <h3>Customer Name</h3>
                        <Input
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Customer Name"/>
                    </div>
                    <div className="InputGroup">
                        <h3>Customer Email</h3>
                        <Input
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                        placeholder="Customer Email"/>
                    </div>
                    </div>
                    <div>
                    <div className="InputGroup">
                        <h3>Product</h3>
                        <Select
                        type="text"
                        onChange={(e)=>setProduct(e.target.value)}
                        value={product}>
                            <option selected value="Product 1">Product 1</option>
                            <option value="Product 2">Product 2</option>
                            <option value="Product 3">Product 3</option>
                        </Select>
                    </div>
                    <div className="InputGroup">
                        <h3>Quantity</h3>
                        <Input
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                        type="number"
                        placeholder="Quantity"/>
                    </div>
                    </div>
            </ModalBody>
            <ModalFooter>
                <Button className="Close" colorScheme="red" variant="solid"  onClick={onClose}>
                Close
                </Button>
                <Button onClick={submitHandler}colorScheme="blue" variant="solid">Add Order</Button>
            </ModalFooter>
            </form>
            </ModalContent>
            </Modal>   
            
        </div>
    )
}

export default MyDetails
