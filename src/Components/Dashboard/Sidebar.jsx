import { Navbar } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import SidebarMenu from 'react-bootstrap-sidebar-menu';

const Sidebar = () => {

    const theme = "dark";
    const color = "white";
    const type = "solid";
    const size = "sm";

    return (
        <>
        <Navbar className="main-header" expand="lg" bg={theme} variant={theme}>
        <Nav.Link href="/">
            <box-icon size={size} color={color} name="exit" />
        </Nav.Link>
        </Navbar>
        <SidebarMenu variant={theme} bg={theme} expand={false}>
        <SidebarMenu.Collapse>
            <SidebarMenu.Header>
            <SidebarMenu.Text><h1 style={{color: color}}>Dashboard</h1></SidebarMenu.Text>
            </SidebarMenu.Header>
            <SidebarMenu.Body>
            <SidebarMenu.Nav>
                <SidebarMenu.Nav.Link className="sidebar-menu-link" href="#users">
                <SidebarMenu.Nav.Icon>
                    <box-icon type={type} size={size} color={color} name="id-card"></box-icon>
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Users</SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Link className="sidebar-menu-link" href="#roles">
                <SidebarMenu.Nav.Icon>
                    <box-icon type={type} size={size} color={color} name="user-badge"></box-icon>
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Roles</SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Link className="sidebar-menu-link" href="#books">
                <SidebarMenu.Nav.Icon>
                    <box-icon type={type} size={size} color={color} name="book"></box-icon>
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Books</SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
                <SidebarMenu.Nav.Link className="sidebar-menu-link" href="#orders">
                <SidebarMenu.Nav.Icon>
                    <box-icon type={type} size={size} color={color} name="receipt"></box-icon>
                </SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>Orders</SidebarMenu.Nav.Title>
                </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
            </SidebarMenu.Body>
        </SidebarMenu.Collapse>
        </SidebarMenu>
        </>
    );
};

export default Sidebar;