import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';

export const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" className='mb-4' style={{height: "3.75rem"}}>
        <Container>
          <h2>
            <Link to="/" className='link-light text-decoration-none'>Chat App</Link>
          </h2>
          <span className="text-warning">Logged in as Charles</span>
          <Nav className="mr-auto">
              <Stack direction="horizontal" gap={3}>
                  <Link to={'/login'} className='link-light text-decoration-none'>
                    Login
                  </Link>
                  <Link to={'/register'} className='link-light text-decoration-none'>
                    Register
                  </Link>
              </Stack>
          </Nav>
        </Container>
    </Navbar>
  )
}
