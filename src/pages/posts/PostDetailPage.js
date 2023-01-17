import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import appStyles from "../../App.module.css"

const PostDetailPage = () => {
  return (
    <Row className='h-100'>
        <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Post Component</p>
        <Container className={appStyles.Content}>Comments</Container>
        </Col>
    </Row>
    )
}

export default PostDetailPage