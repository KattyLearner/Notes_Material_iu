import React from 'react'
import {Drawer, makeStyles, Typography} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {AddCircleOutlined, SubjectOutlined} from "@material-ui/icons";
import {useHistory, useLocation} from "react-router";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import {format} from 'date-fns'

const drawerWidth = 240

const useStyle = makeStyles( (theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

export default function Layout({children}){
    const classes = useStyle()
    const history = useHistory()
    const location = useLocation( )


    const menuItems = [
        {
            text: 'My note',
            icon: <SubjectOutlined color={"secondary"} />,
            path: '/'
        },
        {
            text: 'My note',
            icon: <AddCircleOutlined color={"secondary"} />,
            path: '/create'
        },

    ]
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={1}>
                <Toolbar >
                    <Typography className={classes.date}>
                       Today is {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Kate
                    </Typography>
                    <Avatar src={'/avatarmy.jpg'} className={classes.avatar}/>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant={'permanent'}
                anchor={'left'}
                classes={{paper: classes.drawerPaper}}
            >
                <div>
                <Typography variant={'h5'} className={classes.title}>
                    My notes
                </Typography>
                </div>

               <List>
                   {menuItems.map(item => (
                       <ListItem
                           button
                           key={item.text}
                           onClick={()=>history.push(item.path) }
                           className={location.pathname == item.path ? classes.active : null}
                       >
                           <ListItemIcon>{item.icon}</ListItemIcon>
                           <ListItemText primary={item.text}/>
                       </ListItem>
                   ))}
               </List>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
            {children}
            </div>
        </div>
    )
}