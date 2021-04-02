import React from "react"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"
import ViewPosts from "./components/Social Module/ViewPosts";
import ViewCategories from "./components/Social Module/ViewTopics";
import ViewNotifications from "./components/Social Module/ViewNotifications";

export const baseUrl = "https://beeware319.herokuapp.com"

export const roles = {
    admin: "Admin"
}

export const dateFormat = 'YYYY-MM-DD'

export const EMPLOYEE_VIEWS = {
    posts: {
        title: "Posts",
        icon: <FaIcons.FaRegNewspaper />,
        component: <ViewPosts/>
    },
    categories: {
        title: "Topics",
        icon: <IoIcons.IoIosAlbums />,
        component: <ViewCategories />
    },
    notifications: {
        title: "Notifications",
        icon: <IoIcons.IoMdNotificationsOutline />,
        component: <ViewNotifications />
    }
}
