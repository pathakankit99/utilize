import React, { useState } from 'react'
import "../styles/OrderCard.css"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
    Button,
    useToast,
    Input,
    IconButton,
    Select
  } from "@chakra-ui/react"
  import { FaEdit } from "react-icons/fa";

  import {useDispatch} from 'react-redux';
import {
  updateOrders
} from '../features/data/dataSlice';


function OrderCard({id, customer_name, customer_email, product, quantity}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOpen2, setOpen2]= useState(false)
    const onOpen2=()=>{
        setOpen2(true)
    }
    const onClose2=()=>{
        setOpen2(false)
    }
    const [newName, setNewName] = useState(customer_name)
    const [newEmail, setNewEmail] = useState(customer_email)
    const [newProduct, setNewProduct] = useState(product)
    const [newQuantity, setNewQuantity] = useState(quantity)

    const dispatch = useDispatch()
    const toast=useToast()

    const updateHandler=(e)=>{
        e.preventDefault()
        onClose()

        fetch("https://utilize-server.herokuapp.com/update_data", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              customer_name: newName,
              customer_email: newEmail,
              product: newProduct,
              quantity: newQuantity,
            }),
          })
            .then((res) => {
                if(res.status===422){
                    toast({
                        title: "Error Occured",
                        description: "",
                        status: "error",
                        duration: 5000,
                        isClosable: false,
                      })
                }
                else{
                    dispatch(updateOrders({id,newName,newEmail,newProduct,newQuantity}))
                    toast({
                        title: "Updated Successfully",
                        description: "",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        })
                }
            })

    }
    return (
        <div className="orderCard">
            <div onClick={onOpen2} className="orderCardContent">
            <h6>Order ID: {id}</h6><h6>Name: {customer_name}</h6>      
            </div>
            <IconButton
            onClick={onOpen}
            variant="filled"
            aria-label="Edit"
            fontSize="20px"
            icon={<FaEdit/>}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Update Order</ModalHeader>
            <form>
            <ModalBody>
                    <div className="FormPart">
                    <div className="InputGroup">
                        <h3>Customer Name</h3>
                        <Input
                        type="text"
                        value={newName}
                        onChange={(e)=>setNewName(e.target.value)}
                        placeholder="Customer Name"/>
                    </div>
                    <div className="InputGroup">
                        <h3>Customer Email</h3>
                        <Input
                        value={newEmail}
                        onChange={(e)=>setNewEmail(e.target.value)}
                        type="email"
                        placeholder="Customer Email"/>
                    </div>
                    </div>
                    <div>
                    <div className="InputGroup">
                        <h3>Product</h3>
                        <Select
                        type="text"
                        onChange={(e)=>setNewProduct(e.target.value)}
                        value={newProduct}>
                            <option value="Product 1">Product 1</option>
                            <option value="Product 2">Product 2</option>
                            <option value="Product 3">Product 3</option>
                        </Select>
                    </div>
                    <div className="InputGroup">
                        <h3>Quantity</h3>
                        <Input
                        value={newQuantity}
                        onChange={(e)=>setNewQuantity(e.target.value)}
                        type="number"
                        placeholder="Quantity"/>
                    </div>
                    </div>
            </ModalBody>
            <ModalFooter>
                <Button className="Close" colorScheme="red" variant="solid"  onClick={onClose}>
                Close
                </Button>
                <Button onClick={updateHandler}colorScheme="blue" variant="solid">Update</Button>
            </ModalFooter>
            </form>
            </ModalContent>
            </Modal>
            <Modal isOpen={isOpen2} onClose={onClose2}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Order Info</ModalHeader>
            <ModalBody>
            <h6>Customer Name: {customer_name}</h6>
            <h6>Customer Email: {customer_email}</h6>
            <h6>Product: {product}</h6>
            <h6>Quantity: {quantity}</h6> 
            </ModalBody>
            <ModalFooter>
                <Button className="Close" colorScheme="red" variant="solid"  onClick={onClose2}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
            </Modal>   
        </div>
    )
}

export default OrderCard
